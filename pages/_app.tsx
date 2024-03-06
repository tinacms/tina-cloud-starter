import "../styles.css";
import App, { AppProps, AppInitialProps, AppContext } from "next/app";

type BrandDataProps = { brandData: Object }

const WrappedApp = ({ Component, pageProps, brandData }: AppProps & BrandDataProps) => {
  return <Component brandData={brandData} {...pageProps} />;
};

WrappedApp.getInitialProps = async (context: AppContext): Promise<BrandDataProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context);
  const response = await fetch(`${process.env.EMPLOY_END_POINT_BASE_URL}/get_default_brand`);
  const brandData = await response.json();
  return {...ctx, brandData: brandData};
}

export default WrappedApp;
