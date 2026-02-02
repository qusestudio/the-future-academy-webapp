import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {fetchAuthSession, getCurrentUser} from "aws-amplify/auth"
import {createNewUserInDatabase} from "@/lib/utils";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
      prepareHeaders: async (headers) => {
        const session = await fetchAuthSession();
        const { idToken } = session.tokens ?? {};
        if (idToken) {
            headers.set("Authorization", `Bearer ${idToken}`);
        }
        console.log(headers.entries());
        return headers;
      }
  }),
  reducerPath: "api",
  tagTypes: ["Instructors", "Students"],
  endpoints: (build) => ({
      getAuthUser: build.query<User, void>({
          queryFn: async (_, _queryApi, _extraoptions, fetchWithBQ) => {
              try {
                  const session = await fetchAuthSession();
                  const {idToken} = session.tokens ?? {};
                  const user = await getCurrentUser(); // Fetching info from cognito
                  const userRole = idToken?.payload["custom:role"] as string;

                  const endpoint =
                      userRole === "instructor"
                          ? `/instructors/${user.userId}`
                          : `/students/${user.userId}`;

                  // Check if the user exists in our server
                  console.log("Checking If user exists in our server")

                  let userDetailsResponse = await fetchWithBQ(endpoint);
                  console.log(userDetailsResponse.data);
                  console.log(userDetailsResponse.error);

                  // If user doesn't exist, create new user
                  if (userDetailsResponse.error && userDetailsResponse.error.status === 404) {
                      console.log("User Not Found Error")
                      userDetailsResponse = await createNewUserInDatabase(
                          user,
                          idToken,
                          userRole,
                          fetchWithBQ
                      );
                  }

                  return {
                      data: {
                          cognitoInfo: {...user},
                          userInfo: userDetailsResponse.data as StudentUser | InstructorUser, // discrepancy
                          userRole
                      }
                  }
              } catch (error: any) {
                  return {
                      error: error.message || "Could not fetch user data"
                  }
              }
          }
      })
  }),
});

export const {
    useGetAuthUserQuery
} = api;
