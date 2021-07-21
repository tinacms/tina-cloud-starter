import React from "react";
import Link from "next/link";
// @ts-ignore
import TinaIconSvg from "../public/tina.svg";
import { FaFacebookF, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { Container } from "./container";
import { RawRenderer } from "./rawRenderer";
import { ThemeContext } from "./theme";

export const Footer = ({ data, rawData }) => {
  const theme = React.useContext(ThemeContext);
  const socialIconClasses = "h-6 w-auto";
  const socialIconColorClasses = {
    blue: "text-blue-500 dark:text-blue-400 hover:text-blue-300",
    teal: "text-teal-500 dark:text-teal-400 hover:text-teal-300",
    green: "text-green-500 dark:text-green-400 hover:text-green-300",
    red: "text-red-500 dark:text-red-400 hover:text-red-300",
    pink: "text-pink-500 dark:text-pink-400 hover:text-pink-300",
    purple: "text-purple-500 dark:text-purple-400 hover:text-purple-300",
    orange: "text-orange-500 dark:text-orange-400 hover:text-orange-300",
    yellow: "text-yellow-500 dark:text-yellow-400 hover:text-yellow-300",
  };

  return (
    <footer className="text-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-1000">
      <Container className="relative" size="small">
        <div className="flex justify-between items-center gap-6 flex-wrap">
          <Link href="/" passHref>
            <a className="group mx-2 flex items-center font-bold tracking-tight text-gray-400 dark:text-gray-300 opacity-30 hover:opacity-100 transition duration-150 ease-out whitespace-nowrap">
              <TinaIconSvg className="inline-block mr-2 h-8 w-auto group-hover:text-orange-500" />
            </a>
          </Link>
          <div className="flex gap-3">
            {data && data.facebook && (
              <a href={data.facebook} target="_blank">
                <FaFacebookF
                  className={`${socialIconClasses} ${
                    socialIconColorClasses[theme.color]
                  }`}
                />
              </a>
            )}
            {data && data.twitter && (
              <a href={data.twitter} target="_blank">
                <FaTwitter
                  className={`${socialIconClasses} ${
                    socialIconColorClasses[theme.color]
                  }`}
                />
              </a>
            )}
            {data && data.instagram && (
              <a href={data.instagram} target="_blank">
                <FaInstagram
                  className={`${socialIconClasses} ${
                    socialIconColorClasses[theme.color]
                  }`}
                />
              </a>
            )}
            {data && data.github && (
              <a href={data.github} target="_blank">
                <FaGithub
                  className={`${socialIconClasses} ${
                    socialIconColorClasses[theme.color]
                  }`}
                />
              </a>
            )}
          </div>
          <RawRenderer rawData={rawData} />
        </div>
        <div className="absolute h-1 bg-gradient-to-r from-transparent via-gray-100 dark:via-gray-800 to-transparent top-0 left-4 right-4 "></div>
      </Container>
    </footer>
  );
};
