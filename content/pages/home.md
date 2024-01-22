---
title: Tina Cloud Starter
blocks:
  - headline: Welcome to Vandelay Industries Career Site
    text: >
      ## **Importer and Exporter of Latex and Latex-related Products**


      ![](/uploadshttps://res.cloudinary.com/dlyvarr2p/image/upload/v1705686994/vandelay_zwyigv.png)


      This project is set up to show you the basics of working with Tina. You're
      looking at the landing page, which pulls content from
      `content/pages/home.md`, components from components/blocks, and puts them
      all together in `pages/[filename].tsx`, all based on a config
      `tina/config.tsx`.
    actions:
      - label: Current Openings
        type: button
        icon: true
        link: /posts
      - label: Learn more
        type: link
        icon: false
        link: /posts
    image:
      src: >-
        https://res.cloudinary.com/dlyvarr2p/image/upload/v1705523418/cld-sample-5.jpg
      alt: Shoes
    color: default
    _template: hero
  - items:
      - icon:
          name: BiCodeBlock
          color: red
          style: float
        title: Culture
        text: >-
          Aliquam blandit felis rhoncus, eleifend ipsum in, condimentum nibh.
          Praesent ac faucibus risus, eu lacinia enim.
      - icon:
          name: BiLike
          color: primary
          style: float
        title: DE & I
        text: Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.
      - icon:
          name: BiPalette
          color: green
          style: float
        title: Configurable Theme
        text: >-
          Edit global theme configuration with Tina. Change your theme's primary
          color, font, or icon set.
    color: tint
    _template: features
  - quote: >-
      There are only two hard things in Computer Science: cache invalidation and
      naming things. And Off by One errors.
    author: Phil Karlton
    color: primary
    _template: testimonial
---

