import React from "react";
import Head from "next/head";
import { Nav } from "./nav";

export const Wrapper = (props: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Tina</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <Nav />
        {props.children}
      </div>
    </>
  );
};
