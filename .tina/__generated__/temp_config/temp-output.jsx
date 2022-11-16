// .tina/config.tsx
import { defineStaticConfig } from "tinacms";

// components/layout/layout.tsx
import Head from "next/head";

// components/layout/header.tsx
import React from "react";
import Link from "next/link";

// components/util/icon.tsx
import {
  BiCodeBlock,
  BiLike,
  BiMapAlt,
  BiPalette,
  BiPieChartAlt2,
  BiPin,
  BiShield,
  BiSlider,
  BiStore,
  BiTennisBall,
  BiTestTube,
  BiTrophy,
  BiUserCircle,
  BiBeer,
  BiChat,
  BiCloud,
  BiCoffeeTogo,
  BiWorld
} from "react-icons/bi";
import { ImTrophy } from "react-icons/im";
import {
  HiAdjustments,
  HiBeaker,
  HiChartBar,
  HiChatAlt2,
  HiCloud,
  HiColorSwatch,
  HiLocationMarker,
  HiMap,
  HiShieldCheck,
  HiShoppingCart,
  HiTerminal,
  HiThumbUp,
  HiUser
} from "react-icons/hi";
import { FiAperture } from "react-icons/fi";
import { FaBeer, FaCoffee } from "react-icons/fa";

// public/tina.svg
var tina_default = "./tina-FOVSKTU3.svg";

// components/util/icon.tsx
var iconOptions = {
  code: { bi: BiCodeBlock, hi: HiTerminal },
  like: { bi: BiLike, hi: HiThumbUp },
  map: { bi: BiMapAlt, hi: HiMap },
  palette: { bi: BiPalette, hi: HiColorSwatch },
  chart: { bi: BiPieChartAlt2, hi: HiChartBar },
  pin: { bi: BiPin, hi: HiLocationMarker },
  shield: { bi: BiShield, hi: HiShieldCheck },
  settings: { bi: BiSlider, hi: HiAdjustments },
  store: { bi: BiStore, hi: HiShoppingCart },
  ball: { bi: BiTennisBall, hi: BiTennisBall },
  tube: { bi: BiTestTube, hi: HiBeaker },
  trophy: { bi: BiTrophy, hi: ImTrophy },
  user: { bi: BiUserCircle, hi: HiUser },
  beer: { bi: BiBeer, hi: FaBeer },
  chat: { bi: BiChat, hi: HiChatAlt2 },
  cloud: { bi: BiCloud, hi: HiCloud },
  coffee: { bi: BiCoffeeTogo, hi: FaCoffee },
  world: { bi: BiWorld, hi: BiWorld },
  aperture: { bi: FiAperture, hi: FiAperture },
  tina: { bi: tina_default, hi: tina_default }
};
var iconColorClass = {
  blue: {
    regular: "text-blue-400",
    circle: "bg-blue-400 dark:bg-blue-500 text-blue-50"
  },
  teal: {
    regular: "text-teal-400",
    circle: "bg-teal-400 dark:bg-teal-500 text-teal-50"
  },
  green: {
    regular: "text-green-400",
    circle: "bg-green-400 dark:bg-green-500 text-green-50"
  },
  red: {
    regular: "text-red-400",
    circle: "bg-red-400 dark:bg-red-500 text-red-50"
  },
  pink: {
    regular: "text-pink-400",
    circle: "bg-pink-400 dark:bg-pink-500 text-pink-50"
  },
  purple: {
    regular: "text-purple-400",
    circle: "bg-purple-400 dark:bg-purple-500 text-purple-50"
  },
  orange: {
    regular: "text-orange-400",
    circle: "bg-orange-400 dark:bg-orange-500 text-orange-50"
  },
  yellow: {
    regular: "text-yellow-400",
    circle: "bg-yellow-400 dark:bg-yellow-500 text-yellow-50"
  },
  white: {
    regular: "text-white opacity-80",
    circle: "bg-white-400 dark:bg-white-500 text-white-50"
  }
};
var formatFieldLabel = (value) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};
var iconSchema = {
  type: "object",
  label: "Icon",
  name: "icon",
  fields: [
    {
      type: "string",
      label: "Color",
      name: "color",
      options: Object.keys(iconColorClass).map((color) => ({
        label: formatFieldLabel(color),
        value: color
      }))
    },
    {
      name: "style",
      label: "Style",
      type: "string",
      options: [
        {
          label: "Circle",
          value: "circle"
        },
        {
          label: "Float",
          value: "float"
        }
      ]
    },
    {
      type: "string",
      label: "Icon",
      name: "name",
      options: Object.keys(iconOptions).map((icon) => ({
        label: formatFieldLabel(icon),
        value: icon
      }))
    }
  ]
};

// components/layout/footer/footer.tsx
import Link2 from "next/link";
import { FaFacebookF, FaGithub, FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

// components/layout/footer/rawRenderer.tsx
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

// content/global/index.json
var global_default = {
  header: {
    icon: {
      color: "orange",
      style: "float",
      name: "tina"
    },
    color: "default",
    nav: [
      {
        href: "",
        label: "Home"
      },
      {
        href: "about",
        label: "About"
      },
      {
        href: "posts",
        label: "Blog"
      }
    ]
  },
  footer: {
    color: "default",
    social: {
      facebook: "/",
      twitter: "/",
      instagram: "/"
    }
  },
  theme: {
    color: "blue",
    font: "sans",
    icon: "boxicon",
    darkMode: "system"
  }
};

// components/layout/theme.tsx
import * as React2 from "react";
var ThemeContext = React2.createContext(global_default.theme);

// components/blocks/content.tsx
import { TinaMarkdown } from "tinacms/dist/rich-text";
var contentBlockSchema = {
  name: "content",
  label: "Content",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede."
    }
  },
  fields: [
    {
      type: "rich-text",
      label: "Body",
      name: "body"
    },
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" }
      ]
    }
  ]
};

// components/util/actions.tsx
import Link3 from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";

// components/blocks/features.tsx
var defaultFeature = {
  title: "Here's Another Feature",
  text: "This is where you might talk about the feature, if this wasn't just filler text.",
  icon: {
    color: "",
    style: "float",
    name: ""
  }
};
var featureBlockSchema = {
  name: "features",
  label: "Features",
  ui: {
    previewSrc: "/blocks/features.png",
    defaultItem: {
      items: [defaultFeature, defaultFeature, defaultFeature]
    }
  },
  fields: [
    {
      type: "object",
      label: "Feature Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title
          };
        },
        defaultItem: {
          ...defaultFeature
        }
      },
      fields: [
        iconSchema,
        {
          type: "string",
          label: "Title",
          name: "title"
        },
        {
          type: "string",
          label: "Text",
          name: "text",
          ui: {
            component: "textarea"
          }
        }
      ]
    },
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" }
      ]
    }
  ]
};

// components/blocks/hero.tsx
import { TinaMarkdown as TinaMarkdown2 } from "tinacms/dist/rich-text";
var heroBlockSchema = {
  name: "hero",
  label: "Hero",
  ui: {
    previewSrc: "/blocks/hero.png",
    defaultItem: {
      tagline: "Here's some text above the other text",
      headline: "This Big Text is Totally Awesome",
      text: "Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo."
    }
  },
  fields: [
    {
      type: "string",
      label: "Tagline",
      name: "tagline"
    },
    {
      type: "string",
      label: "Headline",
      name: "headline"
    },
    {
      label: "Text",
      name: "text",
      type: "rich-text"
    },
    {
      label: "Actions",
      name: "actions",
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          label: "Action Label",
          type: "button",
          icon: true,
          link: "/"
        }
      },
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string"
        },
        {
          label: "Type",
          name: "type",
          type: "string",
          options: [
            { label: "Button", value: "button" },
            { label: "Link", value: "link" }
          ]
        },
        {
          label: "Icon",
          name: "icon",
          type: "boolean"
        },
        {
          label: "Link",
          name: "link",
          type: "string"
        }
      ]
    },
    {
      type: "object",
      label: "Image",
      name: "image",
      fields: [
        {
          name: "src",
          label: "Image Source",
          type: "image"
        },
        {
          name: "alt",
          label: "Alt Text",
          type: "string"
        }
      ]
    },
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" }
      ]
    }
  ]
};

// components/blocks/testimonial.tsx
var testimonialBlockSchema = {
  name: "testimonial",
  label: "Testimonial",
  ui: {
    previewSrc: "/blocks/testimonial.png",
    defaultItem: {
      quote: "There are only two hard things in Computer Science: cache invalidation and naming things.",
      author: "Phil Karlton",
      color: "primary"
    }
  },
  fields: [
    {
      type: "string",
      ui: {
        component: "textarea"
      },
      label: "Quote",
      name: "quote"
    },
    {
      type: "string",
      label: "Author",
      name: "author"
    },
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" }
      ]
    }
  ]
};

// .tina/config.tsx
var config = defineStaticConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || process.env.HEAD,
  token: process.env.TINA_TOKEN,
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads"
    }
  },
  build: {
    publicFolder: "public",
    outputFolder: "admin"
  },
  schema: {
    collections: [
      {
        label: "Blog Posts",
        name: "post",
        path: "content/posts",
        format: "mdx",
        ui: {
          router: ({ document }) => {
            return `/post/${document._sys.filename}`;
          }
        },
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
            isTitle: true,
            required: true
          },
          {
            type: "image",
            name: "heroImg",
            label: "Hero Image"
          },
          {
            type: "rich-text",
            label: "Excerpt",
            name: "excerpt"
          },
          {
            type: "reference",
            label: "Author",
            name: "author",
            collections: ["author"]
          },
          {
            type: "datetime",
            label: "Posted Date",
            name: "date",
            ui: {
              dateFormat: "MMMM DD YYYY",
              timeFormat: "hh:mm A"
            }
          },
          {
            type: "rich-text",
            label: "Body",
            name: "_body",
            templates: [
              {
                name: "DateTime",
                label: "Date & Time",
                inline: true,
                fields: [
                  {
                    name: "format",
                    label: "Format",
                    type: "string",
                    options: ["utc", "iso", "local"]
                  }
                ]
              },
              {
                name: "BlockQuote",
                label: "Block Quote",
                fields: [
                  {
                    name: "children",
                    label: "Quote",
                    type: "rich-text"
                  },
                  {
                    name: "authorName",
                    label: "Author",
                    type: "string"
                  }
                ]
              },
              {
                name: "NewsletterSignup",
                label: "Newsletter Sign Up",
                fields: [
                  {
                    name: "children",
                    label: "CTA",
                    type: "rich-text"
                  },
                  {
                    name: "placeholder",
                    label: "Placeholder",
                    type: "string"
                  },
                  {
                    name: "buttonText",
                    label: "Button Text",
                    type: "string"
                  },
                  {
                    name: "disclaimer",
                    label: "Disclaimer",
                    type: "rich-text"
                  }
                ],
                ui: {
                  defaultItem: {
                    placeholder: "Enter your email",
                    buttonText: "Notify Me"
                  }
                }
              }
            ],
            isBody: true
          }
        ]
      },
      {
        label: "Global",
        name: "global",
        path: "content/global",
        format: "json",
        ui: {
          global: true
        },
        fields: [
          {
            type: "object",
            label: "Header",
            name: "header",
            fields: [
              iconSchema,
              {
                type: "string",
                label: "Color",
                name: "color",
                options: [
                  { label: "Default", value: "default" },
                  { label: "Primary", value: "primary" }
                ]
              },
              {
                type: "object",
                label: "Nav Links",
                name: "nav",
                list: true,
                ui: {
                  itemProps: (item) => {
                    return { label: item?.label };
                  },
                  defaultItem: {
                    href: "home",
                    label: "Home"
                  }
                },
                fields: [
                  {
                    type: "string",
                    label: "Link",
                    name: "href"
                  },
                  {
                    type: "string",
                    label: "Label",
                    name: "label"
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            label: "Footer",
            name: "footer",
            fields: [
              {
                type: "string",
                label: "Color",
                name: "color",
                options: [
                  { label: "Default", value: "default" },
                  { label: "Primary", value: "primary" }
                ]
              },
              {
                type: "object",
                label: "Social Links",
                name: "social",
                fields: [
                  {
                    type: "string",
                    label: "Facebook",
                    name: "facebook"
                  },
                  {
                    type: "string",
                    label: "Twitter",
                    name: "twitter"
                  },
                  {
                    type: "string",
                    label: "Instagram",
                    name: "instagram"
                  },
                  {
                    type: "string",
                    label: "Github",
                    name: "github"
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            label: "Theme",
            name: "theme",
            fields: [
              {
                type: "string",
                label: "Primary Color",
                name: "color",
                options: [
                  {
                    label: "Blue",
                    value: "blue"
                  },
                  {
                    label: "Teal",
                    value: "teal"
                  },
                  {
                    label: "Green",
                    value: "green"
                  },
                  {
                    label: "Red",
                    value: "red"
                  },
                  {
                    label: "Pink",
                    value: "pink"
                  },
                  {
                    label: "Purple",
                    value: "purple"
                  },
                  {
                    label: "Orange",
                    value: "orange"
                  },
                  {
                    label: "Yellow",
                    value: "yellow"
                  }
                ]
              },
              {
                type: "string",
                name: "font",
                label: "Font Family",
                options: [
                  {
                    label: "System Sans",
                    value: "sans"
                  },
                  {
                    label: "Nunito",
                    value: "nunito"
                  },
                  {
                    label: "Lato",
                    value: "lato"
                  }
                ]
              },
              {
                type: "string",
                name: "icon",
                label: "Icon Set",
                options: [
                  {
                    label: "Boxicons",
                    value: "boxicon"
                  },
                  {
                    label: "Heroicons",
                    value: "heroicon"
                  }
                ]
              },
              {
                type: "string",
                name: "darkMode",
                label: "Dark Mode",
                options: [
                  {
                    label: "System",
                    value: "system"
                  },
                  {
                    label: "Light",
                    value: "light"
                  },
                  {
                    label: "Dark",
                    value: "dark"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        label: "Authors",
        name: "author",
        path: "content/authors",
        format: "md",
        fields: [
          {
            type: "string",
            label: "Name",
            name: "name",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            label: "Avatar",
            name: "avatar"
          }
        ]
      },
      {
        label: "Pages",
        name: "page",
        path: "content/pages",
        ui: {
          router: ({ document }) => {
            if (document._sys.filename === "home") {
              return `/`;
            }
            if (document._sys.filename === "about") {
              return `/about`;
            }
            return void 0;
          }
        },
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
            isTitle: true,
            required: true
          },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Sections",
            ui: {
              visualSelector: true
            },
            templates: [
              heroBlockSchema,
              featureBlockSchema,
              contentBlockSchema,
              testimonialBlockSchema
            ]
          }
        ]
      }
    ]
  }
});
var config_default = config;
export {
  config_default as default
};
