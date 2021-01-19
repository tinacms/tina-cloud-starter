import type * as Tina from "../.tina/types";
import { JSONDump } from "./json-dump";

/**
 *
 * Switch on the `__typename` to render the appropriate component
 *
 * Each of these cases map to a `section` found in the `.tina/settings.yml`
 *
 */
export const DocumentRenderer = (props: Tina.SectionDocumentUnion) => {
  switch (props.__typename) {
    case "Authors_Document":
      return <AuthorRenderer {...props.data} />;
    case "Pages_Document":
      return <PageRenderer {...props.data} />;
    case "Posts_Document":
      return <PostRenderer {...props.data} />;
    default:
      return <NoData />;
  }
};
const PostRenderer = (page: Tina.Post_Data | Tina.Post_Doc_Data) => {
  return <JSONDump {...page} />;
};
const AuthorRenderer = (page: Tina.Author_Data | Tina.Author_Doc_Data) => {
  return <JSONDump {...page} />;
};
const PageRenderer = (page: Tina.Page_Doc_Data) => {
  switch (page.__typename) {
    case "Page_Doc_Data":
      return (
        <>
          {page.blocks?.map((block, index) => (
            <PageBlockRenderer key={index} {...block} />
          ))}
        </>
      );
    default:
      return <NoData />;
  }
};
/**
 *
 * Switch on the `__typename` to render the appropriate component
 *
 * Each of these cases map to a `template_type` found in the `.tina/page.yml` block field
 *
 * ```yml
 * fields:
 * ...
 * - name: blocks
 *   type: blocks
 *   label: Blocks
 *   template_types:
 *     - "post"
 *     - "author"
 * ```
 */
const PageBlockRenderer = (props: Tina.Page_Blocks_Data) => {
  switch (props.__typename) {
    case "Post_Data":
      return <PostRenderer {...props} />;
    case "Author_Data":
      return <AuthorRenderer {...props} />;
    default:
      return <NoData />;
  }
};

const NoData = () => {
  console.error("Woops, this shouldn't be rendered!");
  return <pre>No data</pre>;
};
