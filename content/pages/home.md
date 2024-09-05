---
title: Tina Cloud Starter
blocks:
  - headline: All About Web2 & Web3
    text: >
      ## A bit about me


      My name is Dylan Burkey, and I'm a seasoned web engineer with 23 years of
      experience. A Forbes Web3 Legacy pass holder, and deeply invested in the
      future of Web3.


      I'm proficient in just about every development framework in addition to
      numerous backend languages and passionate about leveraging user behavior
      to drive data-driven development decisions. \

      \

      I put this together using Next.js and Tina (Headless CMS) as both a use
      case and potentially a long term blog. 
    text2: >
      ## Next.js is overkill and slow!


      When React was first released I wondered why the hell anyone would want to
      use it. The framework made building high quality web applications far more
      difficult then it needs to be. \

      \

      I still feel that way today. There are far better options such as:


      * **HTML, CSS and JS**
        * For the average site you really only need the basics. Yes you may have to copy and paste the header/footer across a few pages. This takes far less time then spinning up Next.js because its expected.
      * Web Components
        * All browsers now support web components. Using native HTML, CSS and JS makes much more sense then congesting the main thread with unnecessary JS.
      * Nunjucks or any templating language + Node.js
        * Lightweight and fast. Again for the majority of sites this is a great solution. Includes, variables, functions and more. An easy and smart way to build out a site quickly.
      * Astro 
        * When you really need a framework for some potential heavy lifting and you care about user experience. Astro has you covered, it's ships with no JS, Astro Islands are an amazing step for JS frameworks.
    actions:
      - label: Read Blog
        type: button
        icon: true
        link: /posts
    image:
      src: ''
      alt: ''
    color: default
    _template: hero
  - items:
      - icon:
          name: BiCodeBlock
          color: red
          style: float
        title: Amazing Feature
        text: >-
          Aliquam blandit felis rhoncus, eleifend ipsum in, condimentum nibh.
          Praesent ac faucibus risus, eu lacinia enim.
      - icon:
          name: BiLike
          color: primary
          style: float
        title: This Is a Feature
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
      naming things.
    author: Phil Karlton
    color: primary
    _template: testimonial
---

