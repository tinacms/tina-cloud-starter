import React from "react";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import ClientPage from "./[...urlSegments]/client-page";

export const revalidate = 300;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Try locale-specific home first, fallback to generic home
  let data;
  try {
    data = await client.queries.page({
      relativePath: `${locale}/home.mdx`,
    });
  } catch (error) {
    // Fallback to non-locale specific home
    try {
      data = await client.queries.page({
        relativePath: `home.mdx`,
      });
    } catch (fallbackError) {
      throw error; // Re-throw original error
    }
  }

  return (
    <Layout rawPageData={data}>
      <ClientPage {...data} />
    </Layout>
  );
}
