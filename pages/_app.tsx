import { useTina } from "tinacms/dist/react";
import "../styles.css";

const App = ({ Component, pageProps }) => {
  if (pageProps.query) {
    return <TinaWrapper Component={Component} pageProps={pageProps} />;
  } else {
    return <Component {...pageProps} />;
  }
};

const TinaWrapper = ({ Component, pageProps }) => {
  const { data } = useTina({
    query: pageProps.query,
    variables: pageProps.variables,
    data: pageProps.data,
  });
  return <Component {...pageProps} data={data} />;
};

export default App;
