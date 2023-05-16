import { InferGetStaticPropsType } from "next";
import { Blocks } from "../components/blocks-renderer";
import { useTina } from "tinacms/dist/react";
import { Layout } from "../components/layout";
import { dbConnection } from "../lib/databaseConnection";
import { withSourceMaps } from "@tinacms/vercel-previews";
import { useEditOpen } from "@tinacms/vercel-previews/dist/react";

export default function HomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  useEditOpen("/admin");
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
  return {
    props: withSourceMaps(
      {
        data: tinaProps.data,
        query: tinaProps.query,
        variables: tinaProps.variables,
      },
      {
        encodeStrings: false,
      }
    ),
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
