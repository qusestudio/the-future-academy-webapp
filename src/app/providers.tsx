"use client"

import React from 'react'
import {Authenticator} from "@aws-amplify/ui-react";
import Auth from "@/app/(auth)/auth-provider";
import StoreProvider from "@/state/redux";
import {Toaster} from "sonner";

const Providers = ( {children} : { children: React.ReactNode }) => {
    return (
        <StoreProvider>
            <Authenticator.Provider>
                <Auth>
                    {children}
                    <Toaster
                        richColors
                        theme={"system"}
                        position={"bottom-center"}
                    />
                </Auth>
            </Authenticator.Provider>
        </StoreProvider>
    )
}
export default Providers
