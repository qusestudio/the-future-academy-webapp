"use client"

import React from 'react'
import {Authenticator} from "@aws-amplify/ui-react";
import Auth from "@/app/(auth)/Auth";
import StoreProvider from "@/state/redux";
import {Toaster} from "sonner";
import {ThemeProvider} from "@/components/providers/theme-provider";

const Providers = ( {children} : { children: React.ReactNode }) => {
    return (
        <StoreProvider>
            <ThemeProvider>
                <Authenticator.Provider>
                        <Auth>
                            {children}
                            <Toaster
                                richColors
                                theme={"system"}
                                position={"bottom-right"}
                            />
                        </Auth>
                </Authenticator.Provider>
            </ThemeProvider>
        </StoreProvider>
    )
}
export default Providers
