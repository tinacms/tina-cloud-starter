import { defineSchema } from "tina-graphql-gateway-cli";

export default defineSchema({
  collections: [
    {
      label: "Blog Posts",
      name: "posts",
      path: "content/posts",
      templates: [
        {
          label: "Article",
          name: "article",
          fields: [
            {
              type: "text",
              label: "Title",
              name: "title",
            },
            {
              type: "reference",
              label: "Author",
              name: "author",
              collection: "authors",
            },
          ],
        },
      ],
    },
    {
      label: "Authors",
      name: "authors",
      path: "content/authors",
      templates: [
        {
          label: "Author",
          name: "author",
          fields: [
            {
              type: "text",
              label: "Name",
              name: "name",
            },
            {
              type: "text",
              label: "Avatar",
              name: "avatar",
            },
          ],
        },
      ],
    },
    {
      label: "Marketing Pages",
      name: "marketingPages",
      path: "content/marketing-pages",
      templates: [
        {
          label: "Simple Page",
          name: "simplePage",
          fields: [
            {
              type: "text",
              label: "Title",
              name: "title",
            },
          ],
        },
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
