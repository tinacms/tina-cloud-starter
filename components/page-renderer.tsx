import type * as Tina from "../.tina/types";
import { BlocksRenderer } from "./blocks-renderer";

export const PageRenderer = (props: Tina.Page_Doc_Data) => {
  const { title, blocks, _body } = props;

  console.log(_body);

  return (
    <>
      <div className="page">
        <div className="header">
          <h1 className="title">{title}</h1>
        </div>
        <div className="content">
          <BlocksRenderer blocks={blocks} />
          {_body?.raw && <p>{_body?.raw}</p>}
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

          --white: #fff;

          --blue: #241748;
          --blue-light: #2e3258;

          --mint: #b4f4e0;
          --mint-light: #e6faf8;

          --orange: #ec4815;
          --orange-light: #eb6337;
        }

        .header,
        .content {
          display: grid;
          grid-template-columns: minmax(200px, 1200px);
          justify-content: center;
        }

        .header {
          flex: 0 0 auto;
          padding: 1rem 3rem 1rem 3rem;
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
          padding: 1.5rem 3rem 4rem 3rem;
          background: var(--mint-light);
          color: var(--blue);
        }
      `}</style>
    </>
  );
};
