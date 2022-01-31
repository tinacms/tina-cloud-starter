import "../styles.css";
import dynamic from "next/dynamic";
import { TinaEditProvider } from "tinacms/dist/edit-state";
import { Layout } from "../components/layout";
// @ts-ignore FIXME: default export needs to be 'ComponentType<{}>
const TinaCMS = dynamic(() => import("tinacms"), { ssr: false });
import { useTina } from "tinacms/dist/edit-state";

// Register forms at the root, and send the liveData down to pages
// in edit-mode
const QueryContainer = (props: { query; variables; data; children }) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  return props.children({ data });
};

const branch = "main";
const apiURL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:4001/graphql"
    : `https://content.tinajs.io/content/${process.env.NEXT_PUBLIC_TINA_CLIENT_ID}/github/${branch}`;

const App = ({ Component, pageProps }) => {
  return (
    <>
      <TinaEditProvider
        showEditButton={true}
        editMode={
          <TinaCMS
            apiURL={apiURL}
            mediaStore={async () => {
              const pack = await import("next-tinacms-cloudinary");
              return pack.TinaCloudCloudinaryMediaStore;
            }}
            cmsCallback={(cms) => {
              /**
               * Enables experimental branch switcher
               */
              cms.flags.set("branch-switcher", true);

              /**
               * Enables `tina-admin` specific features in the Tina Sidebar
               */
              cms.flags.set("tina-admin", false);
              /**
               * Enables experimental rich-text editor
               */
              cms.flags.set("rich-text-alt", true);

              return cms;
            }}
            documentCreatorCallback={{
              /**
               * After a new document is created, redirect to its location
               */
              onNewDocument: ({ collection: { slug }, breadcrumbs }) => {
                const relativeUrl = `/${slug}/${breadcrumbs.join("/")}`;
                return (window.location.href = relativeUrl);
              },
              /**
               * Only allows documents to be created to the `Blog Posts` Collection
               */
              filterCollections: (options) => {
                return options.filter(
                  (option) => option.label === "Blog Posts"
                );
              },
            }}
            formifyCallback={({ formConfig, createForm, createGlobalForm }) => {
              if (formConfig.id === "getGlobalDocument") {
                return createGlobalForm(formConfig);
              }

              return createForm(formConfig);
            }}
          >
            <QueryContainer {...pageProps} key={pageProps.query}>
              {(livePageProps) => (
                <>
                  <Layout
                    rawData={livePageProps}
                    data={livePageProps.data?.getGlobalDocument?.data}
                  >
                    <Component {...livePageProps} />
                  </Layout>
                </>
              )}
            </QueryContainer>
          </TinaCMS>
        }
      >
        <Layout
          rawData={pageProps}
          data={pageProps.data?.getGlobalDocument?.data}
        >
          <Component {...pageProps} />
        </Layout>
      </TinaEditProvider>
    </>
  );
};

export default App;
