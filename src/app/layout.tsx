import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://bacii.ctey.dev"),
    title: {
        default: "Bacii Exam Countdown",
        template: "%s | Bacii Exam Countdown",
    },
    description: "Track your remaining days until the Bacii national exam. A helpful countdown tool designed for Grade 12 students preparing for their upcoming exams in Cambodia.",
    keywords: ["Bacii exam", "Grade 12", "exam countdown", "study preparation", "Cambodian national exam", "high school exam"],
    openGraph: {
        title: "Bacii Exam Countdown for Grade 12 Students",
        description: "Keep track of your remaining study time before the Bacii national exam. Stay motivated and organized for your Grade 12 exams.",
        locale: "en_US",
        siteName: "Bacii Exam Countdown",
        url: "https://bacii.ctey.dev",
        type: "website",
        images: [
            {
                url: 'https://bacii.ctey.dev/og.png',
                width: 1200,
                height: 630,
                alt: 'CTEY icon',
            }],
    },
    icons: {
        shortcut: "/favicon.ico",
    },
    robots: {
        index: true,
        follow: true,
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