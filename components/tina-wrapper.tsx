import React from "react";
import { TinaCMS } from "tinacms";
import { TinaCloudAuthWall } from "tina-graphql-gateway";
import { createClient } from "../utils";

const TinaWrapper = ({ children }) => {
  const cms = React.useMemo(() => {
    return new TinaCMS({
      apis: {
        tina: createClient(),
      },
      sidebar: true,
      enabled: true,
    });
  }, []);

  return <TinaCloudAuthWall cms={cms}>{children}</TinaCloudAuthWall>;
};

export default TinaWrapper;
