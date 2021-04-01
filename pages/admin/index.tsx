import React from "react";
import { useGraphqlForms } from "tina-graphql-gateway";
import HomePage, { request, HomeQueryResponseType } from "..";

/**
 * HEADS UP: notice how we're importing `HomePage` from another Next.js route file?
 *
 * We're doing this so we can render the same content that you'd typically expect
 * from `getStaticProps`, except we've "hydrated" your content with Tina forms
 * automatically, so you can edit everything right there on your page.
 */
export default function AdminPage() {
  const [payload, isLoading] = useGraphqlForms<HomeQueryResponseType>(request);

  return isLoading ? <p>Loading...</p> : <HomePage {...payload} />;
}
