import { Container } from "../components/util/container";
import { Section } from "../components/util/section";
import { Posts } from "../components/posts";
import { dbConnection } from "../lib/databaseConnection";
import { Layout } from "../components/layout";
import { InferGetStaticPropsType } from "next";

export default function HomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const posts = props.data.postConnection.edges;

  return (
    <Layout>
      <Section className="flex-1">
        <Container size="large" width="small">
          <Posts data={posts} />
        </Container>
      </Section>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const tinaProps = await dbConnection.queries.pageQuery();
  return {
    props: {
      ...tinaProps,
    },
  };
};

export type PostsType = InferGetStaticPropsType<
  typeof getStaticProps
>["data"]["postConnection"]["edges"][number];
