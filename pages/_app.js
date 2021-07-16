import dynamic from "next/dynamic";
import "../styles.css";
import { Layout } from "../components/layout";
import { EditProvider, setEditing, useEditState } from "../utils/editState";

// InnerApp that handles rendering edit mode or not
function InnerApp({ Component, pageProps }) {
  const { edit } = useEditState();
  if (edit) {
    // Dynamically load Tina only when in edit mode so it does not affect production
    // see https://nextjs.org/docs/advanced-features/dynamic-import#basic-usage
    const TinaWrapper = dynamic(() => import("../components/tina-wrapper"));
    const layoutData = pageProps.data?.getGlobalDocument?.data;

    return (
      <>
        <TinaWrapper {...pageProps}>
          {(props) => (
            <Layout rawData={pageProps} data={layoutData}>
              <Component {...props} />
            </Layout>
          )}
        </TinaWrapper>
      </>
    );
  }
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

// Our app is wrapped with edit provider
function App(props) {
  return (
    <EditProvider>
      <InnerApp {...props} />
    </EditProvider>
  );
}

export default App;
