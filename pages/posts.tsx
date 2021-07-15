import { Wrapper } from "../components/wrapper";
import Markdown from "react-markdown";
import { Container } from "../components/container";
import { Section } from "../components/section";
import type { PostsConnection } from "../.tina/__generated__/types";
import { createLocalClient, AsyncReturnType } from "../utils";

export default function HomePage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const posts = props.data.getPostsList.edges;

  return (
    <Section className="flex-1">
      <Container size="large">
        {posts.map((item) => {
          const post = item.node;
          return (
            <a
              key={post.id}
              href={`/posts/` + post.sys.filename}
              className="group block px-8 py-10 mb-8 bg-gray-50 bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-gray-700 dark:from-gray-800 dark:to-gray-700 rounded-md shadow-sm transition-all duration-150 ease-out hover:shadow-md hover:to-gray-50 dark:hover:to-gray-600"
            >
              <h3 className="text-gray-900 dark:text-white text-3xl font-semibold title-font mb-5 transition-all duration-150 ease-out group-hover:text-blue-600 dark:group-hover:text-blue-300">
                {post.values.title}
              </h3>
              <div className="prose dark:prose-dark prose-lg w-full max-w-none mb-5">
                <Markdown>{post.values.excerpt}</Markdown>
              </div>
              <div className="flex items-center -mb-2">
                <div className="flex-shrink-0 mr-2">
                  <img
                    className="h-10 w-10 rounded-full shadow-sm"
                    src={post.data.author.data.avatar}
                    alt={post.data.author.data.name}
                  />
                </div>
                <p className="text-sm font-medium text-gray-600 group-hover:text-gray-800 dark:text-gray-200 dark:group-hover:text-white">
                  {post.data.author.data.name}
                </p>
                <span className="font-bold text-gray-200 dark:text-gray-500 mx-2">
                  —
                </span>
                <p className="text-sm text-gray-400 group-hover:text-gray-500 dark:text-gray-300 dark:group-hover:text-gray-150">
                  {post.values.date}
                </p>
              </div>
            </a>
          );
        })}
      </Container>
    </Section>
  );
}

export const query = `#graphql
  query PageQuery {
    getPostsList {
      edges {
        node {
          id
          values
          data {
            author {
							... on AuthorsDocument {
                data {                  
									name
                	avatar
                }
              }
            }
          }
          sys {
            filename
          }
        }
      }
    }
  }
`;

export const getStaticProps = async () => {
  const client = createLocalClient();
  const data = await client.request<{
    getPostsList: PostsConnection;
  }>(query, {
    variables: {},
  });

  return {
    props: {
      data: data,
      query: query,
      variables: {},
    },
  };
};
