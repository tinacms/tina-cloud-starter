import "../styles.css";
import localFont from "next/font/local";

const truculenta = localFont({
  src: "../public/fonts/truculenta.ttf",
  declarations: [{ prop: "size-adjust", value: "120%" }],
});

const App = ({ Component, pageProps }) => {
  return (
    <main className={`${truculenta.className} font-truculenta`}>
      <Component {...pageProps} />
    </main>
  );
};

export default App;
