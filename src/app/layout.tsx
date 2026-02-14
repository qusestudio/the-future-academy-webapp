import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/app/providers";
import {chillax} from "@/app/fonts";
import React from "react";

export const metadata: Metadata = {
  title: "The Future Academy",
  description: "Online High School",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${chillax.className} antialiased`}
      >
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  );
}
