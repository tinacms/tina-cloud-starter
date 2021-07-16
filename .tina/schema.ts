import { unstable_defineSchema } from "tina-graphql-gateway-cli";

export default unstable_defineSchema({
  collections: [
    {
      label: "Blog Posts",
      name: "posts",
      path: "content/posts",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "reference",
          label: "Author",
          name: "author",
          collections: ["authors"],
        },
        {
          type: "datetime",
          label: "Posted Date",
          name: "date",
          dateFormat: "MMMM DD YYYY",
          timeFormat: "",
          ui: {
            dateFormat: "MMMM DD YYYY",
            timeFormat: false,
          },
        },
        {
          type: "string",
          label: "Excerpt",
          ui: {
            component: "textarea",
          },
          name: "excerpt",
        },
        {
          type: "string",
          label: "Body",
          ui: {
            component: "textarea",
          },
          name: "_body",
          isBody: true,
        },
      ],
    },
    {
      label: "Global",
      name: "global",
      path: "content/global",
      fields: [
        {
          type: "object",
          label: "Footer",
          name: "footer",
          fields: [
            {
              type: "string",
              label: "Facebook",
              name: "facebook",
            },
            {
              type: "string",
              label: "Twitter",
              name: "twitter",
            },
            {
              type: "string",
              label: "Instagram",
              name: "instagram",
            },
            {
              type: "string",
              label: "Github",
              name: "github",
            },
          ],
        },
      ],
    },
    {
      label: "Authors",
      name: "authors",
      path: "content/authors",
      fields: [
        {
          type: "string",
          label: "Name",
          name: "name",
        },
        {
          type: "string",
          label: "Avatar",
          name: "avatar",
        },
      ],
    },
    {
      label: "Pages",
      name: "pages",
      path: "content/pages",
      fields: [
        {
          type: "object",
          list: true,
          name: "blocks",
          label: "Sections",
          templates: [
            {
              name: "hero",
              label: "Hero",
              ui: {
                defaultItem: {
                  tagline: "Here's some text above the other text",
                  headline: "This Big Text is Totally Awesome",
                  text: "Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.",
                },
              },
              fields: [
                {
                  type: "string",
                  label: "Tagline",
                  name: "tagline",
                },
                {
                  type: "string",
                  label: "Headline",
                  name: "headline",
                },
                {
                  type: "string",
                  label: "Text",
                  name: "text",
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
                      link: "/",
                    },
                  },
                  fields: [
                    {
                      label: "Label",
                      name: "label",
                      type: "string",
                    },
                    {
                      label: "Type",
                      name: "type",
                      type: "string",
                      options: [
                        { label: "Button", value: "button" },
                        { label: "Link", value: "link" },
                      ],
                    },
                    {
                      label: "Icon",
                      name: "icon",
                      type: "boolean",
                    },
                    {
                      label: "Link",
                      name: "link",
                      type: "string",
                    },
                  ],
                },
                {
                  type: "string",
                  label: "Color",
                  name: "color",
                  options: [
                    { label: "Default", value: "default" },
                    { label: "Tint", value: "tint" },
                    { label: "Primary", value: "primary" },
                  ],
                },
                {
                  type: "object",
                  label: "Image",
                  name: "image",
                  fields: [
                    {
                      name: "src",
                      label: "Image Source",
                      type: "string",
                    },
                    {
                      name: "alt",
                      label: "Alt Text",
                      type: "string",
                    },
                  ],
                },
              ],
            },
            {
              name: "features",
              label: "Features",
              fields: [
                {
                  type: "object",
                  label: "Feature Items",
                  name: "items",
                  list: true,
                  fields: [
                    {
                      type: "string",
                      label: "Title",
                      name: "title",
                    },
                    {
                      type: "string",
                      label: "Text",
                      name: "text",
                    },
                    {
                      type: "object",
                      label: "Icon",
                      name: "icon",
                      fields: [
                        {
                          type: "string",
                          label: "Color",
                          name: "color",
                          options: [
                            {
                              label: "Primary (Theme)",
                              value: "primary",
                            },
                            {
                              label: "Blue",
                              value: "blue",
                            },
                            {
                              label: "Teal",
                              value: "teal",
                            },
                            {
                              label: "Green",
                              value: "green",
                            },
                            {
                              label: "Red",
                              value: "red",
                            },
                            {
                              label: "Pink",
                              value: "pink",
                            },
                            {
                              label: "Purple",
                              value: "purple",
                            },
                            {
                              label: "Orange",
                              value: "orange",
                            },
                            {
                              label: "Yellow",
                              value: "yellow",
                            },
                          ],
                        },
                        {
                          type: "string",
                          label: "Icon",
                          name: "icon",
                          options: [
                            {
                              label: "Random",
                              value: "",
                            },
                            {
                              label: "Aperture",
                              value: "FiAperture",
                            },
                            {
                              label: "Code Block",
                              value: "BiCodeBlock",
                            },
                            {
                              label: "Like",
                              value: "BiLike",
                            },
                            {
                              label: "Map",
                              value: "BiMapAlt",
                            },
                            {
                              label: "Palette",
                              value: "BiPalette",
                            },
                            {
                              label: "Pie Chart",
                              value: "BiPieChartAlt2",
                            },
                            {
                              label: "Pin",
                              value: "BiPin",
                            },
                            {
                              label: "Shield",
                              value: "BiShield",
                            },
                            {
                              label: "Setting Sliders",
                              value: "BiSlider",
                            },
                            {
                              label: "Store",
                              value: "BiStore",
                            },
                            {
                              label: "Tennis Ball",
                              value: "BiTennisBall",
                            },
                            {
                              label: "Test Tube",
                              value: "BiTestTube",
                            },
                            {
                              label: "Trophy",
                              value: "BiTrophy",
                            },
                            {
                              label: "User",
                              value: "BiUserCircle",
                            },
                            {
                              label: "Beer",
                              value: "BiBeer",
                            },
                            {
                              label: "Chat",
                              value: "BiChat",
                            },
                            {
                              label: "Cloud",
                              value: "BiCloud",
                            },
                            {
                              label: "Coffee",
                              value: "BiCoffeeTogo",
                            },
                            {
                              label: "World",
                              value: "BiWorld",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "string",
                  label: "Color",
                  name: "color",
                  options: [
                    { label: "Default", value: "default" },
                    { label: "Tint", value: "tint" },
                    { label: "Primary", value: "primary" },
                  ],
                },
              ],
            },
            {
              name: "content",
              label: "Content",
              fields: [
                {
                  type: "string",
                  ui: {
                    component: "textarea",
                  },
                  label: "Body",
                  name: "body",
                },
                {
                  type: "string",
                  label: "Color",
                  name: "color",
                  options: [
                    { label: "Default", value: "default" },
                    { label: "Tint", value: "tint" },
                    { label: "Primary", value: "primary" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});
