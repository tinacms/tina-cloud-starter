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
          label: "Landing Page",
          name: "landingPage",
          fields: [
            {
              type: "blocks",
              name: "blocks",
              label: "Blocks",
              templates: [
                {
                  name: "message",
                  label: "Message",
                  fields: [
                    {
                      type: "text",
                      label: "Message Header",
                      name: "messageHeader",
                    },
                    {
                      type: "textarea",
                      label: "Message Body",
                      name: "messageBody",
                    },
                  ],
                },
                {
                  name: "diagram",
                  label: "Diagram",
                  fields: [
                    {
                      type: "text",
                      label: "Diagram Heading",
                      name: "diagramHeading",
                    },
                    {
                      type: "textarea",
                      label: "Diagram Description",
                      name: "diagramDescription",
                    },
                    {
                      type: "text",
                      label: "Diagram ID",
                      name: "diagramID",
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
