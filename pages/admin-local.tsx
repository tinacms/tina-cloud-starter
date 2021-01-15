import React from "react";
import type * as Tina from "../.tina/types";
import { TinaCMS, TinaProvider } from "tinacms";
import { createLocalClient, variablesFromPath } from "../utils";
import { Editor } from "./admin";

const client = createLocalClient();

export default function AdminPage() {
  const cms = new TinaCMS({
    apis: {
      tina: client,
    },
    sidebar: true,
    enabled: true,
  });

  return (
    <TinaProvider cms={cms}>
      <Editor client={client} />
    </TinaProvider>
  );
}

/**
 * This is development-only route, production environments
 * will be redirected to /admin
 */
export const getServerSideProps = () => {
  if (process.env.NODE_ENV === "production") {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  } else {
    return { props: {} };
  }
};
