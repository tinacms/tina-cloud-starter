import { GlobalStyles, PageStyles } from "../components/document-renderer";

export default function FourOhFour() {
  return (
    <>
      <div className="header">
        <div className="container">
          <h1 className="title">404 - NOT FOUND</h1>
        </div>
      </div>
      <div className="content">
        <div className="container">
          <div className="card">
            <div className="cardBody">
              <h2>OOPS, NOTHING TO SEE HERE...</h2>
              <a href="/">Go back home</a>
            </div>
          </div>
        </div>
      </div>

      <style global jsx>
        {GlobalStyles}
      </style>
      <style jsx>{PageStyles}</style>
    </>
  );
}
