import "../styles.css";

const App = ({ Component, pageProps }) => {
  return (
    <>
      {pageProps.preview && (
        <div>
          You are in preview mode
          <a
            href={`/api/preview/exit?slug=${
              (typeof location !== "undefined" && location?.pathname) || "/"
            }`}
          >
            Click here
          </a>{" "}
          to exit
        </div>
      )}
      <Component {...pageProps} />;
    </>
  );
};

export default App;
