import type { Collection, Form, TinaCMS } from "tinacms";
import { heroBlockSchema } from "@/components/blocks/hero";
import { contentBlockSchema } from "@/components/blocks/content";
import { testimonialBlockSchema } from "@/components/blocks/testimonial";
import { featureBlockSchema } from "@/components/blocks/features";
import { videoBlockSchema } from "@/components/blocks/video";
import { revalidatePage } from "@/utils/revalidation";

const buildPagePath = (filename: string) => {
  if (filename === "home") {
    return "/";
  }
  return `/${filename}`;
};

const Page: Collection = {
  label: "Pages",
  name: "page",
  path: "content/pages",
  format: "mdx",
  ui: {
    router: ({ document }) =>
      buildPagePath(document._sys.breadcrumbs.join("/")),
    beforeSubmit: async ({
      form,
      values,
    }: {
      form: Form;
      cms: TinaCMS;
      values: Record<string, any>;
    }) => {
      const breadcrumb = form.relativePath
        .replace(`${Page.path}/`, "")
        .replace(`.${Page.format}`, "");
      const path = buildPagePath(breadcrumb);

      // Call the revalidation utility
      await revalidatePage(path);

      return values;
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      description:
        "The title of the page. This is used to display the title in the CMS",
      isTitle: true,
      required: true,
    },
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Sections",
      ui: {
        visualSelector: true,
      },
      templates: [
        heroBlockSchema,
        //@ts-ignore
        featureBlockSchema,
        contentBlockSchema,
        testimonialBlockSchema,
        videoBlockSchema,
      ],
    },
  ],
};

export default Page;
