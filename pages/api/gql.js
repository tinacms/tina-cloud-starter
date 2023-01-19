import { databaseRequest } from "../../lib/databaseConnection";
import createDB from "../../.tina/database";
const database = createDB();

export default async function handler(req, res) {
  const { query, variables } = req.body;
  const result = await databaseRequest({ query, variables, database });
  return res.json(result);
}
