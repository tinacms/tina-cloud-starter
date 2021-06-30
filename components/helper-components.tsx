import React from "react";
import { css } from "styled-jsx/css";
import Link from "next/link";
import Head from "next/head";
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
      <div className="header">
        <div className="container">
          <Nav />
        </div>
      </div>
      <div className="content">
        <div className="container">
          <div className="card">{props.children}</div>
          <RawRenderer data={props.data} />
        </div>
      </div>
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

const Nav = () => {
  // If we're on an admin path, other links should also link to their admin paths
  const [prefix, setPrefix] = React.useState("");

  React.useEffect(() => {
    if (window.location.pathname.startsWith("/admin")) {
      setPrefix("/admin");
    }
  });

  return (
    <div>
      <h4>
        <Link href="/" passHref>
          <a>Tina Cloud Starter</a>
        </Link>
      </h4>
      <ul>
        <li>
          <Link href={`${prefix}/`} passHref>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href={`${prefix}/posts/voteForPedro`} passHref>
            <a>Vote for Pedro</a>
          </Link>
        </li>
      </ul>
    </div>
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
