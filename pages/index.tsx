import { Blocks } from "../components/blocks";
import type { PagesDocument } from "../.tina/__generated__/types";
import { createLocalClient, AsyncReturnType } from "../utils";
import { footerQueryFragment } from "../components/footer";

export default function HomePage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  return <Blocks {...props.data.getPagesDocument.data} />;
}

export const query = `#graphql
  query ContentQuery {
    # "index.md" is _relative_ to the "Pages" path property in your schema definition
    # you can inspect this file at "content/pages/index.md"
    ${footerQueryFragment}
    getPagesDocument(relativePath: "index.md") {
      data {
        __typename
      	blocks {
					__typename
          ... on PagesBlocksFeatures {
            color
            items {
              icon {
                name
                color
                style
              }
              title
              text
            }
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
