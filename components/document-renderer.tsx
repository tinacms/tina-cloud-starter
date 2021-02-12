import type * as Tina from "../.tina/types";
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
      return <NoData />;
  }
};

const NoData = () => {
  console.error("Woops, this shouldn't be rendered!");
  return <pre>No data</pre>;
};
