import dynamic from "next/dynamic";
import "../styles.css";
import { EditProvider, setEditing, useEditState } from "../utils/editState";

// InnerApp that handles rendering edit mode or not
function InnerApp({ Component, pageProps }) {
  const { edit } = useEditState();
  if (edit) {
    // Dynamically load Tina only when in edit mode so it does not affect production
    // see https://nextjs.org/docs/advanced-features/dynamic-import#basic-usage
    const TinaWrapper = dynamic(() => import("../components/tina-wrapper"));
    return (
      <>
        <TinaWrapper {...pageProps}>
          {(props) => <Component {...props} />}
        </TinaWrapper>
        <EditToggle />
      </>
    );
  }
  return (
    <>
      <Component {...pageProps} />
      <EditToggle />
    </>
  );
}

const EditToggle = () => {
  const { edit, setEdit } = useEditState();
  return (
    <>
      {(Number(process.env.NEXT_PUBLIC_SHOW_EDIT_BTN) || edit) && (
        <>
          <button
            onClick={() => {
              setEdit(!edit);
            }}
            className=""
          >
            {edit ? "Exit edit mode" : "Enter edit mode"}
          </button>
        </>
      )}
    </>
  );
};

// Our app is wrapped with edit provider
function App(props) {
  return (
    <EditProvider>
      <InnerApp {...props} />
    </EditProvider>
  );
}

export default App;
