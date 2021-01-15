import {
  Client,
  DEFAULT_LOCAL_TINA_GQL_SERVER_URL,
} from "tina-graphql-gateway";

export const createCloudClient = () => {
  return new Client({
    realm: process.env.NEXT_PUBLIC_REALM_NAME,
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    redirectURI: process.env.NEXT_PUBLIC_REDIRECT_URI,
    branch: "main",
    tokenStorage: "LOCAL_STORAGE",
  });
};

export const createLocalClient = () => {
  return new Client({
    realm: "",
    branch: "",
    clientId: "",
    redirectURI: "",
    customAPI: DEFAULT_LOCAL_TINA_GQL_SERVER_URL,
  });
};

/**
 *
 * Takes a path (ex. /posts/my-page) and uses the first item
 * as the section and the remaining peices for the relativePath
 * arguments
 *
 */
export const variablesFromPath = (
  path: string,
  fallback: { relativePath: string; section: string }
) => {
  const arr = path.split("/");
  const section = arr[0];
  // FIXME: assumes `.md` as extension, should work with other extensions
  const relativePath = `${arr.slice(1).join("/")}.md`;

  if (section && relativePath) {
    return { section, relativePath };
  } else {
    return fallback;
  }
};
