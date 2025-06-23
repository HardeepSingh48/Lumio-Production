import type { Metadata } from "next";
import { DM_Sans, Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";

const font = DM_Sans({subsets: ["latin"]});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plura",
  description: "All in one agency solution ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (


      <html lang="en" suppressHydrationWarning>
        <body
          suppressHydrationWarning
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange >

            {children}
          </ThemeProvider>
        </body>
      </html>

  );
}
