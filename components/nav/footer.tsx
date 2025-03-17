"use client";
import React from "react";
import { cn } from "../../lib/utils";
import { Container } from "../layout/container";
import Link from "next/link";
import { Icon } from "../icon";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { useLayout } from "../layout/layout-context";
import { RawRenderer } from "../raw-renderer";
import type { IconType } from "react-icons";

export default function Footer() {
  const { theme, globalSettings, pageData } = useLayout();
  const themeColor = theme!.color!;
  const footer = globalSettings?.footer;

  const footerColor = {
    default:
      "text-gray-800 from-white to-gray-50 dark:from-gray-900 dark:to-gray-1000",
    primary: {
      blue: "text-white from-blue-500 to-blue-700",
      teal: "text-white from-teal-500 to-teal-600",
      green: "text-white from-green-500 to-green-600",
      red: "text-white from-red-500 to-red-600",
      pink: "text-white from-pink-500 to-pink-600",
      purple: "text-white from-purple-500 to-purple-600",
      orange: "text-white from-orange-500 to-orange-600",
      yellow: "text-white from-yellow-500 to-yellow-600",
    },
  };

  const footerColorCss =
    theme?.darkMode === "primary"
      ? footerColor.primary[themeColor]
      : footerColor.default;

  return (
    <footer className={cn(`bg-gradient-to-br`, footerColorCss)}>
      <Container className="relative" size="small">
        <div className="flex justify-between items-center gap-6 flex-wrap">
          <Link
            href="/"
            className="group mx-2 flex items-center font-bold tracking-tight text-gray-400 dark:text-gray-300 opacity-50 hover:opacity-100 transition duration-150 ease-out whitespace-nowrap"
          >
            <Icon
              parentColor={footer!.color!}
              data={{
                name: globalSettings?.header?.icon?.name,
                color:
                  theme!.color === "primary"
                    ? "primary"
                    : globalSettings?.header?.icon?.color,
                style: globalSettings?.header?.icon?.style,
              }}
              className="inline-block h-10 w-auto group-hover:text-orange-500"
            />
          </Link>
          {footer && footer!.social && (
            <div className="flex gap-4">
              {footer.social.facebook && (
                <SocialIcon
                  themeColor={themeColor}
                  footerColor={footer.color!}
                  SocialIconType={FaFacebookF}
                  socialUrl={footer.social.facebook}
                />
              )}
              {footer.social.twitter && (
                <SocialIcon
                  themeColor={themeColor}
                  footerColor={footer.color!}
                  SocialIconType={FaXTwitter}
                  socialUrl={footer.social.twitter}
                />
              )}
              {footer.social.instagram && (
                <SocialIcon
                  themeColor={themeColor}
                  footerColor={footer.color!}
                  SocialIconType={AiFillInstagram}
                  socialUrl={footer.social.instagram}
                />
              )}
              {footer.social.linkedIn && (
                <SocialIcon
                  themeColor={themeColor}
                  footerColor={footer.color!}
                  SocialIconType={FaLinkedin}
                  socialUrl={footer.social.linkedIn}
                />
              )}
              {footer.social.github && (
                <SocialIcon
                  themeColor={themeColor}
                  footerColor={footer.color!}
                  SocialIconType={FaGithub}
                  socialUrl={footer.social.github}
                />
              )}
              {footer.social.youtube && (
                <SocialIcon
                  themeColor={themeColor}
                  footerColor={footer.color!}
                  SocialIconType={FaYoutube}
                  socialUrl={footer.social.youtube}
                />
              )}
            </div>
          )}
          <RawRenderer parentColor={footer!.color} rawData={pageData} />
        </div>
        <div
          className={cn(
            `absolute h-1 bg-gradient-to-r from-transparent`,
            theme!.darkMode === "primary"
              ? `via-white`
              : `via-black dark:via-white`,
            "to-transparent bottom-0 left-4 right-4 -z-1 opacity-5"
          )}
        />
      </Container>
    </footer>
  );
}

interface SocialIconProps {
  themeColor: string;
  footerColor: string;
  SocialIconType: IconType;
  socialUrl: string;
}

const SocialIcon = (props: SocialIconProps) => {
  const { themeColor, footerColor, SocialIconType, socialUrl } = props;

  const socialIconColorClasses = {
    blue: "text-blue-500 dark:text-blue-400 hover:text-blue-300",
    teal: "text-teal-500 dark:text-teal-400 hover:text-teal-300",
    green: "text-green-500 dark:text-green-400 hover:text-green-300",
    red: "text-red-500 dark:text-red-400 hover:text-red-300",
    pink: "text-pink-500 dark:text-pink-400 hover:text-pink-300",
    purple: "text-purple-500 dark:text-purple-400 hover:text-purple-300",
    orange: "text-orange-500 dark:text-orange-400 hover:text-orange-300",
    yellow: "text-yellow-500 dark:text-yellow-400 hover:text-yellow-300",
    primary: "text-white opacity-80 hover:opacity-100",
  };

  const classNames = cn(
    "h-7 w-auto",
    socialIconColorClasses[footerColor === "primary" ? "primary" : themeColor]
  );

  return (
    <a
      className="inline-block opacity-80 hover:opacity-100 transition ease-out duration-150"
      href={socialUrl}
      target="_blank"
    >
      <SocialIconType className={classNames} />
    </a>
  );
};