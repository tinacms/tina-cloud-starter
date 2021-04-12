import React from "react";
import css from "styled-jsx/css";

export const Wrapper = (props: { children: React.ReactNode; data: object }) => {
  return (
    <>
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
      <style global jsx>
        {GlobalStyles}
      </style>
      <style jsx>{PageStyles}</style>
    </>
  );
};

export const GlobalStyles = css.global`
  :root {
    --white: #fff;
    --gray: #f9f9fb;

    --blue: #241748;
    --blue-light: #2e3258;

    --mint: #b4f4e0;
    --mint-light: #e6faf8;

    --orange: #ec4815;
    --orange-light: #eb6337;
  }

  html {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
      sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    box-sizing: border-box;
    font-size: 100%;
  }

  * {
    box-sizing: inherit;
    font-family: inherit;
  }

  body {
    margin: 0;
    background: var(--mint-light);
  }
`;

export const PageStyles = css`
  .container {
    display: block;
    max-width: 960px;
    margin: 0 auto;
  }

  .header {
    flex: 0 0 auto;
    padding: 1.5rem;
  }

  .title {
    color: var(--orange);
    font-size: 1.25rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0;
  }

  .content {
    flex: 1 0 auto;
    padding: 0 1.5rem 2rem 1.5rem;
    color: var(--blue);
  }

  .card {
    background: var(--white);
    border-radius: 0.5rem;
    border: 1px solid var(--mint);
    box-shadow: 0 6px 24px rgba(36, 23, 72, 0.03),
      0 2px 4px rgba(36, 23, 72, 0.03);
    margin-bottom: 2rem;
    overflow: hidden;
    padding: 2rem;
  }

  .cardBody {
    background: var(--white);
    padding: 2rem;
  }

  .cardFooter {
    background: var(--gray);
    padding: 1rem 2rem;
  }
`;

export const RawRenderer = ({ data }) => {
  return (
    <>
      <details className="wrapper">
        <summary className="summary">Raw JSON</summary>
        <pre className="code">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </details>
      <style jsx>{`
        .wrapper {
          display: block;
          border: 1px solid var(--mint);
          border-radius: 0.5rem;
          background: rgba(180, 244, 224, 0.3);
          font-size: 0.75rem;
        }

        .code {
          padding: 0 1rem 1rem 1rem;
          white-space: pre-wrap;
        }

        .summary {
          display: inline-block;
          cursor: pointer;
          display: block;
          font-weight: bold;
          padding: 1rem;
          outline: none;
          user-select: none;
        }

        .summary:hover {
          color: var(--orange);
        }

        .summary::-webkit-details-marker {
          display: none;
        }
      `}</style>
    </>
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
    <div className="nav">
      <h4>
        <a href="/">Tina Cloud Starter</a>
      </h4>
      <ul className="menu">
        <li>
          <a href={`${prefix}/`}>Home</a>
        </li>
        <li>
          <a className="summary" href={`${prefix}/posts/vote-for-pedro`}>
            Vote for Pedro
          </a>
        </li>
      </ul>
      <style jsx>{`
        .nav {
          display: flex;
          justify-content: space-between;
        }
        .menu {
          display: flex;
        }
        ul {
          padding-left: 0;
        }
        li {
          list-style-type: none;
        }
        .menu > li {
          margin-left: 20px;
        }
        a {
          text-decoration: none;
          font-weight: bold;
          color: var(--orange);
        }
        a:hover {
          color: var(--orange-light);
        }
      `}</style>
    </div>
  );
};
