import Link from "next/link";
import dynamic from "next/dynamic";

function MyApp({ Component, pageProps }) {
  if (pageProps.preview) {
    const TinaWrapper = dynamic(() => import("../components/tina-wrapper"));
    return (
      <>
        <TinaWrapper {...pageProps}>
          {(props) => <Component {...props} />}
        </TinaWrapper>
        <EditToggle isInEditMode={true} />
      </>
    );
  }
  return (
    <>
      <Component {...pageProps} />
      <EditToggle isInEditMode={true} />
    </>
  );
}

export default MyApp;

const EditToggle = (isInEditMode) => {
  return (
    <>
      <Link href={`/api/preview`}>
        <a className="editLink">
          {isInEditMode ? "Exit edit mode" : "Enter edit mode"}
        </a>
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
};
