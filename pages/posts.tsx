import { Container } from "../components/util/container";
import { Section } from "../components/util/section";
import { Posts } from "../components/posts";
import { client } from "../tina/__generated__/client";
import { Layout } from "../components/layout";
import { expandWithMetadata } from '@tinacms/preview-helpers'
import { useEditOpen } from '@tinacms/preview-helpers/dist/react'
import { useTina } from "tinacms/dist/react";

export default function HomePage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const { data } = useTina(props)
  const posts = data.postConnection.edges;
  useEditOpen('/admin')

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
  let tinaProps = await client.queries.pageQuery();
  if (process.env.VERCEL_ENV === 'preview') {
    tinaProps = await expandWithMetadata(tinaProps, client)
  }
  return {
    props: {
      ...tinaProps,
    },
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
