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
    title: "Bacii Exam Countdown ",
    description: "Track your remaining days until the Bacii national exam. A helpful countdown tool designed for Grade 12 students preparing for their upcoming exams in Cambodia.",
    keywords: ["Bacii exam", "Grade 12", "exam countdown", "study preparation", "Cambodian national exam", "high school exam"],
    openGraph: {
        title: "Bacii Exam Countdown for Grade 12 Students",
        description: "Keep track of your remaining study time before the Bacii national exam. Stay motivated and organized for your Grade 12 exams.",
        locale: "en_US",
        type: "website",
    },
    viewport: "width=device-width, initial-scale=1",
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
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-full`}
        >
        {children}
        </body>
        </html>
    );
}