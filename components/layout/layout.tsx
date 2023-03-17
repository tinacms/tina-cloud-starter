import React from "react";
import Head from "next/head";
import { Header } from "./header";
import { Footer } from "./footer";
import layoutData from "../../content/global/index.json";
import { Theme } from "./theme";

export const Layout = ({ rawData = {}, data = layoutData, children }) => {
  return (
    <>
      <Head>
        <title>Habitat</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {data.theme.font === "nunito" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,700;0,800;1,400;1,700;1,800&display=swap"
              rel="stylesheet"
            />
          </>
        )}
        {data.theme.font === "lato" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap"
              rel="stylesheet"
            />
          </>
        )}
      </Head>
      <Theme data={data?.theme}>
        <div className={`flex min-h-screen flex-col font-${data.theme.font}`}>
          <Header data={data?.header} />
          <div
            className={`font-${data.theme.font} flex flex-1 flex-col bg-white text-green-900 dark:bg-gray-900 `}
          >
            {children}
          </div>
          <Footer
            rawData={rawData}
            data={data?.footer}
            logo={data?.header.logo}
          />
        </div>
      </Theme>
    </>
  );
};
