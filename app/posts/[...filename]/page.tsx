import React from "react";
import client from "../../../tina/__generated__/client";
import Layout from "../../../components/layout/layout";
import PostClientPage from "./client-page";

export default async function PostPage({
  params,
}: {
  params: { filename: string[] };
}) {
  const { data } = await client.queries.post({
    relativePath: `${params.filename.join("/")}.mdx`,
  });

  return (
    <Layout rawPageData={data}>
      <PostClientPage {...data.post} />
    </Layout>
  );
}

export async function generateStaticParams() {
  const posts = await client.queries.postConnection();
  return posts.data?.postConnection.edges.map((edge) => {
    return {
      params: {
        filename: edge.node._sys.filename.split("/"),
      },
    };
  });
}
