import React from "react";
import { TinaCMS } from "tinacms";
import { TinaCloudAuthWall, useForm } from "tina-graphql-gateway";
import { query, DEFAULT_VARIABLES } from "../[[...slug]]";
import { createClient, variablesFromPath } from "../../utils";
import { DocumentRenderer } from "../../components/document-renderer";

import type { QueryResponseType } from "../[[...slug]]";

export default function AdminPage() {
  const cms = React.useMemo(() => {
    return new TinaCMS({
      apis: {
        tina: createClient(),
      },
      sidebar: true,
      enabled: true,
    });
  }, []);

  return (
    <TinaCloudAuthWall cms={cms}>
      <Editor />
    </TinaCloudAuthWall>
  );
}

export const Editor = () => {
  let slug = window.location.pathname.replace("/admin", "").slice(1);

  const [payload, isLoading] = useForm<QueryResponseType>({
    query,
    variables: variablesFromPath(slug, DEFAULT_VARIABLES),
  });

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <DocumentRenderer {...payload.getDocument} />
  );
};
