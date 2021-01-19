import React from "react";
import { TinaCMS, TinaProvider } from "tinacms";
import { createLocalClient } from "../utils";
import { Editor } from "./admin";

const client = createLocalClient();

export default function AdminPage() {
  const [isComponentMounted, setIsComponentMounted] = React.useState(false);
  React.useEffect(() => setIsComponentMounted(true), []);

  const cms = new TinaCMS({
    apis: {
      tina: client,
    },
    sidebar: true,
    enabled: true,
  });

  return (
    <TinaProvider cms={cms}>
      {/* <Editor /> should only be run client-side */}
      {isComponentMounted && <Editor client={client} />}
    </TinaProvider>
  );
}

/**
 * This is development-only route, production environments
 * will be redirected to /admin
 */
export const getServerSideProps = () => {
  if (process.env.NODE_ENV === "production") {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  } else {
    return { props: {} };
  }
};
