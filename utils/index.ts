import {
  Client,
  DEFAULT_LOCAL_TINA_GQL_SERVER_URL,
} from "tina-graphql-gateway";

export const createCloudClient = () => {
  return new Client({
    realm: process.env.REALM_NAME,
    clientId: process.env.SITE_CLIENT_ID,
    // redirectURI: process.env.REDIRECT_URI,
    redirectURI: "http://localhost:3000/admin",
    tokenStorage: "LOCAL_STORAGE",
    // customAPI: `http://localhost:3003/github/${process.env.REALM_NAME}/${process.env.SITE_CLIENT_ID}`,
    // Still use local in dev mode
    // customAPI:
    //   process.env.NODE_ENV === "development"
    //     ? DEFAULT_LOCAL_TINA_GQL_SERVER_URL
    //     : null,
  });
};

export const createLocalClient = () => {
  return new Client({
    realm: "",
    clientId: "",
    redirectURI: "",
    customAPI: DEFAULT_LOCAL_TINA_GQL_SERVER_URL,
  });
};

export const variablesFromPath = (path: string, fallback) => {
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
