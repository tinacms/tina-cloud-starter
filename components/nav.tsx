import React from "react";
import Link from "next/link";
import { Container } from "./container";
// @ts-ignore
import TinaIconSvg from "../public/tina.svg";

export const Nav = ({ data }) => {
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

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-700 dark:to-gray-800">
      <Container className="py-0 relative z-10 max-w-8xl">
        <div className="flex items-center justify-between">
          <h4 className="select-none text-lg font-bold tracking-tight my-4 transition duration-150 ease-out transform text-gray-800 dark:text-gray-50">
            <Link href="/home" passHref>
              <a className="flex items-center">
                <TinaIconSvg className="inline-block mr-2.5 h-9 w-auto text-orange-500" />{" "}
                Tina Starter
              </a>
            </Link>
          </h4>
          <ul className="flex gap-6 sm:gap-8 lg:gap-10">
            {data &&
              data.map((item, i) => {
                const activeItem = windowUrl.includes(item.href);
                const listItemClasses = activeItem
                  ? "border-b-3 border-blue-200 dark:border-blue-700"
                  : "";
                return (
                  <li key={item.label} className={listItemClasses}>
                    <Link href={`${prefix}/${item.href}`} passHref>
                      <a className="select-none	text-base inline-block tracking-wide font-regular transition duration-150 ease-out text-gray-600 dark:text-gray-100 opacity-70 hover:opacity-100 py-8">
                        {item.label}
                      </a>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="absolute h-1 bg-gradient-to-r from-transparent via-gray-50 dark:via-gray-700 to-transparent bottom-0 left-4 right-4 -z-1"></div>
      </Container>
    </div>
  );
};

export const navQueryFragment = `
  getGlobalDocument(relativePath: "index.json") {
    data {
      nav {
        href
        label
      }
    }
  }
`;
