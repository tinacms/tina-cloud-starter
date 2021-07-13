import { Wrapper } from "../components/wrapper";
import { Container } from "../components/container";
import type { PostsConnection } from "../.tina/__generated__/types";
import { createLocalClient, AsyncReturnType } from "../utils";

export default function HomePage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const posts = props.data.getPostsList.edges;

  return (
    <Wrapper>
      <Container size="large">
        {posts.map((item) => {
          const post = item.node;
          return (
            <a
              key={post.id}
              href="/posts/"
              className="group block px-8 py-10 bg-gray-50 bg-gradient-to-br from-gray-50 to-gray-100 rounded-md shadow-sm mb-6 hover:shadow-md"
            >
              <div className="flex space-x-2 text-sm text-gray-400 group-hover:text-gray-500 mb-2">
                <time dateTime="2020-03-16">Mar 16, 2020</time>
              </div>
              <h3 className="text-3xl font-semibold title-font mb-4 transition-all duration-150 ease-out group-hover:text-blue-600">
                {post.values.title}
              </h3>
              <p className="mb-4 text-gray-700 group-hover:text-gray-800">
                Vivamus odio erat, lacinia in mauris ut, finibus blandit augue.
                Aliquam ac ante quis diam gravida luctus. Etiam sit amet mauris
                diam. Mauris ut eleifend erat. Donec aliquam, orci at tempor
                ornare, leo neque porta turpis, ac mattis neque sapien vitae
                sapien. Donec faucibus laoreet lectus ut consequat.
              </p>
              <div className="flex items-center -mb-2">
                <div className="flex-shrink-0 mr-2">
                  <img
                    className="h-10 w-10 rounded-full shadow-sm"
                    src="https://source.unsplash.com/rDEOVtE7vOs/128x128"
                    alt=""
                  />
                </div>
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-800">
                  Author Name
                </p>
              </div>
            </a>
          );
        })}
      </Container>
    </Wrapper>
  );
}

export const query = `#graphql
  query PageQuery {
    getPostsList {
      edges {
        node {
          id
          values
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
