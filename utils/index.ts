import { Client, LocalClient } from "tina-graphql-gateway";

export const createClient = () => {
  return process.env.NEXT_PUBLIC_USE_LOCAL_CLIENT === "1"
    ? createLocalClient()
    : createCloudClient();
};

export const createCloudClient = () => {
  return new Client({
    realm: process.env.NEXT_PUBLIC_REALM_NAME,
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    branch: "main",
    tokenStorage: "LOCAL_STORAGE",
  });
};

export const createLocalClient = () => {
  return new LocalClient();
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

// FIXME: infer args from useForm
export const redirectToNewDocument = (
  args: {
    section: {
      slug: string;
    };
    relativePath: string;
    breadcrumbs: string[];
    path: string;
  },
  prefix: string
) => {
  const redirect = `${window.location.origin}${prefix}/${
    args.section.slug
  }/${args.breadcrumbs.join("/")}`;

  window.location.assign(redirect);
};

export const typesafeHasOwnProperty = <X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> => {
  return obj.hasOwnProperty(prop);
};
