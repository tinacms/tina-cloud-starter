import React from "react";
import { TinaCMS } from "tinacms";
import { TinaCloudAuthWall } from "tina-graphql-gateway";
import { SidebarPlaceholder } from "./helper-components";
import { createClient } from "../utils";
import { useGraphqlForms } from "tina-graphql-gateway";

/**
 * This gets loaded dynamically in "pages/_app.js"
 * if you're on a route that starts with "/admin"
 */
const TinaWrapper = ({ query, variables, children }) => {
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

  return (
    <TinaCloudAuthWall cms={cms}>
      <Inner query={query} variables={variables}>
        {children}
      </Inner>
    </TinaCloudAuthWall>
  );
};

const Inner = (props) => {
  const [payload, isLoading] = useGraphqlForms({
    query: (gql) => gql(props.query),
    variables: props.variables || {},
  });
  return (
    <>{isLoading ? <div>loading...</div> : props.children({ data: payload })}</>
  );
};

export default TinaWrapper;
