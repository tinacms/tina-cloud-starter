# Tina Starter 🦙

[![Preview homepage](https://user-images.githubusercontent.com/103008/127326555-6d7d3083-fd4d-4c01-8634-d3421b2b408a.png)](https://tina-cloud-starter-orcin.vercel.app/ "Preview Tina Starter")

This Next.js starter is powered by [TinaCMS](https://tina.io) for you and your team to visually live edit content while browing the website. ✨  
The content is managed through text files stored in your GitHub repository, and queried through our Tina GraphQL API.

## Getting Started

### [Follow our starter guide to setup your site with TinaCMS](https://tina.io/guides/tina-cloud/starter/overview/)

### Overview

- Local Development workflow from the filesystem and a local GraqhQL server.
- [Tina headless backend](https://app.tina.io) to save changes back to GitHub and invite collaborators.
- Media management with [Cloudinary](https://cloudinary.com)
- Deploy on [Vercel](https://vercel.com) to visually edit your site from `/admin` route.

## Requirements

- Git, [Node.js Active LTS](https://nodejs.org/en/about/releases/), Yarn installed for local development
- A [TinaCMS](https://app.tina.io) account for live editing
- A [Cloudinary](https://cloudinary.com) account for media support

## Local development

Install the project's dependencies with

```
yarn install
```

Run the project locally with

```
yarn dev
```

### URLs

- http://localhost:3000 : browse the website 
- http://localhost:3000/admin : connect to Tina Cloud and go in edit mode
- http://localhost:3000/exit-admin : log out of Tina Cloud
- http://localhost:4001/altair/ : GraphQL playground to test queries and browse the API documentation


### Typescript

A good way to ensure your components match the shape of your data is to leverage the auto-generated TypeScript types.
These are rebuilt when your `.tina` config changes.

### Visual Studio Code

#### GraphQL extension

TinaCMS generates your GraphQL schema automatically. 🪄

[Install GraphQL extension](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql) to benefit from type auto-completion.

## Explore the GraphQL API

When your run the server locally, you can browse the GraphQL docs and test your queries in `http://localhost:4001/altair`.

## Getting Help

TinaCMS backend is in public beta, you might face issues, to provide feedback or get help with any challenges you may have:

-   Visit the [documentation](https://tina.io/docs/) to learn more about Tina.
-   [Join our Discord](https://discord.gg/zumN63Ybpf) to share feedback.
-   Visit the [community forum](https://community.tinacms.org/) to ask questions.
-   [Search or open an issue](https://github.com/tinacms/tinacms/issues) if something is not working.
-   Reach out on Twitter at [@tina_cms](https://twitter.com/tina_cms).
-   [Email us](mailto:support@tina.io) to schedule a call with our team and share more about your context and what you're trying to achieve.
-   Get support through the chat widget on the TinaCMS Dashboard

## LICENSE

Licensed under the [Apache 2.0 license](./LICENSE).
