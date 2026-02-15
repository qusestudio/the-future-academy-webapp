import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/app/providers";
import {chillax} from "@/app/fonts";
import React from "react";

export const metadata: Metadata = {
  title: "The Future Academy",
  description: "Online High School",
};

import {Space_Grotesk} from "next/font/google";

const spaceMono = Space_Grotesk({
    weight: "400",
    variable: "--font-space-mono",
    subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${chillax.className} ${spaceMono.variable} antialiased`}
      >
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  );
}
