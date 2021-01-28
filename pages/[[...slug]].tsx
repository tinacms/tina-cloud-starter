import { Client } from "tina-graphql-gateway";
import { createLocalClient } from "../utils";
import { DocumentRenderer } from "../components/document-renderer";

import type * as Tina from "../.tina/types";

export const DEFAULT_VARIABLES = {
  section: "pages",
  relativePath: "home.md",
};

export default function Page(props: {
  payload: { getDocument: Tina.SectionDocumentUnion };
  variables: { section: string; relativePath: string };
}) {
  return <DocumentRenderer {...props.payload.getDocument} />;
}

/**
 * This request is used in the /admin/[[...slug]].tsx as well
 */
export const request = async (
  client: Client,
  variables: { section: string; relativePath: string }
) => {
  const content = await client.requestWithForm(
    (gql) => gql`
      query ContentQuery($section: String!, $relativePath: String!) {
        getDocument(section: $section, relativePath: $relativePath) {
          __typename
          ... on Authors_Document {
            data {
              __typename
              ... on Author_Doc_Data {
                name
                _body {
                  raw
                }
              }
            }
          }
          ... on Pages_Document {
            data {
              __typename
              ... on Page_Doc_Data {
                title
                blocks {
                  __typename
                  ... on BlockCta_Data {
                    header
                  }
                  ... on BlockHero_Data {
                    message
                  }
                }
                _body {
                  raw
                }
              }
            }
          }
          ... on Posts_Document {
            data {
              __typename
              ... on Article_Doc_Data {
                title
                description
                author {
                  data {
                    ... on Author_Doc_Data {
                      name
                    }
                  }
                }
                _body {
                  raw
                }
              }
            }
          }
        }
      }
    `,
    {
      variables,
    }
  );

  return content;
};

const client = createLocalClient();

export const getStaticProps = async ({ params }): Promise<any> => {
  let variables;
  if (params?.slug?.length > 0) {
    variables = {
      section: params.slug[0],
      relativePath: `${params.slug.slice(1).join("/")}.md`,
    };
  } else {
    variables = DEFAULT_VARIABLES;
  }

  const payload = await request(client, variables);
  return { props: { payload, variables } };
};

export const getStaticPaths = async (): Promise<any> => {
  const sectionsQuery = await client.requestWithForm(
    (gql) => gql`
      query SectionsQuery {
        getSections {
          slug
          documents {
            sys {
              breadcrumbs(excludeExtension: true)
            }
          }
        }
      }
    `,
    {
      variables: {},
    }
  );

  const paths = [
    {
      params: {
        slug: [],
      },
    },
  ];

  sectionsQuery.getSections.forEach((section) => {
    section.documents.forEach((document) => {
      paths.push({
        params: {
          slug: [section.slug, ...document.sys.breadcrumbs],
        },
      });
    });
  });

  return {
    paths,
    fallback: false,
  };
};
