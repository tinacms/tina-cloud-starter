import ReactMarkdown from "react-markdown";
import type {
  Authors_Document,
  Article_Doc_Data,
} from "../.tina/__generated__/types";

export const BlogPost = (props: Article_Doc_Data) => {
  return (
    <>
      <h1>{props.title}</h1>
      <AuthorSnippet author={props.author} />
      <ReactMarkdown>{props._body}</ReactMarkdown>
    </>
  );
};

const AuthorSnippet = (props: { author: Authors_Document }) => {
  return (
    <div>
      {props.author && (
        <>
          <img title={props.author.data.name} src={props.author.data.avatar} />
          <h3>By {props.author.data.name}</h3>
        </>
      )}
    </div>
  );
};
