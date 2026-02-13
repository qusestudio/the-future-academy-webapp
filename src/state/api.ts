import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {fetchAuthSession, getCurrentUser} from "aws-amplify/auth"
import {createNewUserInDatabase, withToast} from "@/lib/utils";
import {
    Enrollment,
    InstructorUser,
    Lesson,
    NotEnrolled,
    StudentEnrollment, StudentProfile,
    StudentUser,
    Subject,
    Topic
} from "@/types/models";
import {toast} from "sonner";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        prepareHeaders: async (headers) => {
            const session = await fetchAuthSession();
            const {idToken} = session.tokens ?? {};
            if (idToken) {
                headers.set("Authorization", `Bearer ${idToken}`);
            }
            console.log(headers.entries());
            return headers;
        }
    }),
    reducerPath: "api",
    tagTypes: ["Instructors", "Students", "AvailableSubjects","Subjects", "NotEnrolled","topic", "Lessons", "LessonDetails", "Enrollments", "Enrollment", "SubjectDetails", "Topics", "TopicDetails"],
    endpoints: (build) => ({
        // Authentication
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
        }),
        getUserProfile: build.query<User, void>({
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
        }),


        // Enrollment endpoints
        getNonEnrollments: build.query<NotEnrolled[], string>({
            query: (studentId) => {
                return {url: `/students/${studentId}/not-enrolled`};
            },
            providesTags: ["AvailableSubjects"],

            async onQueryStarted(_, {queryFulfilled}) {
                await withToast(queryFulfilled, {
                    error: "Failed to fetch subjects.",
                });
            },
        }),
        getStudentEnrollments: build.query<StudentEnrollment[], string>({
            query: (studentId) => {
                return {url: `/students/${studentId}/enrollments`};
            },
            providesTags: ["Enrollments"],

            async onQueryStarted(_, {queryFulfilled}) {
                await withToast(queryFulfilled, {
                    error: "Failed to fetch enrollments.",
                });
            },
        }),
        createEnrollment: build.mutation<Enrollment, Omit<Enrollment, 'id'>>({
            query: (enrollment) => ({
                url: "/enrollments",
                method: "POST",
                body: enrollment,
            }),

            invalidatesTags: ["AvailableSubjects"],

            async onQueryStarted(_, {queryFulfilled}) {
                toast.promise(queryFulfilled, {
                    loading: "Enrolling you...",
                    success: "Enrolled successfully!",
                    error: "We are sorry something happened.",
                });
            },
        }),
        getEnrollment: build.query<Enrollment, { subjectId: string, cognitoId: string }>({
            query: ({subjectId, cognitoId}) => {
                return {url: `/enrollments/${subjectId}/${cognitoId}`};
            },
            providesTags: (result) => [{type: "Enrollment"}],

            async onQueryStarted(_, {queryFulfilled}) {
                await withToast(queryFulfilled, {
                    error: "Failed to fetch enrollment.",
                });
            },
        }),

        getSubjectsForInstructor: build.query<Subject[], string>({
            query: (instructorId) => {
                return {url: `/instructors/${instructorId}/subjects`};
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({id}) => ({type: "Subjects" as const, id})),
                        {type: "Subjects", id: "LIST"},
                    ]
                    : [{type: "Subjects", id: "LIST"}],

            async onQueryStarted(_, {queryFulfilled}) {
                await withToast(queryFulfilled, {
                    error: "Failed to fetch subjects.",
                });
            },
        }),
        getSubjectsByGrade: build.query<Subject[], number>({
            query: (grade) => {
                return {url: `/grades/${grade}/subjects`};
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({id}) => ({type: "Subjects" as const, id})),
                        {type: "Subjects", id: "LIST"},
                    ]
                    : [{type: "Subjects", id: "LIST"}],

            async onQueryStarted(_, {queryFulfilled}) {
                await withToast(queryFulfilled, {
                    error: "Failed to fetch subjects.",
                });
            },
        }),
        getSubject: build.query<Subject, string>({
            query: (subjectId) => `/subjects/${subjectId}`,
            providesTags: (result, error, id) => [{type: "SubjectDetails", id}],
            async onQueryStarted(_, {queryFulfilled}) {
                await withToast(queryFulfilled, {
                    error: "Failed to load subject details.",
                });
            },
        }),
        createSubject: build.mutation<Subject, { subject: Subject }>({
            query: ({subject}) => {
                return {
                    url: "/subjects",
                    method: "POST",
                    body: subject,
                };
            },

            invalidatesTags: (result, error) => [
                {type: "Subjects"},
                {type: "Subjects", id: "LIST"},
            ],

            async onQueryStarted(_, {queryFulfilled}) {
                toast.promise(queryFulfilled, {
                    loading: "Creating subject...",
                    success: "Subject created successfully!",
                    error: "Failed to create subject.",
                });
            },
        }),

        // Topics endpoints
        getTopicsBySubject: build.query<Topic[], string>({
            query: (subjectId) => {
                return {url: `/subjects/${subjectId}/topics`};
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({id}) => ({type: "Topics" as const, id})),
                        {type: "Topics", id: "LIST"},
                    ]
                    : [{type: "Topics", id: "LIST"}],

            async onQueryStarted(_, {queryFulfilled}) {
                await withToast(queryFulfilled, {
                    error: "Failed to fetch subjects.",
                });
            },
        }),
        createTopic: build.mutation<Topic, { topic: Topic }>({
            query: ({topic}) => {
                return {
                    url: "/topics",
                    method: "POST",
                    body: topic,
                };
            },

            invalidatesTags: (result, error) => [
                {type: "Topics"},
                {type: "Topics", id: "LIST"},
            ],

            async onQueryStarted(_, {queryFulfilled}) {
                const promise = queryFulfilled;

                toast.promise(queryFulfilled, {
                    loading: "Creating topic...",
                    success: "Topic created successfully!",
                    error: "Failed to create topic.",
                });

                await promise;
            },
        }),
        getTopic: build.query<Topic, string>({
            query: (topicId) => `/topics/${topicId}`,
            providesTags: (result, error, id) => [{type: "TopicDetails", id}],
            async onQueryStarted(_, {queryFulfilled}) {
                await withToast(queryFulfilled, {
                    error: "Failed to load topics details.",
                });
            },
        }),

        // Lesson endpoints
        getLessons: build.query<Lesson[], string>({
            query: (topicId) => {
                return {url: `/topics/${topicId}/lessons`};
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({id}) => ({type: "Lessons" as const, id})),
                        {type: "Lessons", id: "LIST"},
                    ]
                    : [{type: "Lessons", id: "LIST"}],

            async onQueryStarted(_, {queryFulfilled}) {
                await withToast(queryFulfilled, {
                    error: "Failed to fetch lessons.",
                });
            },
        }),
        getLesson: build.query<Lesson, string>({
            query: (lessonId) => `/lessons/${lessonId}`,
            providesTags: (result, error, id) => [{type: "LessonDetails", id}],
            async onQueryStarted(_, {queryFulfilled}) {
                toast.promise(queryFulfilled, {
                    loading: "Fetching Lesson...",
                    error: "Failed to fetch lesson.",
                });
            },
        }),
        createLesson: build.mutation<Lesson, Omit<Lesson, 'id'>>({
            query: (lessonData) => ({
                url: "/lessons",
                method: "POST",
                body: lessonData,
            }),

            invalidatesTags: (result, error, {topicId}) => [
                {type: "Lessons", id: topicId},
                {type: "Lessons", id: "LIST"},
            ],

            async onQueryStarted(_, {queryFulfilled}) {
                toast.promise(queryFulfilled, {
                    loading: "Creating Lesson...",
                    success: "Lesson created successfully!",
                    error: "Failed to create lesson.",
                });
            },
        }),
    }),
});

export const s3api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_HOST_URL,
        prepareHeaders: async (headers) => {
            headers.set("Content-Type", `application/json`);
            console.log(headers.entries());
            return headers;
        }
    }),
    reducerPath: "s3api",
    tagTypes: [],
    endpoints: (build) => ({
        // Getting signed URL
        getSignedUrl: build.mutation<{ uploadUrl: string; fileKey: string }, { fileName: string; fileType: string }>({
            query: (payload) => {
                return {
                    url: "/upload",
                    method: "POST",
                    body: payload,
                }
            },

            invalidatesTags: [],

            async onQueryStarted(_, {queryFulfilled}) {
                toast.promise(queryFulfilled, {
                    loading: "Getting signed url...",
                    success: "Received signed url!",
                    error: "Failed getting signed url.",
                });
            },
        }),
        uploadVideoToS3: build.mutation<null, { uploadUrl: string; file: File }>({
            queryFn: async ({uploadUrl, file}) => {
                try {
                    const response = await fetch(uploadUrl, {
                        method: "PUT",
                        body: file,
                        headers: {"Content-Type": file.type},
                    });

                    if (!response.ok) throw new Error('S3 Upload Failed');

                    return {data: null };
                } catch (error) {
                    return {error: {status: 'CUSTOM_ERROR', error: String(error)}};
                }
            },

            invalidatesTags: [],

            async onQueryStarted(_, {queryFulfilled}) {
                toast.promise(queryFulfilled, {
                    loading: "Uploading video...",
                    success: "Video uploaded successfully!",
                    error: "Failed to upload video.",
                });
            },
        }),
    }),
});

export const {
    useGetAuthUserQuery,
    useGetSubjectQuery,
    useGetSubjectsForInstructorQuery,
    useGetSubjectsByGradeQuery,
    useGetTopicsBySubjectQuery,
    useCreateTopicMutation,
    useGetTopicQuery,
    useGetLessonsQuery,
    useGetLessonQuery,
    useGetStudentEnrollmentsQuery,
    useGetEnrollmentQuery,
    useGetNonEnrollmentsQuery,
    useCreateEnrollmentMutation,
    useCreateSubjectMutation,
    useCreateLessonMutation
} = api;

export const {
    useGetSignedUrlMutation,
    useUploadVideoToS3Mutation
} = s3api;

