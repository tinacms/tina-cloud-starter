import { useState } from "react";
import { useEffect } from "react";
import { Form, FormBuilder, useGraphqlForms } from "tinacms";
import { ScreenPlugin, useCMS, Client } from "tinacms";
import {
  AuthorsConnection,
  AuthorsConnectionEdges,
} from "../.tina/__generated__/types";

interface ScreenComponentProps {
  close(): void;
}
const MyPage: React.FC<ScreenComponentProps> = () => {
  const [authors, setAuthors] = useState<AuthorsConnectionEdges[]>([]);
  const [activeID, setActiveID] = useState<string | null>(null);
  const cms = useCMS();
  const client: Client = cms.api.tina;
  useEffect(() => {
    const fetchAuthors = async () => {
      const res = await client.request<{ getAuthorsList: AuthorsConnection }>(
        (gql) => gql`
          {
            getAuthorsList {
              edges {
                node {
                  sys {
                    relativePath
                  }
                  data {
                    name
                  }
                }
              }
            }
          }
        `,
        { variables: {} }
      );
      console.log({ res });
      setAuthors(res?.getAuthorsList?.edges || []);
    };
    fetchAuthors();
  }, []);

  return (
    <div
      style={{
        overflow: "scroll",
      }}
    >
      {!activeID &&
        authors.map((author) => {
          return (
            <div
              style={{ margin: "1rem", background: "pink", padding: ".5rem" }}
              onClick={() => {
                setActiveID(author?.node?.sys?.relativePath);
              }}
            >
              {author.node.data.name}
            </div>
          );
        })}
      {activeID && <AuthorForm id={activeID} />}
      {activeID && (
        <button
          onClick={() => {
            setActiveID(null);
          }}
        >
          👈 back
        </button>
      )}
    </div>
  );
};

const AuthorForm: React.FC<{ id: string }> = ({ id }) => {
  const [form, setForm] = useState<Form>();
  console.log({ id });
  useGraphqlForms({
    variables: {
      relativePath: id,
    },
    query: (gql) => gql`
      query GetAuthor($relativePath: String!) {
        getAuthorsDocument(relativePath: $relativePath) {
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
  return form ? <FormBuilder form={form} /> : <div>Loading</div>;
};

export const MyPagePlugin: ScreenPlugin = {
  __type: "screen",
  Component: MyPage,
  layout: "fullscreen",
  name: "View All Authors",
  Icon: () => <span>✅</span>,
};
