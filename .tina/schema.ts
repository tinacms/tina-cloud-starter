import { defineSchema } from "tina-graphql-gateway-cli";

export default defineSchema({
  collections: [
    {
      label: "Marketing Pages",
      name: "marketingPages",
      path: "content/marketing-pages",
      templates: [
        {
          label: "Landing Page",
          name: "landingPage",
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
                    {
                      type: "text",
                      label: "Link",
                      name: "link",
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
                      type: "textarea",
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
