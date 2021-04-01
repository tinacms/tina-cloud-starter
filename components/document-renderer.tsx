import type * as Tina from "../.tina/__generated__/types";
import { PageRenderer } from "./page-renderer";

/**
 *
 * Switch on the `__typename` to render the appropriate component
 *
 * Each of these cases map to a `section` found in the `.tina/settings.yml`
 *
 */

export const DocumentRenderer = (props: Tina.SectionDocumentUnion) => {
  switch (props.__typename) {
    case "Pages_Document":
      return <PageRenderer {...props.data} />;
    default:
      return <NoRenderer typename={props.__typename} />;
  }
};

const NoRenderer = ({ typename }: { typename: String }) => {
  return (
    <pre>
      [Error] Renderer for "{typename}" not found. Consider adding a Renderer
      Component to DocumentRenderer?
    </pre>
  );
};
