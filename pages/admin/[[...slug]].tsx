import React from "react";
import type * as Tina from "../../.tina/types";
import { TinaCMS } from "tinacms";
import { TinaCloudAuthWall, useForm } from "tina-graphql-gateway";
import { createCloudClient, variablesFromPath } from "../../utils";
import { request, DEFAULT_VARIABLES } from "../[[...slug]]";
import { DocumentRenderer } from "../../components/document-renderer";

const client = createCloudClient();

export default function AdminPage() {
  const cms = new TinaCMS({
    apis: {
      tina: client,
    },
    sidebar: true,
    enabled: true,
  });

  return (
    <TinaCloudAuthWall cms={cms}>
      <Editor prefix="/admin" client={client} />
    </TinaCloudAuthWall>
  );
}

export const Editor = ({
  prefix,
  client,
}: {
  /** The portion of your URL which does not reflect the non-admin route */
  prefix: string;
  client;
}) => {
  let slug = window.location.pathname.replace(prefix, "").slice(1);

  const [data, setData] = React.useState({});

  React.useEffect(() => {
    const run = async () => {
      const response = await request(
        client,
        variablesFromPath(slug, DEFAULT_VARIABLES)
      );

      setData(response);
    };

    run();
  }, [slug]);

  const payload = useForm<{
    getDocument: Tina.SectionDocumentUnion;
  }>({
    payload: data,
    onNewDocument: (args) => {
      const redirect = `${window.location.origin}${prefix}/${
        args.section.slug
      }/${args.breadcrumbs.join("/")}`;

      window.location.assign(redirect);
    },
  });

  return payload.getDocument ? (
    <DocumentRenderer {...payload.getDocument} />
  ) : (
    <p>Loading...</p>
  );
};
