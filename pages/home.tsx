import { Wrapper } from "../components/wrapper";
import type { MarketingPages_Document } from "../.tina/__generated__/types";
import { LandingPageRenderer } from "../components/landing-page-renderer";
import { createLocalClient } from "../utils";

/**
 * This page will be built statically at build time, so the data we return here
 * won't change even after we make edits to our content
 */
export const getStaticProps = async (): Promise<{
  props: HomeQueryResponseType;
}> => {
  const client = createLocalClient();
  return {
    props: await client.request(request.query, {
      variables: request.variables,
    }),
  };
};

/**
 * The `Page` component here is used by Next.js to render your webpage, but what's
 * interesting is that we're also using this component in our "admin" equivalent
 * route. You can see that at /pages/admin/home.tsx on line 6
 */
export default function Page(props: HomeQueryResponseType) {
  return (
    <>
      <Wrapper data={props.getMarketingPagesDocument.data}>
        <LandingPageRenderer {...props.getMarketingPagesDocument.data} />
      </Wrapper>
    </>
  );
}

/**
 * This request is used in the non-admin route, too
 */
export const request = {
  variables: {
    section: "marketingPages",
    relativePath: "index.md",
  },
  query: (gql) => gql`
    query ContentQuery {
      getMarketingPagesDocument(relativePath: "home.md") {
        data {
          __typename
          ... on SimplePage_Doc_Data {
            title
            _body
          }
        }
      }
    }
  `,
};

export type HomeQueryResponseType = {
  getMarketingPagesDocument: MarketingPages_Document;
};
