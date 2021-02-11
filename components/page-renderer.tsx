import type * as Tina from "../.tina/types";
import css from "styled-jsx/css";
import { BlocksRenderer } from "./blocks-renderer";

export const PageRenderer = (props: Tina.Page_Doc_Data) => {
  const { title, blocks, _body } = props;

  return (
    <>
      <div className="page">
        <div className="header">
          <div className="container">
            <h1 className="title">{title}</h1>
          </div>
        </div>
        <div className="content">
          <div className="container">
            <BlocksRenderer blocks={blocks} />
            {_body?.raw && <p>{_body?.raw}</p>}
            <details className="rawData">
              <summary>Raw JSON</summary>
              <pre className="rawDataOutput">
                <code>{JSON.stringify(props, null, 2)}</code>
              </pre>
            </details>
          </div>
        </div>
      </div>
      <style global jsx>
        {GlobalStyles}
      </style>
      <style jsx>{PageStyles}</style>
    </>
  );
};

const GlobalStyles = css.global`
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
  }
`;

const PageStyles = css`
  .page {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: ;
    justify-content: flex-start;

    --white: #fff;

    --blue: #241748;
    --blue-light: #2e3258;

    --mint: #b4f4e0;
    --mint-light: #e6faf8;

    --orange: #ec4815;
    --orange-light: #eb6337;
  }

  .container {
    display: block;
    max-width: 960px;
    margin: 0 auto;
  }

  .header {
    flex: 0 0 auto;
    padding: 1rem 1.5rem;
    background: var(--white);
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
    padding: 2rem 1.5rem;
    background: var(--mint-light);
    color: var(--blue);
  }

  .rawData {
    margin-top: 1.5rem;
    display: block;
    border: 1px solid var(--mint);
    border-radius: 0.5rem;
    background: rgba(0, 0, 0, 0.03);
    font-size: 0.75rem;
  }

  .rawData :global(pre) {
    padding: 0 1rem 1rem 1rem;
  }

  .rawData :global(summary) {
    display: inline-block;
    cursor: pointer;
    display: block;
    font-weight: bold;
    padding: 1rem;
    outline: none;
    user-select: none;
  }

  .rawData :global(summary):hover {
    color: var(--orange);
  }

  .rawData :global(summary)::-webkit-details-marker {
    display: none;
  }
`;
