import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";


import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";
import ModalProvider from "@/providers/modal-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnarToaster } from "@/components/ui/sonner"



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lumio",
  description: "All in one agency solution ",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/assets/plura-logo.svg",
        href: "/assets/plura-logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/assets/plura-logo.svg",
        href: "/assets/plura-logo.svg",
      },
    ],
  },
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
          <ModalProvider>


            {children}
            <Toaster />
            <SonnarToaster position='bottom-left'/>

          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>

  );
}
