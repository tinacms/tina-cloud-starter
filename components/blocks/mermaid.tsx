import dynamic from 'next/dynamic';

const MermaidElement = dynamic(() => import('../mermaid-renderer'), {
  ssr: false,
  loading: () => <div>Loading diagram...</div>,
});

export function mermaid(props) {
  if (!props?.value) return <></>;
  return <MermaidElement value={props.value} />;
}
