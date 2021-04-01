import { Wrapper } from "../../components/wrapper";
import { BlogPost } from "../../components/blog-post";
import type { Posts_Document } from "../../.tina/__generated__/types";
import { createLocalClient } from "../../utils";

/**
 * The `Page` component here is used by Next.js to render your webpage, but what's
 * interesting is that we're also using this component in our "admin" equivalent
 * route. You can see that at we're importing this component for use at
 * "pages/admin/index.tsx"
 */
export default function BlogPostPage(props: PostQueryResponseType) {
  return (
    <>
      <Wrapper data={props.getPostsDocument.data}>
        <BlogPost {...props.getPostsDocument.data} />
      </Wrapper>
    </>
  );
}

/**
 * This request is used in the non-admin route, too
 */
export const query = (gql) => gql`
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

export type PostQueryResponseType = {
  getPostsDocument: Posts_Document;
};

const client = createLocalClient();
/**
 * This page will be built statically at build time, so the data we return here
 * won't change even after we make edits to our content
 */
export const getStaticProps = async ({ params }) => {
  return {
    props: await client.request(query, {
      variables: { relativePath: `${params.filename}.md` },
    }),
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
