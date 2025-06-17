"use client";

import { SharedDataProvider } from "@/components/context/SharedDataContext";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html>
      <body>
        <SharedDataProvider>
          <main
            className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} text-base-content antialiased w-full`}
          >
            {children}
          </main>
        </SharedDataProvider>
      </body>
    </html> 
  );
}
