import Page from "./[...filename]/page";

export default async function Home() {
  return Page({ params: { filename: ["home"] } });
}
