# Tina Cloud Starter

## Getting started locally

One of the most interesting aspects of the Tina Cloud content API is that it doesn't actually require anything from the cloud to work locally. Since this is a git-backed CMS, everything can be run from your local filesystem via the CLI. This is ideal for development workflows and the API is identical to the one used in the cloud, so once you're ready to deploy your app you won't face any challenges there.

### Fork this project

Fork this project and clone it to your local system.

### Run `yarn install`

> For this project we're using `yarn`, if you'd like to use `npm` instead just beware that there isn't a `package-lock.json` so we can't guarantee the dependencies are the same for you.

### Run `yarn dev`

This will start the GraphQL server as well as the Next.js app in dev mode. It'll also regenerate your schema types for Typescript and GraphQL so changes to your `.tina` config are reflected immediately.

### Visit the home page at `http://localhost:3000`

You should see a statically generated home page that dumps out your data as JSON, it's pretty underwhelming! But the idea is to let you run with it from here, one of the goals of this project is to stay out of your way as much as possible, so it's up to you to make it pretty ;)

### Editing local content

Copy `.env.local.sample` to `.env.local`:

```
cp .env.local.sample .env.local
```

Make sure `NEXT_PUBLIC_USE_LOCAL_CLIENT` is set to `1`, other values can be ignored for now.

Restart your server and visit `http://localhost:3000/admin`, you should see the same content only this time there will be a Tina sidebar with fields you can edit and see live on the page. Saving a form here will result in changes to your local filesystem.

Read the [folder structure](#folder-structure) section below to learn more about how this site's routing works.

> BUG - when adding a block and populating it's content, that data on your page will update to the wrong block. This will be solved by [this ticket](https://github.com/tinacms/tinacms/issues/1669) or maybe by us.

### Continuing local development

While it's pretty quick to get started, there's a lot more to show on how you can work locally, read the [workflow tips](#local-development-workflow-tips) for more info and check out the [development walkthrough](https://www.loom.com/share/e62776f138ec485d81d71c68364857a8) video.

## Connecting to Tina Cloud

While the fully-local development workflow is the recommended way for developers to work, you'll obviously want other editors and collaborators to be able to make changes on a hosted website with authentication. In general it's a good idea to avoid working locally while communicating with the Tina Cloud API, but it's something you'll want to test to ensure it works as expected.

> Note that changes to cloud content will only be shown in the `/admin` route. This is because the repo is designed to source content from your filesystem and build it statically during deployments.

### Register your local app with Tina Cloud

Visit [auth.tinajs.dev](https://auth.tinajs.dev/register), create a realm, and sign in.

From there, create an app which connects to the Github repo you've just forked. Set the redirect URL to `http://localhost:3000/admin`.

Once you've created your app, make a note of the client ID as well as your realm name.

### Ensure you've copied `.env.local.sample` to `.env.local`

Set `NEXT_PUBLIC_USE_LOCAL_CLIENT` to `0`.

Substite the other placeholder values for the realm name and client ID you just created.

> Note: any time you change values `.env.local` you'll need to restart your server.

### Run `yarn dev`

This will do the same thing as when you had run it previously, but this time we'll be making changes directly on the cloud server.

### Visit `http://localhost:3000/admin`

This time you'll be asked to sign in to your Tina Cloud account, and upon success your edits will be sent to the cloud server (and subesquently to Github).

#### Edit & Save your form

These changes will be persisted to Github. Note that you won't see them when you visit a non-admin route when working locally.

# Hosting the project

At this point you have Tina Cloud editing enabled, deploy it to the cloud so others can make edits too:

## Hosting on Vercel

This app can quickly be deployed to [Vercel](https://vercel.com/new).

Once the Vercel app has been created, be sure to add the following environment variables:

```
NEXT_PUBLIC_REALM_NAME=<get this from the realm you create at auth.tinajs.dev>
NEXT_PUBLIC_TINA_CLIENT_ID=<get this from the app you create at auth.tinajs.dev>
```

_You will need to trigger a redeploy from Vercel's UI for these environment variables to take effect_

Now that we have a live site, we can take the deployment URL and use it within our Tina Cloud app's `Callback URL` field.
Go to the [dashboard](https://auth.tinajs.dev/register), click into your new app, and change its `Callback URL` to `[your deployment URL]/admin`

You can test that everything is configured correctly by navigating to `[your deployment URL]/admin`, and trying to login.

## Hosting on Netlify

The app can be [deployed to Netlify](https://app.netlify.com/start) with similar steps to the Vercel deployment.

For the **build command**, use `yarn build`, and `.next/` as the **publish directory**.

You will also want to install the ["Next on Netlify" plugin](https://www.netlify.com/blog/2020/12/07/announcing-one-click-install-next.js-build-plugin-on-netlify/). This allows you to take advantage of server-side rendering and other Next features.

Once the Netlify app has been created, be sure to add the following environment variables:

```
NEXT_PUBLIC_REALM_NAME=<get this from the realm you create at auth.tinajs.dev>
NEXT_PUBLIC_TINA_CLIENT_ID=<get this from the app you create at auth.tinajs.dev>
```

_You will need to trigger a redeploy from Netlify's UI for these environment variables to take effect_

Now that we have a live site, we can take the deployment URL and use it within our Tina Cloud app's `Callback URL` field.
Go to the [dashboard](https://auth.tinajs.dev), click into your new app, and change its `Callback URL` to `[your deployment URL]/admin`

You can test that everything is configured correctly by navigating to `[your deployment URL]/admin`, and trying to login.

---

# Further reading

## Folder structure

As this is a Next.js app, you'll find the file-based routing in the `pages` directory.

### `pages/[[...slug]].tsx`

This is the only public route for your website, any path you visit will be passed in as arguments to the content API, with first value from the path being used as the `section` slug, and everything after that representing the document's path _relative_ to the configured section path. When deploying to a server, these paths are statically generated at build time.

#### Example

If I have a `.tina/settings.yml` config list so:

```yml
---
sections:
  - type: directory
    path: content/posts
    label: Posts
    create: documents
    match: "**/*.md"
    templates:
      - post
```

And I have a document located at `content/posts/hello-world.md`, you'll find that document at `http://localhost:3000/posts/hello-world`.

> Notice that `hello-world` is considered the **relative** path here, we don't need to specify `content/posts/hello-world` because that's been configured in our `settings.yml`.

> By default the index route (`http://localhost:3000`) will show the `home.md` document from your `content/pages` directory

### `pages/admin/[[...slug]].tsx`

This is the route where you'll be able to edit your content. It's protected by an authentication layer, so be sure you've set up an account in the **Getting Started** steps above. It matches the routing pattern seen in `[[...slug]].tsx`.

For example, to edit `http://localhost:3000/posts/hello-world`, you'd need to visit `http://localhost:3000/admin/posts/hello-world`.

### `components/document-renderer.tsx`

The document renderer component demonstrates the rich development experience gained by using auto-generated types from the Tina CLI. The `<DocumentRenderer>` shows how you can use the provided types to step through the data. This a great hand-off point to your design system.

It's at this layer where the data-fetching and routing logic has already been handled, and you can focus on the look and feel of your website. We've provided a few components to get you started, but the idea is to let you run with it yourself, or plug in your favorite design system. Enjoy!

## Local development workflow tips

To get the most out of the starter you'll want to leverage some of the tooling that might not be immediately obvious when you first get set up. Watch the [walkthrough video](https://www.loom.com/share/e62776f138ec485d81d71c68364857a8) for a deeper understanding of you can use these tools to help you.

### Using Typescript

A good way to ensure your components match the shape of your data is to leverage the auto-generated typescript types. These are rebuilt when your `.tina` config changes.

### Using VS Code's GraphQL extension

Likewise, if you're using VS Code we generate your GraphQL schema automatically for use by the [GraphQL extension](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql)

### Using the Forestry extension

The [Forestry extension](https://marketplace.visualstudio.com/items?itemName=jeffsee55.forestry-schema) will provide linting errors if you've configured your content models incorrectly.

### Explore the GraphQL API

If you have a GraphQL client like [Altair](https://altair.sirmuel.design/) you can direct it to `http://localhost:4001/graphql` to learn more about the API.
