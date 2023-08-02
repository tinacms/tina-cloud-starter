// pages/api/graphql.js
import { NextApiHandler } from "next";
import databaseClient from "../../tina/__generated__/databaseClient";

const nextApiHandler: NextApiHandler = async (req, res) => {
  const { query, variables } = req.body;
  const result = await databaseClient.request({ query, variables });
  return res.json(result);
};

export default nextApiHandler;
