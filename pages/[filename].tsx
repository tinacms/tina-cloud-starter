import React from "react";
import { InferGetStaticPropsType } from "next";
import { Blocks } from "../components/blocks-renderer";
import { useTina } from "tinacms/dist/react";
import { Layout } from "../components/layout";
import { client } from "../tina/__generated__/client";
import { useVisualEditing } from "@tinacms/vercel-previews";

export default function HomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data: tinaData } = useTina(props);
  const data = useVisualEditing({
    data: tinaData,
    // metadata is derived from the query and variables
    query: props.query,
    variables: props.variables,
    // When clicking on an editable element for the first time, redirect to the TinaCMS app
    redirect: "/admin",
    // Only enable visual editing on preview deploys
    enabled: true,
    // stringEncoding automatically adds metadata to strings
    stringEncoding: false,
    // Alternatively, you can skip some strings from being encoded
    // stringEncoding: {
    //   skipPaths: (path) => {
    //     if ('page.blocks.0.image' === path) {
    //       return true
    //     }

    //     return false
    //   }
    // }
  });

  return (
    <Layout rawData={data} data={data.global as any}>
      <Blocks {...data.page} />
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.contentQuery({
    relativePath: `${params.filename}.md`,
  });
  const props = {
    ...tinaProps,
    enableVisualEditing: process.env.VERCEL_ENV === "preview",
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
