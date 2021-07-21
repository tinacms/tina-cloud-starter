---
blocks:
  - tagline: ''
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
  - items:
      - icon:
          color: red
          style: float
          name: code
        title: Amazing Feature
        text: >-
          Aliquam blandit felis rhoncus, eleifend ipsum in, condimentum nibh.
          Praesent ac faucibus risus, eu lacinia enim.
      - icon:
          style: float
          name: like
        title: This Is a Feature
        text: Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.
      - icon:
          color: green
          style: float
          name: palette
        title: Check Out This Text
        text: >-
          Eleifend ipsum in, condimentum nibh. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices.
    color: tint
    _template: features
---

