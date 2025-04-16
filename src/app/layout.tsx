"use client";

import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar, Trigger } from "@/components/sidebar/AppSidebar"
import { GlobalParamsProvider } from "@/components/context/GlobalParamsContext";
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
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        <SidebarProvider className="relative bg-base-200">
          <GlobalParamsProvider>
            <AppSidebar />
            <Trigger />
            <main
              className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} text-base-content antialiased w-full`}
            >
              {children}
            </main>
          </GlobalParamsProvider>
        </SidebarProvider>
        </ThemeProvider>
      </body>
    </html> 
  );
}
