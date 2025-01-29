import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Navigation Bar */}
        <nav className="flex h-14 w-full items-center fixed top-0 right-0 bg-black z-50">
          <div className="h-full w-full flex flex-row">
            <p className="h-full flex bg-red-600 w-fit items-center text-white px-5 text-3xl font-serif">
              N
            </p>
            <p className="h-full hidden sm:flex items-center text-white px-10 text-3xl font-serif">
              App Lab NU
            </p>
          </div>
          <ul className="px-2 flex w-full justify-center h-full items-center gap-4 flex-row text-white text-xl">
            <Link href="/about" className="cursor-pointer hover:text-red-600">
              About
            </Link>
            <Link href="/teams" className="cursor-pointer hover:text-red-600">
              Groups
            </Link>
            <Link href="/members" className="cursor-pointer hover:text-red-600">
              Members
            </Link>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
