## Getting started

Check out the walkthrough for where things are at currently

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/0c8c463ee83749d6af5ff58615b5bdc4" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

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

## Editing content

For demonstration purposes, we have 2 admin editing routes. One is hooked up to Tina Cloud, the other points to your local filesystem.

### Local filesystem

Local file editing can be done at `/admin-local`. This is great for times when you'll be editing your content models and doing some development along with content management

It's useful for local development to be able to see changes immediately, and for your content server to be able to serve changes to your schemas on-the-fly.

### Tina Cloud

The cloud editor is located at `/admin`

Cloud editing is the workflow you'll use when your website is hosted on a server. Note that changes to content from this endpoint will only be reflected once your host has updated your website.
