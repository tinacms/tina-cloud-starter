import { TinaCloudProvider } from "tina-graphql-gateway";
import React from "react";
import { unstable_useGraphQLForms } from "tina-graphql-gateway";
import { Loading } from "./loading";
import { TinaCloudCloudinaryMediaStore } from "next-tinacms-cloudinary";

/**
 * This gets loaded dynamically in "pages/_app.js"
 * if you're on a route that starts with "/admin"
 */
const TinaWrapper = (props) => {
  return (
    <TinaCloudProvider
      clientId={process.env.NEXT_PUBLIC_TINA_CLIENT_ID}
      branch="main"
      isLocalClient={Boolean(Number(process.env.NEXT_PUBLIC_USE_LOCAL_CLIENT))}
      organization={process.env.NEXT_PUBLIC_ORGANIZATION_NAME}
      mediaStore={TinaCloudCloudinaryMediaStore}
    >
      <Inner {...props} />
    </TinaCloudProvider>
  );
};

const Inner = (props) => {
  const [payload, isLoading] = unstable_useGraphQLForms({
    query: (gql) => gql(props.query),
    variables: props.variables || {},
  });
  return (
    <>
      {isLoading ? (
        <Loading>{props.children(props)}</Loading>
      ) : (
        // pass the new edit state data to the child
        props.children({ ...props, data: payload })
      )}
    </>
  );
};

export default TinaWrapper;
