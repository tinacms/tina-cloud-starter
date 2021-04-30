import { useRouter } from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";

const TinaWrapper = dynamic(() => import("../components/tina-wrapper"));

function MyApp({ Component, pageProps }) {
  const { route, asPath } = useRouter();

  /**
   * If the route starts with /admin, we'll wrap the entire component tree
   * with Tina, meaning your non-admin routes won't contain any Tina code
   * in their bundles.
   */
  if (route.startsWith("/admin") || pageProps.preview) {
    return (
      <TinaWrapper>
        <Component {...pageProps} />
      </TinaWrapper>
    );
  }
  return (
    <>
      <Component {...pageProps} />
      <Link href={`/admin${asPath}`}>
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
