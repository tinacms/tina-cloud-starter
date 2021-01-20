# Getting started

Check out the walkthrough for where things are at currently

[Jan 14 WALKTHROUGH](https://www.loom.com/share/0c8c463ee83749d6af5ff58615b5bdc4)

### Fork this project

Fork this project and clone it to your local system, the forked project will be what you use to connect to Tina Cloud.

### Register your app with Tina Cloud

Visit [auth.tinajs.dev](https://auth.tinajs.dev/), create a realm, and sign in.

From there, create an app which connects to the Github repo you've just forked.

Once you've created your app, make a note of the client ID as well as your realm name.

### Copy `.env.local.sample` to `.env.local`

Substite the placeholder values for the realm name and client ID you just created. `NEXT_PUBLIC_REDIRECT_URI` can remain untouched.

### Run `yarn install`

### Run `yarn watch`

This will load the graphql server as well as start the nextJS app in dev mode. It'll also regenerate your schema types for Typescript and GraphQL so changes to your config are reflected immediately.

### Visit the home page

You should see a statically generated home page. Read on to see how edits can be made.

### Bonus

If you're using VS Code you can have GraphQL syntax highlighting in your queries, add the [GraphQL VS Code extension](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql)

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

And I have a document located at `content/posts/hello-world.md`, you'll find that document at `https://my-app.com/posts/hello-world`.

> Notice that `hello-world` is considered the **relative** path here, we don't need to specify `content/posts/hello-world` because that's been configured in our `settings.yml`.

> By default the index route (`https:/my-app.com/`) will show the `home.md` document from your `content/pages` directory

### `pages/admin/[[...slug]].tsx`

This is the route where you'll be able to edit your content. It's protected by an authentication layer, so be sure you've set up an account in the **Getting Started** steps above. It matches the routing pattern seen in `[[...slug]].tsx`.

For example, to edit `https://my-app.com/posts/hello-world`, you'd need to visit `https://my-app.com/admin/posts/hello-world`.

### `pages/admin-local/[[...slug]].tsx`

Admin local is for demonstration and development purposes, since `admin.tsx` will write changes to the **content API** service (which will be persisted to Github), you won't see those changes in the `[[...slug]].tsx` route. The `[[..slug]].tsx` route is using your local filesystem as the data source, so changes in Github aren't reflected here unless you pulled them down.

The `admin-local` route will write to your local filesystem instead, this is the ideal workflow for developers. You'll be able to make changes to your content schema and see them reflected immediately without needing to talk to an external service.

However, it makes no sense to support this on a proper web host, any changes requested to the filesystem would either be blocked by the server or blown away on the next deploy. That's why this endpoint is disabled for production environments.

### `components/document-renderer.tsx`

The document renderer component demonstrates the rich development experience gained by using auto-generated types from the Tina CLI. The `<DocumentRenderer>` shows how you can use the provided types to step through the data. This a great hand-off point to your design system.

It's at this layer where the data-fetching and routing logic has already been handled, and you can focus on the look and feel of your website. We've provided a few components to get you started, but the idea is to let you run with it yourself, or plug in your favorite design system. Enjoy!

# Content Models

Inside the `.tina` folder you'll find several files related to content modeling. First, the `settings.yml` has a `sections` key which controls how content is persisted to the filesystem. As you'll see, sections can be comprised of multiple templates, making it easy to store content which is semantically similar, but might differ in shape, in the same folder. As an example we've created a `posts` section which can be either an `article` or an `essay` template. Read more about sections [here](https://forestry.io/docs/settings/content-sections/).

The templates you'll see in the section definitions can be found in `.tina/front_matter/templates`. As you can see, some of them don't belong to a corresponding "section" (eg. `block-cta`). This is because template definitions can also be used as blocks, if you look in `.tina/front_matter/templates/page.yml` you'll see the `blocks` field using `blocks-cta` and `blocks-hero` templates. This is a really powerful pattern, instead of creating an entirely separate record for each "block" element, Tina is able to keep your content in a single file.

# Hosting the project

This app can quickly be deployed to [Vercel](https://vercel.com/new). 
During the deployment steps, be sure to set the following environment variables through the Vercel UI:
```
NEXT_PUBLIC_REALM_NAME=<get this from the realm you create at auth.tinajs.dev>
NEXT_PUBLIC_TINA_CLIENT_ID=<get this from the app you create at auth.tinajs.dev>
NEXT_PUBLIC_REDIRECT_URI=<This will be the URL of this Vercel deployment>/admin
```

Once your project is being deployed, you can take the deployment URL and use it within the app's Callback URL field.
Go to the dashboard, click into your new app, and change its `Callback URL` to `[your deployment URL]/admin`

You can test that everything is configured correctly by navigating to `[your deployment URL]/admin`, and trying to login.

## Hosting on Netlify

The app can be [deployed to Netlify](https://app.netlify.com/start) with similar steps to the Vercel deployment.
