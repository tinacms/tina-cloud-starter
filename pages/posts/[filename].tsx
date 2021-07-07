import { BlogPost } from "../../components/post";
import type { Posts_Document } from "../../.tina/__generated__/types";
import { Wrapper } from "../../components/helper-components";
import { AsyncReturnType } from "..";
import { LocalClient } from "tina-graphql-gateway";

// Use the props returned by get static props
export default function BlogPostPage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  return (
    <>
      <Wrapper data={props.data.getPostsDocument.data}>
        <BlogPost {...props.data.getPostsDocument.data} />
      </Wrapper>
    </>
  );
}

export const query = `#graphql
  query BlogPostQuery($relativePath: String!) {
    getPostsDocument(relativePath: $relativePath) {
      data {
        __typename
        ... on Article_Doc_Data {
          title
          author {
            data {
              ... on Author_Doc_Data {
                name
                avatar
              }
            }
          }
          _body
        }
      }
    }
  }
`;

const client = new LocalClient();

export const getStaticProps = async ({ params }) => {
  const variables = { relativePath: `${params.filename}.md` };
  return {
    props: {
      data: await client.request<{ getPostsDocument: Posts_Document }>(query, {
        variables,
      }),
      variables,
      query,
    },
  };
};

/**
 * To build the blog post pages we just iterate through the list of
 * posts and provide their "filename" as part of the URL path
 *
 * So a blog post at "content/posts/hello.md" would
 * be viewable at http://localhost:3000/posts/hello
 */
export const getStaticPaths = async () => {
  const postsListData = await client.request<{
    getPostsList: Posts_Document[];
  }>(
    (gql) => gql`
      {
        getPostsList {
          sys {
            filename
          }
        }
      }
    `,
    { variables: {} }
  );
  return {
    paths: postsListData.getPostsList.map((post) => ({
      params: { filename: post.sys.filename },
    })),
    fallback: false,
  };
};
