import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    display: "swap",
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase:  new URL("https://kny.ctey.dev"),
    title: {
        default: "Khmer New Year Countdown",
        template: "%s | Khmer New Year Countdown",
    },
    description: "Countdown timer for Khmer New Year, celebrating the Cambodian New Year festival.",
    keywords: ["Khmer New Year", "Cambodia", "countdown", "Chaul Chnam Thmey", "Jol Chnam Thmey"],
    openGraph: {
        title: "Khmer New Year Countdown",
        description: "Track the countdown to Khmer New Year celebrations",
        siteName: "Khmer New Year Countdown",
        type: "website",
        url: "https://kny.ctey.dev",
        locale: "en_US",
        images: [
            {
                url: 'https://kny.ctey.dev/og.png',
                width: 1200,
                height: 630,
                alt: 'CTEY icon',
            }],
    },

    icons: {
        shortcut: "./favicon.ico",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <link rel="icon" href="/icon?<generated>" type="image/png" sizes="32x32" />
            <title></title>
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-full`}
        >
        {children}
        </body>
        </html>
    );
}