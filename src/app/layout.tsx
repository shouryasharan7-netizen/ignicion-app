import type { Metadata, Viewport } from "next";
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
  metadataBase: new URL("https://ignicion-app.vercel.app"),
  title: "Hybrid Heritage Guardian | Preserving Indian Culture Through AI & Innovation",
  description: "Explore 5,000 years of Indian cultural heritage through interactive AR masterclasses, real-time IoT museum telemetry, folk art games, and verifiable cryptographic GI certificates.",
  keywords: [
    "Indian Cultural Heritage",
    "AR Craft Masterclasses",
    "IoT Museum Conservation",
    "Warli Tribal Art",
    "Dabu Printing",
    "Chhau Masks",
    "Pattachitra",
    "Blockchain GI Certificate",
    "National Crafts Museum"
  ],
  authors: [{ name: "Hybrid Heritage Guardian Team" }],
  openGraph: {
    title: "Hybrid Heritage Guardian | Preserving Culture Through Innovation",
    description: "Interactive AR craft masterclasses, live IoT museum conservation telemetry, and authentic artisan GI provenance on blockchain.",
    url: "https://ignicion-app.vercel.app",
    siteName: "Hybrid Heritage Guardian",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Hybrid Heritage Guardian Emblem"
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png"
  }
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FDFBF7] text-slate-900 selection:bg-[#E65100] selection:text-white">
        {children}
      </body>
    </html>
  );
}
