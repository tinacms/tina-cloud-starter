import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const TinaWrapper = dynamic(() => import("../components/tina-wrapper"));

function MyApp({ Component, pageProps }) {
  const { route } = useRouter();

  /**
   * If the route starts with /admin, we'll wrap the entire component tree
   * with Tina, meaning your non-admin routes won't contain any Tina code
   * in their bundles.
   */
  if (route.startsWith("/admin")) {
    return (
      <TinaWrapper>
        <Component {...pageProps} />
      </TinaWrapper>
    );
  }
  return <Component {...pageProps} />;
}

export default MyApp;
