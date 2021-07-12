import React from "react";
import Link from "next/link";
import { Container } from "./container";

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
    <Container className="flex justify-between" size="small">
      <h4 className="font-bold tracking-tight transition duration-150 ease-out transform text-blueGray-500 dark:text-blueGray-200 lg:text-md text-bold">
        <Link href="/" passHref>
          <a>Tina Cloud Starter</a>
        </Link>
      </h4>
      <ul className="flex gap-8">
        {navLinks.map((item) => {
          return (
            <li>
              <Link href={`${prefix}/${item.href}`} passHref>
                <a className="text-base tracking-wide font-regular transition duration-150 ease-out text-gray-600 dark:text-gray-200">
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
