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
    default: "BacII Countdown — Cambodia Bac II National Exam Timer",
    template: "%s | BacII Countdown",
  },
  description:
    "BacII Countdown — a free live timer counting down the days until the Cambodian Bac II national exam, made for Grade 12 students.",
  keywords: [
    "BacII Countdown",
    "Bacii countdown timer",
    "Bac II exam",
    "Grade 12",
    "exam countdown",
    "Cambodian national exam",
    "Baccalaureate II",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BacII Countdown — Cambodia Bac II National Exam Timer",
    description:
      "Free live countdown to the Cambodian Bac II national exam, for Grade 12 students.",
    locale: "en_US",
    siteName: "BacII Countdown",
    url: "https://bacii.ctey.dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BacII Countdown — Cambodia Bac II National Exam Timer",
    description:
      "Free live countdown to the Cambodian Bac II national exam, for Grade 12 students.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const themeInitScript = `try{var t=localStorage.getItem('bacii-theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.classList.toggle('dark',t==='dark');}catch(e){}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "BacII Countdown",
  url: "https://bacii.ctey.dev",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  inLanguage: "en",
  isAccessibleForFree: true,
  description:
    "Free live countdown to the Cambodian Bac II national exam for Grade 12 students.",
  author: {
    "@type": "Person",
    name: "Chintey Ley",
    url: "https://ctey.dev",
  },
};

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
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD
            structured data must be emitted as a raw, unescaped script body. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${doto.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
