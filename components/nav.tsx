import React from "react";
import Link from "next/link";
import { Container } from "./container";
// @ts-ignore
import TinaIconSvg from "../public/tina.svg";

export const Nav = () => {
  // If we're on an admin path, other links should also link to their admin paths
  const [prefix, setPrefix] = React.useState("");
  const [windowUrl, setUrl] = React.useState("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  React.useEffect(() => {
    if (window.location.pathname.startsWith("/admin")) {
      setPrefix("/admin");
    }
  });

  const navLinks = [
    {
      href: "",
      name: "Home",
    },
    {
      href: "posts",
      name: "Blog",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <Container className="py-0 relative z-10">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-bold tracking-tight transition duration-150 ease-out transform text-gray-800">
            <Link href="/" passHref>
              <a className="flex items-center">
                <TinaIconSvg className="inline-block mr-2.5 h-9 w-auto text-orange-500" />{" "}
                Tina Starter
              </a>
            </Link>
          </h4>
          <ul className="flex gap-8">
            {navLinks.map((item) => {
              const activeItem =
                item.href === ""
                  ? windowUrl.slice(-1).includes("/")
                  : windowUrl.includes(item.href);
              const listItemClasses = activeItem
                ? "border-b-3 border-blue-200"
                : "";
              return (
                <li className={listItemClasses}>
                  <Link href={`${prefix}/${item.href}`} passHref>
                    <a className="text-base inline-block tracking-wide font-regular transition duration-150 ease-out text-gray-600 opacity-70 hover:opacity-100 py-8">
                      {item.name}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="absolute border-b-3 border-gray-50 w-full bottom-0 left-0 -z-1"></div>
      </Container>
    </div>
  );
};
