import { Blocks } from "../components/blocks";
import { Wrapper } from "../components/wrapper";
import type { PagesDocument } from "../.tina/__generated__/types";
import { createLocalClient, AsyncReturnType } from "../utils";

export default function HomePage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  return <Blocks {...props.data.getPagesDocument.data} />;
}

export const query = `#graphql
  query ContentQuery {
    # "index.md" is _relative_ to the "Pages" path property in your schema definition
    # you can inspect this file at "content/pages/index.md"
    getPagesDocument(relativePath: "index.md") {
      data {
        __typename
      	blocks {
					__typename
          ... on PagesBlocksRaw {
            description
            color
          }
          ... on PagesBlocksContent {
						body
            color
          }
          ... on PagesBlocksHero {
            tagline
            headline
            text
            actions {
							label
              type
              icon
              link
            }
            color 
            image {
							src
              alt
            }
          }
        }
      }
    }
  }
`;

export const getStaticProps = async () => {
  const client = createLocalClient();
  return {
    props: {
      data: await client.request<{
        getPagesDocument: PagesDocument;
      }>(query, {
        variables: {},
      }),
      query: query,
      variables: {},
    },
  };
};
