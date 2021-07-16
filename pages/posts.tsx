import { Container } from "../components/container";
import { Section } from "../components/section";
import { Posts } from "../components/posts";
import type { PostsConnection } from "../.tina/__generated__/types";
import { createLocalClient, AsyncReturnType } from "../utils";
import { footerQueryFragment } from "../components/footer";

export default function HomePage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const posts = props.data.getPostsList.edges;

  return (
    <Section className="flex-1">
      <Container size="large">
        <Posts data={posts} />
      </Container>
    </Section>
  );
}

export const query = `#graphql
  query PageQuery {
    ${footerQueryFragment}
    getPostsList {
      edges {
        node {
          id
          values
          data {
            author {
							... on AuthorsDocument {
                data {                  
									name
                	avatar
                }
              }
            }
          }
          sys {
            filename
          }
        }
      }
    }
  }
`;

export const getStaticProps = async () => {
  const client = createLocalClient();
  const data = await client.request<{
    getPostsList: PostsConnection;
  }>(query, {
    variables: {},
  });

  return {
    props: {
      data: data,
      query: query,
      variables: {},
    },
  };
};
