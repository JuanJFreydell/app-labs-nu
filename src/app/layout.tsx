import type { Metadata } from "next";
import Header from "@/components/header";
import { Geist, Geist_Mono } from "next/font/google";
import { getAuthenticatedUserProfileBasic } from "@/db/handlers";
import "@/styles/globals.css";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getAuthenticatedUserProfileBasic();

  return (
    <html lang="en" className="min-h-screen">
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <Header user={user} />
        <main className="bg-gray-100">{children}</main>
      </body>
    </html>
  );
}
