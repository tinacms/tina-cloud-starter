import MermaidElement from "../mermaid-renderer";

export function mermaid(props) {
  if (!props?.value) return <></>;
  return <MermaidElement value={props.value} />;
}
