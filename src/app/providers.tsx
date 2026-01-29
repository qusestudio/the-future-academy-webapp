"use client"

import React from 'react'
import {Authenticator} from "@aws-amplify/ui-react";
import Auth from "@/app/(auth)/auth-provider";

const Providers = ( {children} : { children: React.ReactNode }) => {
    return (
        <Authenticator.Provider>
            <Auth>
                {children}
            </Auth>
        </Authenticator.Provider>
    )
}
export default Providers
