import { useState } from "react";
import { useEffect } from "react";
import { Form, FormBuilder, useGraphqlForms } from "tinacms";
import { ScreenPlugin, useCMS, Client } from "tinacms";
import { Collection } from "../.tina/__generated__/types";
interface ScreenComponentProps {
  close(): void;
}
const MyPage: React.FC<ScreenComponentProps> = () => {
  const [state, setState] = useState([] as Collection[]);
  const [home, setHome] = useState(true);
  const [index, setIndex] = useState(0);
  const [form, setForm] = useState<Form>();
  const cms = useCMS();
  const client: Client = cms.api.tina;
  useGraphqlForms({
    variables: {},
    query: (gql) => gql`
      {
        getAuthorsDocument(relativePath: "pedro.md") {
          id
          data {
            name
            avatar
          }
        }
      }
    `,
    formify: (args, cms) => {
      const form = new Form(args.formConfig);
      setForm(form);
      return args.skip();
    },
  });
  useEffect(() => {
    const loadCollections = async () => {
      const data = await client.request<{ getCollections: Collection[] }>(
        `#graphql
      query MyQuery {
        getCollections {
    name
    label
    documents {
      edges {
        node {
          __typename ... on Document {
            id
          }
        }
      }
    }
  }
      }`,
        { variables: {} }
      );
      setState(data.getCollections);
    };
    loadCollections();
  }, []);
  return (
    <div
      style={{
        overflow: "scroll",
      }}
    >
      {home &&
        state.map((collection, i) => {
          return (
            <div
              style={{ margin: "1rem", background: "pink", padding: ".5rem" }}
              onClick={() => {
                setIndex(i);
                setHome(false);
              }}
            >
              {collection.label}
            </div>
          );
        })}
      {!home && (
        <button
          onClick={() => {
            setHome(true);
          }}
        >
          👈 back
        </button>
      )}
      {!home && (
        <pre>
          <code>{JSON.stringify(state[index].documents.edges, null, 2)}</code>
        </pre>
      )}
      {/* {form && <FormBuilder form={form} />} */}
      {/* <pre>
        <code>{JSON.stringify(state, null, 2)}</code>
      </pre> */}
    </div>
  );
};

export const MyPagePlugin: ScreenPlugin = {
  __type: "screen",
  Component: MyPage,
  layout: "fullscreen",
  name: "Content viewer",
  Icon: () => <span>✅</span>,
};
