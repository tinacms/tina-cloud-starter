import { Blocks } from "../components/blocks";
import type { PagesDocument } from "../.tina/__generated__/types";
import { createLocalClient, AsyncReturnType } from "../utils";
import { layoutQueryFragment } from "../components/layout";

export default function HomePage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  return <Blocks {...props.data.getPagesDocument.data} />;
}

export const query = `#graphql
  query ContentQuery($relativePath: String!) {
    # "index.md" is _relative_ to the "Pages" path property in your schema definition
    # you can inspect this file at "content/pages/index.md"
    ${layoutQueryFragment}
    getPagesDocument(relativePath: $relativePath) {
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
          ... on PagesBlocksTestimonial {
            quote
            author
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

export const getStaticProps = async ({ params }) => {
  const variables = { relativePath: `${params.filename}.md` };
  return {
    props: {
      data: await client.request<{ getPagesDocument: PagesDocument }>(query, {
        variables,
      }),
      variables,
      query,
    },
  };
};

const client = createLocalClient();

export const getStaticPaths = async () => {
  const pagesListData = await client.request<{
    getPagesList: any;
  }>(
    (gql) => gql`
      {
        getPagesList {
          edges {
            node {
              sys {
                filename
              }
            }
          }
        }
      }
    `,
    { variables: {} }
  );
  return {
    paths: pagesListData.getPagesList.edges.map((page) => ({
      params: { filename: page.node.sys.filename },
    })),
    fallback: false,
  };
};
