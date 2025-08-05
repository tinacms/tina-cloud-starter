"use client";

import React from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Icon } from "../../icon";
import { useLayout } from "../layout-context";
import { Menu, X } from "lucide-react";
import LocaleSwitcher from "./locale-switcher";

export const Header = () => {
  const { globalSettings, theme } = useLayout();
  const header = globalSettings!.header!;

  const [menuState, setMenuState] = React.useState(false)
  return (
    <header>
      <nav
        data-state={menuState && 'active'}
        className="bg-background/50 fixed z-20 w-full border-b backdrop-blur-3xl h-16">
        <div className="mx-auto max-w-6xl px-6 h-full">
          <div className="relative flex items-center justify-between h-full">
            
            {/* Left side: Logo + Navigation */}
            <div className="flex items-center gap-8 h-full">
              {/* Logo */}
              <Link
                href="/"
                aria-label="home"
                className="flex items-center h-full py-2">
                {header.icon!.name === "LIA" ? (
                  <Image
                    src="/images/lia-logo.png"
                    alt="Light in Asia Logo"
                    width={56}
                    height={56}
                    className="h-14 w-auto"
                    priority
                  />
                ) : (
                  <Icon
                    parentColor={header.color!}
                    data={{
                      name: header.icon!.name,
                      color: header.icon!.color,
                      style: header.icon!.style,
                    }}
                  />
                )}
              </Link>

              {/* Navigation - Desktop */}
              <div className="hidden lg:block h-full">
                <ul className="flex gap-8 text-sm h-full items-center">
                  {header.nav!.map((item, index) => (
                    <li key={index} className="h-full flex items-center">
                      <Link
                        href={item!.href!}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150 h-full flex items-center">
                        <span>{item!.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right side: Language Switcher + Site Name */}
            <div className="hidden lg:flex items-center gap-4 h-full">
              <LocaleSwitcher />
              <span className="text-sm font-medium text-muted-foreground">
                |
              </span>
              <span className="text-sm font-medium">
                {header.name}
              </span>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuState(!menuState)}
              aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
              className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden h-12 w-12 flex items-center justify-center">
              <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
              <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
            </button>

            {/* Mobile navigation menu */}
            <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:hidden lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent absolute top-16 left-0 right-0">
              <div className="w-full">
                {/* Mobile Navigation */}
                <ul className="space-y-6 text-base mb-6">
                  {header.nav!.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item!.href!}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150">
                        <span>{item!.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                
                {/* Mobile Language Switcher & Site Name */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <LocaleSwitcher />
                  <span className="text-sm font-medium">
                    {header.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
