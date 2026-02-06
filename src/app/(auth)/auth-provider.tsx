"use client"

import {Amplify} from "aws-amplify";
import {Authenticator, Heading, Radio, RadioGroupField, useAuthenticator, View} from "@aws-amplify/ui-react";
import {usePathname, useRouter} from "next/navigation";
import {useEffect} from "react";

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
            userPoolClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!
        }
    }
});

const components = {
    Header() {
        return (
            <div className="w-full flex justify-center">
                <View className="max-w-sm w-full">
                    <View className={"mt-4 mb-7"}>
                        <Heading level={3} className="text-2xl font-bold">
                            TheFuture
                            <span className="text-secondary-500 font-light hover:text-primary-300">
                        Academy
                    </span>
                        </Heading>
                        <p className="text-muted-foreground mt-2">
                            <span className="font-bold">Welcome!</span> Please sign in to continue
                        </p>
                    </View>
                </View>
            </div>
        )
    },

    SignIn: {
        Footer() {
            const {toSignUp} = useAuthenticator();
            return (
                <View className={"mt-4 text-center"}>
                    <p className="text-muted-foreground">
                        Don&apos;t have an account?{" "}

                        <button
                            onClick={toSignUp}
                            className="text-primary font-medium hover:underline bg-transparent border-none p-0"
                        >
                            Sign up here
                        </button>
                    </p>
                </View>
            )
        }
    },
    SignUp: {
        FormFields() {
            const {validationErrors} = useAuthenticator();
            return (
                <div className="w-full flex justify-center">
                    <View className="max-w-sm w-full">
                        <Authenticator.SignUp.FormFields/>
                        <RadioGroupField
                            name="custom:role"
                            legend={"Role"}
                            errorMessage={validationErrors?.["custom:role"]}
                            hasError={!!validationErrors?.["custom:role"]}
                            className=""
                        >
                            <div className="flex flex-col text-sm items-start">
                                <Radio value="instructor" className="flex gap-x-2 flex-row-reverse">Instructor</Radio>
                                <Radio value="student" className="flex gap-x-2 flex-row-reverse">Student</Radio>
                            </div>
                        </RadioGroupField>
                    </View>
                </div>
            )
        },
        Footer() {
            const {toSignIn} = useAuthenticator();
            return (
                <div className="w-full flex justify-center">
                    <View className="max-w-sm w-full">
                        <View className={"mt-4 text-center"}>
                            <p className="text-muted-foreground">
                                Already have an account?{" "}

                                <button
                                    onClick={toSignIn}
                                    className="text-primary hover:underline bg-transparent border-none p-0 font-medium"
                                >
                                    Sign in here
                                </button>
                            </p>
                        </View>
                    </View>
                </div>
            )
        }
    }
};

const formFields = {
    signIn: {
        username: {
            placeholder: "Enter your email",
            label: "Email",
            isRequired: true
        },
        password: {
            placeholder: "Enter your password",
            label: "Password",
            isRequired: true
        }
    },
    signUp: {
        username: {
            order: 1,
            placeholder: "Choose a username",
            label: "Username",
            isRequired: true
        },
        email: {
            order: 2,
            placeholder: "Enter your email address",
            label: "Email",
            isRequired: true
        },
        password: {
            order: 3,
            placeholder: "Create a password",
            label: "Password",
            isRequired: true
        },
        // confirmPassword: {
        //     order: 4,
        //     placeholder: "Confirm your password",
        //     label: "Confirm Password",
        //     isRequired: true
        // }
    }
}

const Auth = ({children}:{children: React.ReactNode}) =>  {

    const { user } = useAuthenticator((context) => [context.user]);
    const router = useRouter();
    const pathname = usePathname();

    const isAuthPage = pathname.match(/^\/(signin|signup)$/);
    const isDashboardPage = pathname.startsWith("/instructors") || pathname.startsWith("/students");

    //Redirect authenticated users away from auth pages
    useEffect(() => {
        if (user && isAuthPage) {
            router.push("/");
        }
    }, [user, isAuthPage, router]);

    // Allow access to public pages without authentication
    if (!isAuthPage && !isDashboardPage) {
        return <>{children}</>;
    }

    return (
        <div className="h-full">
            <Authenticator
                components={components}
                formFields={formFields}
                initialState={pathname.includes("signup") ? "signUp" : "signIn"}
            >
                {()=> <>{children}</>}
            </Authenticator>
        </div>
    )

}

export default Auth;