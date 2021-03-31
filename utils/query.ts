import { Client } from "tina-graphql-gateway";

export const DEFAULT_VARIABLES = {
  section: "shelves",
  relativePath: "tv.md",
  slug: ["/"],
};

export const request = async (
  client: Client,
  variables: { section: string; relativePath: string }
) => {
  const content = await client.requestWithForm(
    (gql) => gql`
      query ContentQuery($section: String!, $relativePath: String!) {
        getDocument(section: $section, relativePath: $relativePath) {
          # __typename is an auto-generated field which can be used to determine which
          # component gets rendered. Check out the switch statement in /components/document-renderer.tsx
          __typename
          ... on Shelves_Document {
            data {
              __typename
              ... on Shelf_Doc_Data {
                name
                description {
                  raw
                }
                location
              }
            }
          }
          ... on Items_Document {
            data {
              __typename
              ... on Item_Doc_Data {
                name
                description {
                  raw
                }
                shelf {
                  id
                  data {
                    __typename
                    ... on Shelf_Doc_Data {
                      name
                    }
                  }
                }
                level
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
