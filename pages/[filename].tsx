import React from "react";
import { InferGetStaticPropsType } from "next";
import Script from "next/script";
import { Blocks } from "../components/blocks-renderer";
import { useTina } from "tinacms/dist/react";
import { Layout } from "../components/layout";
import { client } from "../tina/__generated__/client";

export default function HomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina(props);

  return (
    <Layout brandData={props.brandData} rawData={data} data={data.global as any}>
      <Blocks {...data.page} />
      {props?.scriptProps?.scripts?.webpack?.map(url => <Script key={url} src={url} strategy="beforeInteractive"/>)}
      {props?.scriptProps?.scripts?.apply ? <Script src={props?.scriptProps?.scripts?.apply} strategy="beforeInteractive"/> : null} 
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.contentQuery({
    relativePath: `${params.filename}.md`,
  });
  const apiUrl = process.env.EMPLOY_END_POINT_BASE_URL;
  const response = await fetch(`${apiUrl}/get_default_brand`);
  const brandData = await response.json();
  //const scriptProps = await fetch();
  const props = {
    ...tinaProps,
    //...scriptProps,
    enableVisualEditing: process.env.VERCEL_ENV === "preview",
    brandData: brandData,
  };
  return {
    props: JSON.parse(JSON.stringify(props)) as typeof props,
  };
};

export const getStaticPaths = async () => {
  const pagesListData = await client.queries.pageConnection();
  return {
    paths: pagesListData.data.pageConnection?.edges?.map((page) => ({
      params: { filename: page?.node?._sys.filename },
    })),
    fallback: false,
  };
};
