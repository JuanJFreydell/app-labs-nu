"use client";

import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineBars3, HiOutlineXMark, HiChevronDown } from "react-icons/hi2";
import { signOut } from "@/supabase/sign-out";
import { BasicUserInfo } from "@/zod";
import { usePathname, redirect } from "next/navigation";

const navigation = [
  { href: "/", name: "About" },
  { href: "/teams", name: "Groups" },
  { href: "/members", name: "Members" },
];

const userNavigation = [
  // { name: "Your Profile", href: "/profile" },
  { name: "Settings", href: "/settings" },
];

export default function Header({ user }: { user: BasicUserInfo | undefined }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const path = usePathname();

  if (user && !user.isProfileComplete && path !== "/settings") {
    redirect("/settings");
  }

  return (
    <header className="h-header sticky inset-0 top-0 z-10 bg-white shadow-sm">
      <nav
        aria-label="Global"
        className="flex items-center justify-between px-6 py-3 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">NU App Lab</span>
            <Image
              alt="App Lab NU"
              src="/nu-club-logo.png"
              width={100}
              height={100}
              className="h-8 w-auto"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <HiOutlineBars3
              aria-hidden="true"
              className="size-6 cursor-pointer"
            />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm/6 font-semibold text-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {user ? (
            user.isProfileComplete ? (
              <Menu as="div" className="relative">
                <MenuButton className="-m-1.5 flex cursor-pointer items-center p-1.5">
                  <span className="sr-only">Open user menu</span>

                  {user.avatarUrl ? (
                    <Image
                      alt={`${user?.firstName} ${user?.lastName}`}
                      src={user?.avatarUrl}
                      width={32}
                      height={32}
                      className="size-8 rounded-full bg-gray-50"
                    />
                  ) : (
                    <span className="mx-auto flex size-8 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold">{`${user.firstName ? user.firstName[0] : ""}${user.lastName ? user.lastName[0] : ""}`}</span>
                  )}
                  <span className="hidden lg:flex lg:items-center">
                    <span
                      aria-hidden="true"
                      className="ml-4 text-sm/6 font-semibold text-gray-900"
                    >
                      {`${user.firstName} ${user.lastName}`}
                    </span>
                    <HiChevronDown
                      aria-hidden="true"
                      className="ml-2 size-5 text-gray-400"
                    />
                  </span>
                </MenuButton>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  {userNavigation.map((item) => (
                    <MenuItem key={item.name}>
                      <Link
                        href={item.href}
                        className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                      >
                        {item.name}
                      </Link>
                    </MenuItem>
                  ))}
                  <MenuItem>
                    <button
                      onClick={signOut}
                      className="block w-full cursor-pointer px-3 py-1 text-left text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                    >
                      Sign Out
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              <button
                onClick={signOut}
                className="cursor-pointer text-sm/6 font-semibold text-gray-500 hover:text-gray-900"
              >
                Sign Out<span aria-hidden="true">&rarr;</span>
              </button>
            )
          ) : (
            <Link
              href="/login"
              className="text-sm/6 font-semibold text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>

              <Image
                alt="App Lab NU"
                src="/nu-club-logo.png"
                width={100}
                height={100}
                className="h-16 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <HiOutlineXMark
                aria-hidden="true"
                className="size-6 cursor-pointer"
              />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              {user ? (
                user.isProfileComplete ? (
                  <div className="border-t border-gray-200 pt-4 pb-3">
                    <div className="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
                      <div className="shrink-0">
                        {user.avatarUrl ? (
                          <Image
                            alt={`${user.firstName} ${user.lastName}`}
                            src={user?.avatarUrl}
                            width={40}
                            height={40}
                            className="size-10 rounded-full"
                          />
                        ) : (
                          <span className="mx-auto flex size-10 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold">{`${user.firstName ? user.firstName[0] : ""}${user.lastName ? user.lastName[0] : ""}`}</span>
                        )}
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-gray-800">
                          {`${user.firstName} ${user.lastName}`}
                        </div>
                        <div className="text-sm font-medium text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <div className="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
                      {userNavigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                        >
                          {item.name}
                        </a>
                      ))}
                      <button
                        className="block w-full cursor-pointer rounded-md px-3 py-2 text-left text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                        onClick={() => signOut()}
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="py-6">
                    <button
                      className="block w-full cursor-pointer rounded-md px-3 py-2 text-left text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                      onClick={() => signOut()}
                    >
                      Sign Out
                    </button>
                  </div>
                )
              ) : (
                <div className="py-6">
                  <Link
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                </div>
              )}
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
