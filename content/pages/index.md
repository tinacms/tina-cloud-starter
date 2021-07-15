---
blocks:
  - tagline: ""
    headline: Welcome to the Tina Starter.
    text: >
      This project is set up to show you the basics of working with Tina. You're
      looking at the landing page, which pulls content from
      `content/pages/index.md`, components from `components/blocks` and
      `components/page`, and puts them all together in `pages/index.tsx`, all
      based on a schema defined in `.tina/schema.ts`.
    actions:
      - label: Get Started
        type: button
        icon: true
        link: /posts
      - label: Read Blog
        type: link
        icon: false
        link: /posts
    color: default
    image:
      src: tina-illustration.png
      alt: Tina
    _template: hero
  - description: >-
      When you update page data you'll be able to see updates in real time in
      the raw data below.
    color: tint
    _template: raw
---
