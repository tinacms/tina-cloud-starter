import dynamic from "next/dynamic";

import { EditProvider, useEditState } from "tina-graphql-gateway";

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
        <EditToggle isInEditMode={true} />
      </>
    );
  }
  return (
    <>
      <Component {...pageProps} />
      <EditToggle isInEditMode={true} />
    </>
  );
}

const EditToggle = (isInEditMode) => {
  const { edit, setEdit } = useEditState();
  return (
    <>
      {(Number(process.env.NEXT_PUBLIC_SHOW_EDIT_BTN) || edit) && (
        <>
          <button
            onClick={() => {
              setEdit(!edit);
            }}
            className="editLink"
          >
            {edit ? "Exit edit mode" : "Enter edit mode"}
          </button>
          <style jsx>{`
            .editLink {
              border: none;
              position: fixed;
              top: 0;
              right: 0;
              background: var(--orange);
              color: var(--white);
              padding: 0.5rem 0.75rem;
              font-weight: bold;
              text-decoration: none;
              display: inline-block;
              border-bottom-left-radius: 0.5rem;
              cursor: pointer;
              font-size: 20px;
            }
          `}</style>
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
