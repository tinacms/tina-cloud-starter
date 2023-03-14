import "../styles.css";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const truculenta = localFont({
  src: "../public/fonts/truculenta.ttf",
  variable: "--font-truculenta",
  declarations: [{ prop: "size-adjust", value: "120%" }],
});

const montserrat = Montserrat({
  subsets: ["latin-ext"],
  variable: "--font-montserrat",
});

const App = ({ Component, pageProps }) => {
  return (
    <main
      className={`${truculenta.variable} ${montserrat.variable} font-montserrat`}
    >
      <Component {...pageProps} />
      <Analytics />
    </main>
  );
};

export default App;
