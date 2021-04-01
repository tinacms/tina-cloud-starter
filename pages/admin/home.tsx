import React from "react";
import { TinaCMS } from "tinacms";
import { TinaCloudAuthWall, useGraphqlForms } from "tina-graphql-gateway";

// Grab the default export from our non-admin page and wrap it with Tina
import InnerPage, { request } from "../home";
import type { HomeQueryResponseType } from "../home";
import { createClient } from "../../utils";

/**
 * Here you can see we've wrapped our "admin" page in the TinaCloudAuthWall
 * This component will setup a TinaCMS context and orchestrate authentication
 * so unauthenticated users won't be able to edit any content
 */
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

/**
 * We're rendering the same page as the "non-admin" route with two key differences:
 * 1. The data was requested client-side, after you were authenticated
 * 2. The data was "hydrated" with Tina form reactivity, meaning changes to the form
 */
export const Editor = () => {
  const [payload, isLoading] = useGraphqlForms<HomeQueryResponseType>(request);

  return isLoading ? <p>Loading...</p> : <InnerPage {...payload} />;
};
