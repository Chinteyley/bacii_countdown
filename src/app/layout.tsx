import type { Metadata } from "next";
import { Doto, Geist, Geist_Mono } from "next/font/google";
import {
  EXAM_DATE_LONG,
  EXAM_START,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_ORIGIN,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/seo";
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
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "bacii 2027 countdown",
    "bacii countdown",
    "Cambodia Bac II",
    "Grade 12 exam date 2027",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    siteName: SITE_NAME,
    url: SITE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const themeInitScript = `try{var t=localStorage.getItem('bacii-theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.classList.toggle('dark',t==='dark');}catch(e){}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: SITE_NAME,
      url: SITE_URL,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      inLanguage: "en",
      isAccessibleForFree: true,
      description: SITE_DESCRIPTION,
      author: {
        "@type": "Person",
        name: "Chintey Ley",
        url: "https://ctey.dev",
      },
    },
    {
      "@type": "Event",
      name: "Cambodia Bac II National Exam 2027",
      url: SITE_URL,
      startDate: EXAM_START,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Country",
        name: "Cambodia",
      },
      description:
        `Cambodia's Grade 12 national exam (Bac II) on ${EXAM_DATE_LONG}.`,
    },
  ],
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
