import { LandingPage } from "../components/landing-page";
import { Wrapper } from "../components/helper-components";
import type { MarketingPages_Document } from "../.tina/__generated__/types";
import { LocalClient } from "tina-graphql-gateway";

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;

export default function HomePage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  return (
    <>
      <Wrapper data={props.data.getMarketingPagesDocument.data}>
        <LandingPage {...props.data.getMarketingPagesDocument.data} />
      </Wrapper>
    </>
  );
}

export const query = `#graphql
  query ContentQuery {
    # "index.md" is _relative_ to the "Marketing Pages" path property in your schema definition
    # you can inspect this file at "content/marketing-pages/index.md"
    getMarketingPagesDocument(relativePath: "index.md") {
      data {
        __typename
        ... on LandingPage_Doc_Data {
          blocks {
            __typename
            ... on Message_Data {
              messageHeader
              messageBody
            }
            ... on Image_Data {
              heading
              imgDescription
              src
            }
          }
        }
      }
    }
  }
`;

export const getStaticProps = async () => {
  const client = new LocalClient();
  return {
    props: {
      data: await client.request<{
        getMarketingPagesDocument: MarketingPages_Document;
      }>(query, {
        variables: {},
      }),
      query: query,
      variables: {},
    },
  };
};
