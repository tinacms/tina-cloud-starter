import React from "react";
import { TinaCMS } from "tinacms";
import { TinaCloudAuthWall, useForm } from "tina-graphql-gateway";
import * as util from "../../utils";
import { DEFAULT_VARIABLES, request } from "../../utils/query";
import { DocumentRenderer } from "../../components/document-renderer";

import type * as Tina from "../../.tina/__generated__/types";

const client = util.createClient();

export default function AdminPage() {
  const cms = React.useMemo(() => {
    return new TinaCMS({
      apis: {
        tina: client,
      },
      sidebar: true,
      enabled: true,
    });
  }, []);

  return (
    <TinaCloudAuthWall cms={cms}>
      <Editor client={client} />
    </TinaCloudAuthWall>
  );
}

export const Editor = ({ client }: { client }) => {
  const prefix = "/admin";
  let slug = window.location.pathname.replace(prefix, "").slice(1);

  const variables = util.variablesFromPath(slug, DEFAULT_VARIABLES);
  const [data, setData] = React.useState<
    | {
        getDocument: Tina.SectionDocumentUnion;
      }
    | {}
  >({});

  console.log("ohhi", data);
  React.useEffect(() => {
    request(client, variables).then(setData);
  }, [slug]);

  const [payload] = useForm<{} | { getDocument: Tina.SectionDocumentUnion }>({
    payload: data,
    onNewDocument: (args) => util.redirectToNewDocument(args, prefix),
  });

  if (
    util.typesafeHasOwnProperty(data, "errors") &&
    Array.isArray(data.errors)
  ) {
    return (
      <>
        {data.errors.map((e) => (
          <div>{e.message}</div>
        ))}
      </>
    );
  }

  return util.typesafeHasOwnProperty(payload, "getDocument") ? (
    <DocumentRenderer
      section={variables.section}
      document={payload.getDocument}
    />
  ) : (
    <p>Loading...</p>
  );
};
