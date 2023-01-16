import database, { apiDB } from "../.tina/database";
import { resolve } from "@tinacms/graphql";

export async function databaseRequest({ query, variables }) {
  const config = {
    useRelativeMedia: true,
  };

  const result = await resolve({
    config,
    database: apiDB,
    query,
    variables,
    verbose: true,
  });

  return result;
}
