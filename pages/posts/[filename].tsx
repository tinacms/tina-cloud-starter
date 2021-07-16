import { Post } from "../../components/post";
import type { PostsDocument } from "../../.tina/__generated__/types";
import { createLocalClient, AsyncReturnType } from "../../utils";

// Use the props returned by get static props
export default function BlogPostPage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  return <Post data={props.data.getPostsDocument} />;
}

export const query = `
  query BlogPostQuery($relativePath: String!) {
    getPostsDocument(relativePath: $relativePath) {
      data {
        title
        date
        author {
          ... on AuthorsDocument {
            data {
              name
              avatar
            }
          }
        }
        _body
      }
    }
  }
`;

const client = createLocalClient();

export const getStaticProps = async ({ params }) => {
  const variables = { relativePath: `${params.filename}.md` };
  return {
    props: {
      data: await client.request<{ getPostsDocument: PostsDocument }>(query, {
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
    getPostsList: any;
  }>(
    (gql) => gql`
      {
        getPostsList {
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
    paths: postsListData.getPostsList.edges.map((post) => ({
      params: { filename: post.node.sys.filename },
    })),
    fallback: false,
  };
};
