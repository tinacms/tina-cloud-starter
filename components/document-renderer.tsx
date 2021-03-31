import type * as Tina from "../.tina/__generated__/types";
import ShelvesRenderer from "../components/ShelvesRenderer";
import ItemsRenderer from "../components/ItemsRenderer";

/**
 *
 * Switch on the `__typename` to render the appropriate component
 *
 * Each of these cases map to a `section` found in the `.tina/settings.yml`
 *
 */

export const DocumentRenderer = ({
  section,
  document,
}: {
  section: String;
  document: Tina.SectionDocumentUnion;
}) => {
  switch (section) {
    case "shelves":
      return <ShelvesRenderer {...document.data} />;
    case "items":
      return <ItemsRenderer {...document.data} />;
    default:
      return <NoData section={section} />;
  }
};

const NoData = ({ section }: { section: String }) => {
  return (
    <pre>
      [Error] Renderer for section:"{section}" is missing. Consider adding a{" "}
      {section[0].toUpperCase() + section.slice(1)}Renderer Component to
      DocumentRenderer?
    </pre>
  );
};
