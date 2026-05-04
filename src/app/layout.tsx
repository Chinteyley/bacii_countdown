import type { Metadata } from "next";
import { Doto, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const doto = Doto({
  variable: "--font-doto",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bacii.ctey.dev"),
  title: {
    default: "Bacii Exam Countdown",
    template: "%s | Bacii Exam Countdown",
  },
  description:
    "Countdown to the Cambodian Bac II national exam. One number, on a black screen, for Grade 12 students.",
  keywords: [
    "Bacii exam",
    "Bac II",
    "Grade 12",
    "exam countdown",
    "Cambodian national exam",
  ],
  openGraph: {
    title: "Bacii Exam Countdown",
    description: "Countdown to the Cambodian Bac II national exam.",
    locale: "en_US",
    siteName: "Bacii Exam Countdown",
    url: "https://bacii.ctey.dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bacii Exam Countdown",
    description: "Countdown to the Cambodian Bac II national exam.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const themeInitScript = `try{var t=localStorage.getItem('bacii-theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.classList.toggle('dark',t==='dark');}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: required to
            apply the theme class before paint and avoid a flash of the wrong
            theme. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${doto.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
