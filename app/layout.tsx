import type { Metadata } from "next";
import { IBM_Plex_Serif, JetBrains_Mono, Geist } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import "./globals.css";
import Navbar from "@/components/Navbar";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

const ibmPlexSerif = IBM_Plex_Serif({
  variable: "--font-ibm-plex-serif",
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap'
})

const monaSans = Geist({ subsets: ["latin"], variable: "--font-mona-sans" });

export const metadata: Metadata = {
  title: "Bookified",
  description: "Transform your books into interactive AI Conversations. Upload PDFs, and chat with your books using voice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body
          className={cn(
              jetbrainsMono.variable,
              ibmPlexSerif.variable,
              monaSans.variable,
              "relative font-sans antialiased"
          )}
      >
          <ClerkProvider>
            <Navbar/>
            {children}
          </ClerkProvider>
      </body>
    </html>

  );
}
