import React from "react";
import { TinaCMS } from "tinacms";
import { TinaCloudAuthWall } from "tina-graphql-gateway";
import { SidebarPlaceholder } from "./helper-components";
import { createClient } from "../utils";
import { unstable_useGraphQLForms } from "tina-graphql-gateway";
import { Loading } from "./loading";

/**
 * This gets loaded dynamically in "pages/_app.js"
 * if you're on a route that starts with "/admin"
 */
const TinaWrapper = (props) => {
  const cms = React.useMemo(() => {
    return new TinaCMS({
      apis: {
        tina: createClient(),
      },
      sidebar: {
        placeholder: SidebarPlaceholder,
      },
      enabled: true,
    });
  }, []);

  /** Disables the TinaCMS "Media Manager" */
  cms.plugins.all("screen").forEach((plugin) => {
    if (plugin.name === "Media Manager") {
      cms.plugins.remove(plugin);
    }
  });

  return (
    <TinaCloudAuthWall cms={cms}>
      <Inner {...props} />
    </TinaCloudAuthWall>
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
