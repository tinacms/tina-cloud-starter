import { client } from "../.tina/__generated__/client";
import { PostFilter } from "../.tina/__generated__/types";

export const getPosts = async ({ preview }: { preview: boolean }) => {
  // by default get non-draft posts
  let filter: PostFilter = { draft: { eq: false } };

  // if preview mode is enabled, get all posts
  if (preview) {
    filter = {};
  }

  return client.queries.pageQuery({ filter });
};
