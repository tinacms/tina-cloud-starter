import React from "react";
import {
  useGraphqlForms,
  useDocumentCreatorPlugin,
} from "tina-graphql-gateway";
import BlogPostPage, {
  query,
  PostQueryResponseType,
} from "../../posts/[filename]";

/**
 * HEADS UP: notice how we're importing `HomePage` from another Next.js route file?
 *
 * We're doing this so we can render the same content that you'd typically expect
 * from `getStaticProps`, except we've "hydrated" your content with Tina forms
 * automatically, so you can edit everything right there on your page.
 */
export default function AdminPage(props) {
  const [payload, isLoading] = useGraphqlForms<PostQueryResponseType>({
    query,
    variables: { relativePath: `${props.filename}.md` },
  });
  useDocumentCreatorPlugin((res) => console.log("Created new doc", res));

  return isLoading ? <p>Loading...</p> : <BlogPostPage {...payload} />;
}

export const getServerSideProps = ({ params }) => {
  return { props: params };
};
