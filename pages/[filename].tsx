import { InferGetStaticPropsType } from "next";
import { Blocks } from "../components/blocks-renderer";
import { useTina } from "tinacms/dist/react";
import { Layout } from "../components/layout";
import { dbConnection } from "../lib/databaseConnection";

export default function HomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
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
  return {
    props: JSON.parse(
      JSON.stringify({
        data: tinaProps.data,
        query: tinaProps.query,
        variables: tinaProps.variables,
      })
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
