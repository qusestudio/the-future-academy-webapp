"use client"

import React from 'react'
import {Authenticator} from "@aws-amplify/ui-react";
import Auth from "@/app/(auth)/auth-provider";
import StoreProvider from "@/state/redux";

const Providers = ( {children} : { children: React.ReactNode }) => {
    return (
        <StoreProvider>
            <Authenticator.Provider>
                <Auth>
                    {children}
                </Auth>
            </Authenticator.Provider>
        </StoreProvider>
    )
}
export default Providers
