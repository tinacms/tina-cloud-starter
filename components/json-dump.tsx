import type * as Tina from "../.tina/types";

export const JSONDump = (props: Tina.Post_Doc_Data) => {
  return (
    <pre>
      <code>{JSON.stringify(props, null, 2)}</code>
    </pre>
  );
};
