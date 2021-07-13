import React from "react";
import Link from "next/link";
import { Container } from "./container";
import TinaIconSvg from "../public/tina.svg";

export const Nav = () => {
  // If we're on an admin path, other links should also link to their admin paths
  const [prefix, setPrefix] = React.useState("");

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
      href: "posts/",
      name: "Blog",
    },
  ];

  return (
    <Container className="flex items-center justify-between" size="small">
      <h4 className="font-bold tracking-tight transition duration-150 ease-out transform text-gray-800">
        <Link href="/" passHref>
          <a className="flex items-center">
            <TinaIconSvg className="inline-block mr-2 h-9 w-auto text-orange-500" />{" "}
            Tina Starter
          </a>
        </Link>
      </h4>
      <ul className="flex gap-8">
        {navLinks.map((item) => {
          return (
            <li>
              <Link href={`${prefix}/${item.href}`} passHref>
                <a className="text-base tracking-wide font-regular transition duration-150 ease-out text-gray-600">
                  {item.name}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </Container>
  );
};
