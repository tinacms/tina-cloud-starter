import Link from "next/link";
import dynamic from "next/dynamic";

function MyApp({ Component, pageProps }) {
  if (pageProps.preview) {
    const TinaWrapper = dynamic(() => import("../components/tina-wrapper"));
    return (
      <>
        <TinaWrapper query={pageProps.query} variables={pageProps.variables}>
          {(props) => <Component {...props} />}
        </TinaWrapper>
        <Link href={`/api/preview`}>
          <a className="editLink">Exit Edit Mode</a>
        </Link>
        <style jsx>{`
          .editLink {
            position: fixed;
            top: 0;
            right: 0;
            background: var(--orange);
            color: var(--white);
            padding: 0.5rem 0.75rem;
            font-weight: bold;
            text-decoration: none;
            display: inline-block;
            border-bottom-left-radius: 0.5rem;
            cursor: pointer;
          }
        `}</style>
      </>
    );
  }
  return (
    <>
      <Component {...pageProps} />
      <Link href={`/api/preview`}>
        <a className="editLink">Edit Page</a>
      </Link>
      <style jsx>{`
        .editLink {
          position: fixed;
          top: 0;
          right: 0;
          background: var(--orange);
          color: var(--white);
          padding: 0.5rem 0.75rem;
          font-weight: bold;
          text-decoration: none;
          display: inline-block;
          border-bottom-left-radius: 0.5rem;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}

export default MyApp;
