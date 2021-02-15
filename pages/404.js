import Link from 'next/link'
import css from "styled-jsx/css";

export default function FourOhFour() {
  return <>
    <div className="header">
        <div className="container">
          <h1 className="title">Ooops, nothing to see around here…</h1>
        </div>
      </div>
      <div className="content">
        <div className="container">
          <div className="card">
            <div className="cardBody">
            <button className="button">
                <Link href="/"><a>Go back home</a></Link>
            </button>
            </div>
          </div>
        </div>
      </div> 

    <style global jsx>
        {GlobalStyles}
    </style>
    <style jsx>{PageStyles}</style>
  </>
}


const GlobalStyles = css.global`
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

const PageStyles = css`
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
  }

  .cardBody {
    background: var(--white);
    padding: 2rem;
  }

  .cardFooter {
    background: var(--gray);
    padding: 1rem 2rem;
  }

  .button {
    border: none;
    outline: none;
    color: white;
    border-radius: 2rem;
    background: var(--orange);
    font-size: 1em;
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    transition: all 150ms ease-out;
    margin: 0.25rem 0;
  }

  .button a {
    color: white;
  }

  .button:hover,
  .button:focus {
    background: var(--orange-light);
    box-shadow: 0 0 0 2px var(--orange-light);
  }
`;
