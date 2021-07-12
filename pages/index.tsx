import { Page } from "../components/page";
import { Wrapper } from "../components/helper-components";
import type { Pages_Document } from "../.tina/__generated__/types";
import { createLocalClient, AsyncReturnType } from "../utils";

export default function HomePage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  return (
    <>
      <Wrapper data={props.data.getPagesDocument.data}>
        <Page {...props.data.getPagesDocument.data} />
      </Wrapper>
    </>
  );
}

export const query = `#graphql
  query ContentQuery {
    # "index.md" is _relative_ to the "Pages" path property in your schema definition
    # you can inspect this file at "content/pages/index.md"
    getPagesDocument(relativePath: "index.md") {
      data {
        __typename
        ... on Page_Doc_Data {
          blocks {
            __typename
            ... on Content_Data {
              body
            }
            ... on Image_Data {
              heading
              imgDescription
              src
            }
            ... on Raw_Data {
              description
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
        getPagesDocument: Pages_Document;
      }>(query, {
        variables: {},
      }),
      query: query,
      variables: {},
    },
  };
};
