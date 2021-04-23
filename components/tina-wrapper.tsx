import React from "react";
import { TinaCMS } from "tinacms";
import { TinaCloudAuthWall } from "tina-graphql-gateway";
import { SidebarPlaceholder } from "./helper-components";
import { createClient } from "../utils";

/**
 * This gets loaded dynamically in "pages/_app.js"
 * if you're on a route that starts with "/admin"
 */
const TinaWrapper = ({ children }) => {
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

  return <TinaCloudAuthWall cms={cms}>{children}</TinaCloudAuthWall>;
};

export default TinaWrapper;
