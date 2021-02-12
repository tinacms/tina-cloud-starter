import { Client } from "tina-graphql-gateway";
import { createLocalClient } from "../utils";
import { DocumentRenderer } from "../components/document-renderer";

import type * as Tina from "../.tina/types";

import Link from "next/link";

export const DEFAULT_VARIABLES = {
  section: "pages",
  relativePath: "home.md",
  slug: ["/"],
};

export default function Page(props: {
  payload: { getDocument: Tina.SectionDocumentUnion };
  variables: { section: string; relativePath: string; slug: string[] };
}) {
  let editLink = `/admin/${props.variables.slug.join("/")}`;
  return (
    <>
      <DocumentRenderer {...props.payload.getDocument} />
      <Link href={editLink}>
        <a className="editLink">Edit Site</a>
      </Link>
      <style jsx>{`
        .editLink {
          position: fixed;
          top: 0;
          right: 0;
          background: var(--orange);
          color: var(--white);
          padding: 0.5rem 0.75rem;
          font-weight: bold;
          text-decoration: none;
          display: inline-block;
          border-bottom-left-radius: 0.5rem;
          cursor: pointer;
        }
      `}</style>
    </>
  );
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
          # __typename is an auto-generated field which can be used to determine which
          # component gets rendered. Check out the switch statement in /components/document-renderer.tsx
          __typename

          # Pages_Document comes from the .tina/settings.yml section with the label: Pages
          ... on Pages_Document {
            data {
              __typename
              # Page_Doc_Data is from the "page" template. It's fields are defined in .tina/front_matter/templates/page.yml
              ... on Page_Doc_Data {
                title
                blocks {
                  __typename
                  ... on BlockCta_Data {
                    text
                  }
                  ... on BlockHero_Data {
                    heading
                    message
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
      slug: params.slug,
    };
  } else {
    variables = DEFAULT_VARIABLES;
  }

  const payload = await request(client, variables);
  return { props: { payload, variables } };
};

/**
 * getStaticPaths is the function which determines which pages will be built
 *
 * We run this query which lists all the documents as an array. The result will look something like this:
 *
 * ```json
 *  {
 *    "data": {
 *      "getSections": [
 *        {
 *          "slug": "pages",
 *          "documents": [
 *            {
 *              "sys": {
 *                "breadcrumbs": [
 *                  "home"
 *                ]
 *              }
 *            }
 *          ]
 *        },
 *      ]
 *    }
 *  }
 *
 * ```
 *
 * In this example we would build a page at `/pages/home`
 *
 */
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
