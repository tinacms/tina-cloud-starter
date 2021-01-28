import React from "react";
import { TinaCMS } from "tinacms";
import { TinaCloudAuthWall, useForm } from "tina-graphql-gateway";
import * as util from "../../utils";
import { request, DEFAULT_VARIABLES } from "../[[...slug]]";
import { DocumentRenderer } from "../../components/document-renderer";

import type * as Tina from "../../.tina/types";

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

  const [data, setData] = React.useState({});

  React.useEffect(() => {
    request(client, util.variablesFromPath(slug, DEFAULT_VARIABLES)).then(
      setData
    );
  }, [slug]);

  const payload = useForm<{
    getDocument: Tina.SectionDocumentUnion;
  }>({
    payload: data,
    onNewDocument: (args) => util.redirectToNewDocument(args, prefix),
  });

  if (
    util.typesafeHasOwnProperty(data, "errors") &&
    Array.isArray(data.errors)
  ) {
    data;
    return (
      <>
        {data.errors.map((e) => (
          <div>{e.message}</div>
        ))}
      </>
    );
  }

  return payload.getDocument ? (
    <DocumentRenderer {...payload.getDocument} />
  ) : (
    <p>Loading...</p>
  );
};
