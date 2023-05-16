import { InferGetStaticPropsType } from "next";
import { Blocks } from "../components/blocks-renderer";
import { useTina } from "tinacms/dist/react";
import { Layout } from "../components/layout";
import { dbConnection } from "../lib/databaseConnection";
import { useVisualEditing } from "@tinacms/vercel-previews";

export default function HomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data: tinaData } = useTina(props);
  const data = useVisualEditing({
    data: tinaData,
    query: props.query,
    variables: props.variables,
    redirect: "/admin",
    enabled: props.enableVisualEditing,
    // stringEncoding: true,
    stringEncoding: {
      skipPaths: (path) => {
        if ("page.blocks.0.headline" === path) {
          return false;
        }

        return true;
      },
    },
  });
  return (
    <Layout rawData={data} data={data.global as any}>
      <Blocks {...data.page} />
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await dbConnection.queries.contentQuery({
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
  const pagesListData = await dbConnection.queries.pageConnection();
  return {
    paths: pagesListData.data.pageConnection.edges.map((page) => ({
      params: { filename: page.node._sys.filename },
    })),
    fallback: false,
  };
};
