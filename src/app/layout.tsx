import type { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
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

interface NavLink {
  href: string;
  title: string;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const { data: auth } = await supabase.auth.getUser();

  const navLinks: NavLink[] = [
    { href: "/", title: "About" },
    { href: "/teams", title: "Groups" },
    { href: "/members", title: "Members" },
    { href: "/login", title: "Log In" },
  ];

  if (auth?.user) {
    navLinks.pop();
    navLinks.push({ href: "/profile", title: "Profile" });
  }

  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <header className="sticky top-0 z-50">
          <nav className="h-header flex w-full justify-between bg-black">
            <Link href="/" className="cursor-pointer">
              <div className="flex h-full w-fit flex-row">
                <p className="flex h-full w-fit items-center bg-red-600 px-5 font-serif text-3xl text-white">
                  N
                </p>
                <p className="hidden h-full w-fit items-center pr-2 pl-5 font-serif text-3xl text-white sm:flex">
                  App Lab NU
                </p>
              </div>
            </Link>
            <ul className="flex h-full flex-row items-center justify-center px-2 text-xl text-white">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="cursor-pointer p-2 hover:rounded-sm hover:bg-red-600"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
