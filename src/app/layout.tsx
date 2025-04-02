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

interface NavLink {
  href: string;
  title: string;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navLinks: NavLink[] = [
    { href: "/", title: "About" },
    { href: "/teams", title: "Groups" },
    { href: "/members", title: "Members" },
  ];

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Navigation Bar */}
        <nav className="sticky top-0 z-50 flex h-14 w-full justify-between bg-black">
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
                  className="cursor-pointer p-2 hover:bg-red-600"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
