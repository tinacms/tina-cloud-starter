// tina/database.ts
import { createDatabase, createLocalDatabase } from "@tinacms/datalayer";
import { GitHubProvider } from "tinacms-gitprovider-github";
import { MongodbLevel } from "mongodb-level";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

export default isLocal
  ? createLocalDatabase()
  : createDatabase({
      databaseAdapter: new MongodbLevel<string, Record<string, any>>({
        // Create a new collection for each branch (if you are using branches). If you are not using branches you can pass a static collection nam. ie: "tinacms"
        collectionName: branch,
        dbName: "tinacms",
        mongoUri: process.env.MONGODB_URI as string,
      }),
      gitProvider: new GitHubProvider({
        branch: branch,
        owner: process.env.GITHUB_OWNER,
        repo: process.env.GITHUB_REPO,
        token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
      }),
    });
