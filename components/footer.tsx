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
      <Container className="relative" size="small">
        <div className="flex justify-center items-center gap-6">
          <div className="flex">
            <a href="https://tina.io/" target="_blank" className="mx-2">
              <TinaIconSvg className={socialIconClasses} />
            </a>
            {data && data.facebook && (
              <a href={data.facebook} target="_blank" className="mx-2">
                <FaFacebookF className={socialIconClasses} />
              </a>
            )}
            {data && data.twitter && (
              <a href={data.twitter} target="_blank" className="mx-2">
                <FaTwitter className={socialIconClasses} />
              </a>
            )}
            {data && data.instagram && (
              <a href={data.instagram} target="_blank" className="mx-2">
                <FaInstagram className={socialIconClasses} />
              </a>
            )}
            {data && data.github && (
              <a href={data.github} target="_blank" className="mx-2">
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
