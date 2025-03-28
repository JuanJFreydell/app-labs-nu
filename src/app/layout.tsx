import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
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
  title: "NU APP LAB",
  description: "Northeastern Students Build",
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
        <nav className="flex h-14 w-full justify-between fixed top-0 right-0 bg-black z-50">
          <div className="h-full w-fit flex flex-row">
            <p className="h-full flex bg-red-600 w-fit items-center text-white px-5 text-3xl font-serif">
              N
            </p>
            <p className="h-full hidden w-fit sm:flex items-center text-white px-10 text-3xl font-serif">
              App Lab NU
            </p>
          </div>
          <ul className="px-2 flex justify-center h-full items-center flex-row text-white text-xl">
            <Link href="/" className="cursor-pointer hover:bg-red-600 p-2">
              About
            </Link>
            <Link href="/teams" className="cursor-pointer hover:bg-red-600 p-2">
              Groups
            </Link>
            <Link
              href="/members"
              className="cursor-pointer hover:bg-red-600 p-2"
            >
              Members
            </Link>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
