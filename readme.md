# Getting started

Check out the walkthrough for where things are at currently

[Jan 21 Development walkthrough](https://www.loom.com/share/e62776f138ec485d81d71c68364857a8)

## Getting started locally

One of the most interesting aspects of the Tina Cloud content API is that it doesn't actually require a anything from the cloud to work locally. Since this is a git-backed CMS, everything can be run from your local filesystem via our CLI. This is ideal for development workflows and the API is identical to the one used in the cloud, so once you're ready to deploy your app you won't face any challenges there.

### Fork this project

Fork this project and clone it to your local system.

### Run `yarn install`

### Run `yarn watch`

This will start the GraphQL server as well as the Next.js app in dev mode. It'll also regenerate your schema types for Typescript and GraphQL so changes to your `.tina` config are reflected immediately.

### Visit the home page at `http://localhost:3000`

You should see a statically generated home page. Read on to see how edits can be made.

### Editing local content

Visit `http://localhost:3000/admin`, you should see the same content only this time there will be a Tina sidebar with fields you can edit and see live on the page. Saving a form here will result in changes to your local file.

Read [folder structure](#folder-structure) section below to learn more about how this site's routing works.

### Continuing local development

While this is a very quick process, there's a lot more to show on how you can work locally, read our Tina Starter guides for more.

## Connecting to Tina Cloud

While the fully-local development workflow is the recommended way for developers to work, you'll obviously want other editors and collaborators to be able to make changes on a hosted website with authentication. In general it's a good idea to avoid working locally while communicating with the Tina Cloud API, but it's something you'll want to test to ensure it works as expected.

> Note that changes to cloud content will only be shown in the `/admin` route. This is because the repo is designed to source content from your filesystem and build it statically during deployments. Read the [data flow] section below for more information on how this works.

### Register your local app with Tina Cloud

Visit [auth.tinajs.dev](https://auth.tinajs.dev/), create a realm, and sign in.

From there, create an app which connects to the Github repo you've just forked. Set the redirect URL to `http://localhost:3000/admin`.

Once you've created your app, make a note of the client ID as well as your realm name.

### Copy `.env.local.sample` to `.env.local`

Substite the placeholder values for the realm name and client ID you just created. `NEXT_PUBLIC_REDIRECT_URI` can remain untouched.

> Note: any time you change values `.env.local` you'll need to restart your server.

### Run `yarn watch`

This will do the same thing as when you had run it previously, but this time we'll be making changes directly on the cloud server.

### Visit `http://localhost:3000/admin`

You'll be asked to sign in to your Tina Cloud account, and upon success your edits will be sent to the cloud server (and subesquently to Github).

> Note that this is different from `/admin-local`, where your changes are persisted to your local filesystem.

# Folder structure

As this is a Next.js app, you'll find the file-based routing in the `pages` directory.

### `pages/[[...slug]].tsx`

This is the only public route for your website, any path you visit will be passed in as arguments to the content API, with first value from the path being used as the `section` slug, and everything after that representing the document's path _relative_ to the configured section path.

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

### `pages/admin-local/[[...slug]].tsx`

Admin local is for demonstration and development purposes, since `admin.tsx` will write changes to the **content API** service (which will be persisted to Github), you won't see those changes in the `[[...slug]].tsx` route. The `[[..slug]].tsx` route is using your local filesystem as the data source, so changes in Github aren't reflected here unless you pulled them down.

The `admin-local` route will write to your local filesystem instead, this is the ideal workflow for developers. You'll be able to make changes to your content schema and see them reflected immediately without needing to talk to an external service.

However, it makes no sense to support this on a proper web host, any changes requested to the filesystem would either be blocked by the server or blown away on the next deploy. That's why this endpoint is disabled for production environments.

### `components/document-renderer.tsx`

The document renderer component demonstrates the rich development experience gained by using auto-generated types from the Tina CLI. The `<DocumentRenderer>` shows how you can use the provided types to step through the data. This a great hand-off point to your design system.

It's at this layer where the data-fetching and routing logic has already been handled, and you can focus on the look and feel of your website. We've provided a few components to get you started, but the idea is to let you run with it yourself, or plug in your favorite design system. Enjoy!

# Content Models

Inside the `.tina` folder you'll find several files related to content modeling. First, the `settings.yml` has a `sections` key which controls how content is persisted to the filesystem.

The templates you'll see in the section definitions can be found in `.tina/front_matter/templates`. As you can see, some of them don't belong to a corresponding "section" (eg. `block-cta`). This is because template definitions can also be used as blocks, if you look in `.tina/front_matter/templates/page.yml` you'll see the `blocks` field using `blocks-cta` and `blocks-hero` templates. This is a really powerful pattern, instead of creating an entirely separate record for each "block" element, Tina is able to keep your content in a single file, making maintenance much more manageable.

# Guides

## Local development workflow tips

To get the most out of the starter you'll want to leverage some of the tooling that might not be immediately obvious when you first get set up. Watch the [walkthrough video](https://www.loom.com/share/e62776f138ec485d81d71c68364857a8) for a deeper understanding of you can use these tools to help you.

### Using Typescript

A good way to ensure your components match the shape of your data is to leverage the auto-generated typescript types. These are rebuilt when your `.tina` config changes.

### Using VS Code's GraphQL extension

Likewise, if you're using VS Code we generate your GraphQL schema automatically for use by the [GraphQL extension](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql)

### Using the Forestry extension

The [Forestry extension](https://marketplace.visualstudio.com/items?itemName=jeffsee55.forestry-schema) will provide linting errors if you've configured your content models incorrectly.

### Explore the GraphQL API

If you're using VS Code you can have GraphQL syntax highlighting in your queries, add the [GraphQL VS Code extension](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql) and can direct it to `http://localhost:4001/graphql`.
