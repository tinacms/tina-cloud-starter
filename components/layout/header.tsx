import React from "react";
import Link from "next/link";
import { Disclosure, Transition } from "@headlessui/react";
import { BiMenu, BiX } from "react-icons/bi";
import { useRouter } from "next/router";
import { Container } from "../util/container";
import { useTheme } from ".";
import Image from "next/image";

const RouterChangeComplete = ({ callback, children }) => {
  const router = useRouter();

  React.useEffect(() => {
    const handleRouteChange = () => {
      callback();
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return children;
};

export const Header = ({ data }) => {
  const router = useRouter();
  const theme = useTheme();

  const headerColor = {
    default: "text-green-900 dark:text-white bg-white dark:bg-yellow-800",
    primary: {
      blue: "text-white from-blue-300 to-blue-500",
      teal: "text-white from-teal-400 to-teal-500",
      green: "text-white from-green-400 to-green-500",
      red: "text-white from-red-400 to-red-500",
      pink: "text-white from-pink-400 to-pink-500",
      purple: "text-white from-purple-400 to-purple-500",
      orange: "text-white from-orange-400 to-orange-500",
      yellow: "text-white from-yellow-400 to-yellow-500",
    },
  };

  const headerColorCss =
    data.color === "primary"
      ? headerColor.primary[theme.color]
      : headerColor.default;

  const activeItemClasses = {
    blue: "border-b-3 border-blue-200 text-blue-700 dark:text-blue-300 font-medium dark:border-blue-700",
    teal: "border-b-3 border-teal-200 text-teal-700 dark:text-teal-300 font-medium dark:border-teal-700",
    green:
      "border-b-3 border-green-200 text-green-700 dark:text-green-300 font-medium dark:border-green-700",
    red: "border-b-3 border-red-300 text-red-700 dark:text-green-300 font-medium dark:border-red-700",
    pink: "border-b-3 border-pink-200 text-pink-700 dark:text-pink-300 font-medium dark:border-pink-700",
    purple:
      "border-b-3 border-purple-200 text-purple-700 dark:text-purple-300 font-medium dark:border-purple-700",
    orange:
      "border-b-3 border-orange-200 text-orange-700 dark:text-orange-300 font-medium dark:border-orange-700",
    yellow:
      "border-b-3 border-yellow-300 text-yellow-700 dark:text-yellow-300 font-medium dark:border-yellow-600",
  };

  const activeBackgroundClasses = {
    blue: "text-blue-500",
    teal: "text-teal-500",
    green: "text-green-500",
    red: "text-red-500",
    pink: "text-pink-500",
    purple: "text-purple-500",
    orange: "text-orange-500",
    yellow: "text-yellow-500",
  };

  // If we're on an admin path, other links should also link to their admin paths
  const [prefix, setPrefix] = React.useState("");

  React.useEffect(() => {
    if (window && window.location.pathname.startsWith("/admin")) {
      setPrefix("/admin");
    }
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 font-truculenta shadow-md ${headerColorCss}`}
    >
      <Container size="custom" className={`relative z-20 max-w-8xl py-0`}>
        <div className="flex items-center justify-between gap-6">
          <div className="my-4 transform select-none text-lg font-bold tracking-tight transition duration-150 ease-out">
            <Link
              href="/"
              passHref
              className="flex items-center gap-1 whitespace-nowrap tracking-[.002em]"
            >
              <Image
                className="relative z-20 h-8 w-auto max-w-xs sm:h-10 md:h-12 lg:max-w-none"
                alt={data.logo.alt}
                src={data.logo.src}
                width={160}
                height={40}
              />
            </Link>
          </div>
          <Disclosure as="nav">
            {({ open, close }) => (
              <RouterChangeComplete callback={close}>
                <div className="mx-auto">
                  <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                      {/* Mobile menu button*/}
                      <Disclosure.Button className="relative z-50 inline-flex items-center justify-center p-2 text-[#BAC590] focus:outline-none">
                        <span className="sr-only">Otevřít hlavní menu</span>
                        <Transition
                          className="absolute transition-transform hover:scale-110"
                          show={open}
                          enter="transition duration-200 ease-out"
                          enterFrom="transform -rotate-45 opacity-0"
                          enterTo="transform rotate-0 opacity-100"
                          leave="transition duration-200 ease-out"
                          leaveFrom="transform rotate-0 opacity-100"
                          leaveTo="transform -rotate-45 opacity-0"
                        >
                          <BiX className="block h-8 w-8" aria-hidden="true" />
                        </Transition>
                        <Transition
                          className="absolute transition-transform hover:scale-110"
                          show={!open}
                          enter="transition duration-200 ease-out"
                          enterFrom="transform rotate-45 opacity-0"
                          enterTo="transform rotate-0 opacity-100"
                          leave="transition duration-200 ease-out"
                          leaveFrom="transform rotate-0 opacity-100"
                          leaveTo="transform rotate-45 opacity-0"
                        >
                          <BiMenu
                            className="block h-7 w-7"
                            aria-hidden="true"
                          />
                        </Transition>
                      </Disclosure.Button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                      <div className="hidden sm:ml-6 sm:block">
                        <div className="flex space-x-4">
                          <ul className="-mx-4 flex gap-2 tracking-[.002em] sm:gap-3 md:gap-6 lg:gap-8">
                            {data.nav?.map((item, i) => {
                              const activeItem =
                                item.href === ""
                                  ? ["/", "/home"].includes(router.asPath)
                                  : router.asPath.includes(item.href);
                              return (
                                <li
                                  key={`${item.label}-${i}`}
                                  className={`${
                                    activeItem
                                      ? activeItemClasses[theme.color]
                                      : ""
                                  }`}
                                >
                                  <Link
                                    href={`${prefix}/${item.href}`}
                                    passHref
                                    className={`relative inline-block select-none	whitespace-nowrap py-4 px-2 text-sm tracking-wide transition duration-150 ease-out hover:opacity-100 sm:py-6 md:px-4 md:text-base ${
                                      activeItem ? `` : `opacity-70`
                                    }`}
                                    aria-current={
                                      activeItem ? "page" : undefined
                                    }
                                  >
                                    {item.label}
                                    {activeItem && (
                                      <svg
                                        className={`absolute bottom-0 left-1/2 -z-1 h-full w-[180%] -translate-x-1/2 opacity-10 dark:opacity-15 ${
                                          activeBackgroundClasses[theme.color]
                                        }`}
                                        preserveAspectRatio="none"
                                        viewBox="0 0 230 230"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <rect
                                          x="230"
                                          y="230"
                                          width="230"
                                          height="230"
                                          transform="rotate(-180 230 230)"
                                          fill="url(#paint0_radial_1_33)"
                                        />
                                        <defs>
                                          <radialGradient
                                            id="paint0_radial_1_33"
                                            cx="0"
                                            cy="0"
                                            r="1"
                                            gradientUnits="userSpaceOnUse"
                                            gradientTransform="translate(345 230) rotate(90) scale(230 115)"
                                          >
                                            <stop stopColor="currentColor" />
                                            <stop
                                              offset="1"
                                              stopColor="currentColor"
                                              stopOpacity="0"
                                            />
                                          </radialGradient>
                                        </defs>
                                      </svg>
                                    )}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Transition
                  className="absolute top-16 left-0 z-40 w-full shadow-md sm:hidden"
                  enter="transition duration-100 ease-out"
                  enterFrom="transform -translate-y-1/4 opacity-0"
                  enterTo="transform translate-y-0 opacity-100"
                  leave="transition duration-100 ease-out"
                  leaveFrom="transform scale-y-100 opacity-100"
                  leaveTo="transform scale-y-70 opacity-0"
                >
                  <Disclosure.Panel>
                    <div className="space-y-1 bg-white bg-opacity-90 px-6 pt-2 pb-3 backdrop-blur-xl">
                      <ul className="-mx-4 flex flex-col gap-2 tracking-[.002em] sm:gap-3 md:gap-6 lg:gap-8">
                        {data.nav?.map((item, i) => {
                          const activeItem =
                            item.href === ""
                              ? ["/", "/home"].includes(router.asPath)
                              : router.asPath.includes(item.href);
                          return (
                            <li
                              key={`${item.label}-${i}`}
                              className={`flex justify-center ${
                                activeItem ? activeItemClasses[theme.color] : ""
                              }`}
                            >
                              <Link
                                href={`${prefix}/${item.href}`}
                                passHref
                                className={`relative inline-block w-full select-none whitespace-nowrap py-4	px-2 text-center text-sm tracking-wide transition duration-150 ease-out hover:opacity-100  focus:bg-yellow-500 focus:bg-opacity-50 active:bg-yellow-500 active:bg-opacity-70 sm:py-6 md:px-4 md:text-base ${
                                  activeItem ? `` : `opacity-70`
                                }`}
                                tabIndex={0}
                                aria-current={activeItem ? "page" : undefined}
                              >
                                {item.label}
                                {activeItem && (
                                  <svg
                                    className={`absolute bottom-0 left-1/2 -z-1 h-full w-[180%] -translate-x-1/2 opacity-10 dark:opacity-15 ${
                                      activeBackgroundClasses[theme.color]
                                    }`}
                                    preserveAspectRatio="none"
                                    viewBox="0 0 230 230"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <rect
                                      x="230"
                                      y="230"
                                      width="230"
                                      height="230"
                                      transform="rotate(-180 230 230)"
                                      fill="url(#paint0_radial_1_33)"
                                    />
                                    <defs>
                                      <radialGradient
                                        id="paint0_radial_1_33"
                                        cx="0"
                                        cy="0"
                                        r="1"
                                        gradientUnits="userSpaceOnUse"
                                        gradientTransform="translate(345 230) rotate(90) scale(230 115)"
                                      >
                                        <stop stopColor="currentColor" />
                                        <stop
                                          offset="1"
                                          stopColor="currentColor"
                                          stopOpacity="0"
                                        />
                                      </radialGradient>
                                    </defs>
                                  </svg>
                                )}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </Disclosure.Panel>
                </Transition>
              </RouterChangeComplete>
            )}
          </Disclosure>
        </div>
      </Container>
    </div>
  );
};
