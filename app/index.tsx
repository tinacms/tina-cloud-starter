import client from "../tina/__generated__/client";
import ClientPage, { ClientPageProps } from "./[...filename]/client-page";

const getData = async (filename: string): Promise<ClientPageProps> => {
  if (!filename) {
    filename = "home";
  }
  const tinaProps = await client.queries.page({
    relativePath: `${filename}.mdx`,
  });
  return { ...tinaProps };
};

export default async function HomePage({
  params,
}: {
  params: { filename: string };
}) {
  const { filename } = params;
  const tinaProps = await getData(filename);
  return <ClientPage {...tinaProps} />;
}
