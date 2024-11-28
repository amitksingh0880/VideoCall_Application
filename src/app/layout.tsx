import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google"
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Navbar from "@/components/layout/Navbar";
import SocketProvider from "@/providers/SocketProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vidoor",
  description: "Video call implementation using webrtc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <SocketProvider>
            <main className="flex flex-col min-h-screen bg-secondary">
              <Navbar />
              {children}</main>
          </SocketProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
