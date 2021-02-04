import type * as Tina from "../.tina/types";
import { BlocksRenderer } from "./blocks-renderer";

export const PageRenderer = (props: Tina.Page_Doc_Data) => {
  const { title, blocks } = props;

  return (
    <>
      <div className="page">
        <div className="header">
          <h1 className="title">{title}</h1>
        </div>
        <div className="content">
          <BlocksRenderer blocks={blocks} />
        </div>
      </div>
      <style global jsx>{`
        html {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
            Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
            "Segoe UI Symbol";
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
      `}</style>
      <style jsx>{`
        .page {
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: flex-start;

          --blue: #241748;
          --blue-light: #2e3258;

          --mint: #b4f4e0;
          --mint-light: #e6faf8;
        }

        .header,
        .content {
          display: grid;
          grid-template-columns: minmax(200px, 1200px);
          justify-content: center;
        }

        .header {
          flex: 0 0 auto;
          padding: 4rem 3rem 1.5rem 3rem;
          background: linear-gradient(
            to bottom,
            var(--blue),
            var(--blue-light)
          );
        }

        .title {
          color: #b4f4e0;
          font-size: 2.5rem;
        }

        .content {
          flex: 1 0 auto;
          padding: 1.5rem 3rem 4rem 3rem;
          background: var(--mint-light);
          color: var(--blue);
        }
      `}</style>
    </>
  );
};
