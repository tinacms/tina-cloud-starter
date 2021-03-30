import { defineSchema } from "tina-graphql-gateway-cli";

export default defineSchema({
  collections: [
    {
      label: "Pages",
      name: "pages",
      path: "content/pages",
      templates: [
        {
          label: "Page",
          name: "page",
          fields: [
            {
              type: "text",
              label: "Title",
              name: "title",
            },
            {
              type: "blocks",
              name: "blocks",
              label: "Blocks",
              templates: [
                {
                  name: "blockCta",
                  label: "CTA",
                  fields: [
                    {
                      type: "text",
                      label: "Text",
                      name: "text",
                    },
                  ],
                },
                {
                  name: "blockHero",
                  label: "Hero",
                  fields: [
                    {
                      type: "text",
                      label: "Heading",
                      name: "heading",
                    },
                    {
                      type: "text",
                      label: "Message",
                      name: "message",
                    },
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
