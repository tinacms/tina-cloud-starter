import React from "react";
import Link from "next/link";
// @ts-ignore
import TinaIconSvg from "../public/tina.svg";
import { FaFacebookF, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { Container } from "./container";
import { RawRenderer } from "./rawRenderer";

export const Footer = ({ data, rawData }) => {
  const socialIconClasses =
    "h-6 w-auto text-blue-500 dark:text-blue-400 hover:text-blue-300";

  return (
    <footer className="text-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-1000">
      <Container className="max-w-6xl relative" size="small">
        <div className="flex justify-between items-center gap-6 flex-wrap">
          <Link href="/" passHref>
            <a className="group mx-2 flex items-center font-bold tracking-tight text-gray-500 dark:text-gray-300 opacity-80 hover:opacity-100 transition duration-150 ease-out whitespace-nowrap">
              <TinaIconSvg className="inline-block mr-2 h-8 w-auto text-orange-500" />
              <span className="opacity-40 group-hover:opacity-100 transition duration-150 ease-out">
                Tina Starter
              </span>
            </a>
          </Link>
          <div className="flex gap-3">
            {data && data.facebook && (
              <a href={data.facebook} target="_blank">
                <FaFacebookF className={socialIconClasses} />
              </a>
            )}
            {data && data.twitter && (
              <a href={data.twitter} target="_blank">
                <FaTwitter className={socialIconClasses} />
              </a>
            )}
            {data && data.instagram && (
              <a href={data.instagram} target="_blank">
                <FaInstagram className={socialIconClasses} />
              </a>
            )}
            {data && data.github && (
              <a href={data.github} target="_blank">
                <FaGithub className={socialIconClasses} />
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

export const footerQueryFragment = `
  getGlobalDocument(relativePath: "index.json") {
    data {
      footer {
        facebook
        twitter
        instagram
        github
      }  
    }
  }
`;
