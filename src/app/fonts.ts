import localFont from "next/font/local"

export const chillax = localFont({
    src: [
        {
            path: "./fonts/chillax/Chillax-Variable.woff2",
            weight: "200 700",
            style: "normal",
        },
    ],
    variable: "--font-chillax",
});
