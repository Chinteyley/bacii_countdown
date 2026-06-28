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
  metadataBase: new URL("https://kny.ctey.dev"),
  title: {
    default: "Khmer New Year Countdown",
    template: "%s | Khmer New Year Countdown",
  },
  description:
    "Countdown to Khmer New Year. One number, on a black screen, for Cambodia.",
  keywords: [
    "Khmer New Year",
    "Choul Chnam Thmey",
    "Cambodia",
    "countdown",
    "Maha Songkran",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Khmer New Year Countdown",
    description: "Countdown to Khmer New Year.",
    locale: "en_US",
    siteName: "Khmer New Year Countdown",
    url: "https://kny.ctey.dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Khmer New Year Countdown",
    description: "Countdown to Khmer New Year.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const themeInitScript = `try{var t=localStorage.getItem('kny-theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.classList.toggle('dark',t==='dark');}catch(e){}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Khmer New Year Countdown",
  url: "https://kny.ctey.dev",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Web",
  inLanguage: "en",
  isAccessibleForFree: true,
  description:
    "Free live countdown to Khmer New Year (Choul Chnam Thmey) in Cambodia.",
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
