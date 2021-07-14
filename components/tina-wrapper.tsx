/**
Copyright 2021 Forestry.io Holdings, Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { TinaCloudProvider } from "tina-graphql-gateway";
import React from "react";
import { useGraphqlForms } from "tina-graphql-gateway";
import { LoadingPage } from "./Spinner";

/**
 * This gets loaded dynamically in "pages/_app.js"
 * if you're on a route that starts with "/admin"
 */
const TinaWrapper = (props) => {

  // TODO: handle when localStorage is missing
  const clientID = localStorage.getItem('tinaClientID') ? localStorage.getItem('tinaClientID') : process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
  const organization = localStorage.getItem('tinaOrganization') ? localStorage.getItem('tinaOrganization') : process.env.NEXT_PUBLIC_ORGANIZATION_NAME;
  
  return (
    <TinaCloudProvider
      clientId={clientID}
      branch="main"
      isLocalClient={Boolean(Number(process.env.NEXT_PUBLIC_USE_LOCAL_CLIENT))}
      organization={organization}
    >
      {props.query ? <Inner {...props} /> : props.children(props)}
    </TinaCloudProvider>
  );
};

const Inner = (props) => {
  const [payload, isLoading] = useGraphqlForms({
    query: (gql) => gql(props.query),
    variables: props.variables || {},
  });
  return (
    <>
      {isLoading ? (
        <LoadingPage>{props.children(props)}</LoadingPage>
      ) : (
        // pass the new edit state data to the child
        props.children({ ...props, data: payload })
      )}
    </>
  );
};

export default TinaWrapper;
