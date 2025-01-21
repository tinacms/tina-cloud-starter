import React from "react";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import ClientPage from "./[...filename]/client-page";

export default async function Home() {
  const data = await client.queries.page({
    relativePath: `home.mdx`,
  });

  return (
    <Layout rawPageData={data}>
      <ClientPage {...data} />
    </Layout>
  );
}
