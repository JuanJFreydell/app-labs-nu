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
        <nav className="fixed top-0 right-0 z-50 flex h-14 w-full justify-between bg-black">
          <div className="flex h-full w-fit flex-row">
            <p className="flex h-full w-fit items-center bg-red-600 px-5 font-serif text-3xl text-white">
              N
            </p>
            <p className="hidden h-full w-fit items-center px-10 font-serif text-3xl text-white sm:flex">
              App Lab NU
            </p>
          </div>
          <ul className="flex h-full flex-row items-center justify-center px-2 text-xl text-white">
            <Link href="/" className="cursor-pointer p-2 hover:bg-red-600">
              About
            </Link>
            <Link href="/teams" className="cursor-pointer p-2 hover:bg-red-600">
              Groups
            </Link>
            <Link
              href="/members"
              className="cursor-pointer p-2 hover:bg-red-600"
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
