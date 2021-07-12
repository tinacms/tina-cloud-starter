import React from "react";
import Head from "next/head";
import { Nav } from "./nav";
/**
 * For demonstration purposes, feel free to delete or modify
 * any of these components, no magic going on here!
 */

export const Wrapper = (props: { children: React.ReactNode; data: object }) => {
  return (
    <>
      <Head>
        <title>Tina</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Nav />
      {props.children}
      <RawRenderer data={props.data} />
    </>
  );
};

export const RawRenderer = ({ data }) => {
  return (
    <details>
      <summary>Raw JSON</summary>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </details>
  );
};

export const SidebarPlaceholder = () => (
  <div>
    <span>👋</span>
    <h3>
      Welcome to the
      <br />
      <b>Tina Cloud Starter</b>!
    </h3>
    <p>
      Let's get a form set up
      <br />
      so you can start editing.
    </p>
    <p>
      <a href="https://tina.io/docs/tina-cloud/client/" target="_blank">
        <span>📖</span> Client Setup Guide
      </a>
    </p>
  </div>
);
