import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import flush from "styled-jsx/server";

const description =
  "A demo application that demos editing a site with Tina and Tina Cloud";
// This is necessary for styled-components to handle SSR properly
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      const styledJSXStyles = flush();
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
            {styledJSXStyles}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="description" content={description} />
          <meta property="og:title" content="Tina Cloud" />
          <meta property="og:description" content={description} />
          <meta
            property="og:image"
            content="https://tina.io/img/tina-twitter-share.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
