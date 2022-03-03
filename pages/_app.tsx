import "../styles.css";
import { Layout } from "../components/layout";
import TinaProvider from "../.tina/components/TinaDynamicProvider";

const App = ({ Component, pageProps }) => {
  return (
    <TinaProvider>
      <Layout
        rawData={pageProps}
        data={pageProps?.data?.getGlobalDocument?.data}
      >
        <Component {...pageProps} />
      </Layout>
    </TinaProvider>
  );
};

export default App;
