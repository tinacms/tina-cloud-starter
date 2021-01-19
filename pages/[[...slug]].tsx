import { Client } from "tina-graphql-gateway";
import { createLocalClient } from "../utils";
import type * as Tina from "../.tina/types";
import { JSONDump } from "../components/json-dump";

export default function Page(props: {
  payload: { getDocument: Tina.Posts_Document };
  variables: { section: string; relativePath: string };
}) {
  return <Content {...props.payload.getDocument.data} />;
}

export const Content = (props: Tina.Post_Doc_Data) => {
  return <JSONDump {...props} />;
};

const client = createLocalClient();

export const request = async (
  client: Client,
  variables: { section: string; relativePath: string }
) => {
  const content = await client.requestWithForm(
    (gql) => gql`
      query ContentQuery($section: String!, $relativePath: String!) {
        getDocument(section: $section, relativePath: $relativePath) {
          ... on Posts_Document {
            id
            data {
              ... on Post_Doc_Data {
                title
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

export const getStaticProps = async ({ params }): Promise<any> => {
  let variables;
  if (params?.slug?.length > 0) {
    variables = {
      section: params.slug[0],
      relativePath: `${params.slug.slice(1).join("/")}.md`,
    };
  } else {
    // render something by default
    variables = {
      section: "posts",
      relativePath: "hello-world.md",
    };
  }

  const payload = await request(client, variables);
  return { props: { payload, variables } };
};

export const getStaticPaths = async (): Promise<any> => {
  const content = await client.requestWithForm(
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
  content.getSections.forEach((section) => {
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
