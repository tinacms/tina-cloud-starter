import React from "react";
import Link from "next/link";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { BsArrowRight } from "react-icons/bs";
import { useTheme } from "../layout";
import format from "date-fns/format";

export const Posts = ({ data }) => {
  const theme = useTheme();
  const titleColorClasses = {
    blue: "group-hover:text-blue-600 dark:group-hover:text-blue-300",
    teal: "group-hover:text-teal-600 dark:group-hover:text-teal-300",
    green: "group-hover:text-green-600 dark:group-hover:text-green-300",
    red: "group-hover:text-red-600 dark:group-hover:text-red-300",
    pink: "group-hover:text-pink-600 dark:group-hover:text-pink-300",
    purple: "group-hover:text-purple-600 dark:group-hover:text-purple-300",
    orange: "group-hover:text-orange-600 dark:group-hover:text-orange-300",
    yellow: "group-hover:text-yellow-500 dark:group-hover:text-yellow-300",
  };

  return (
    <>
      {data.map((postData) => {
        const post = postData.node;
        const date = new Date(post.date);
        let formattedDate = "";
        if (!isNaN(date.getTime())) {
          formattedDate = format(date, "MMM dd, yyyy");
        }
        return (
          <Link
            key={post._sys.filename}
            href={`/posts/` + post._sys.filename}
            passHref
            className="group mb-8 block rounded-md bg-gray-50 bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-10 shadow-sm transition-all duration-150 ease-out last:mb-0 hover:to-gray-50 hover:shadow-md dark:from-gray-900 dark:to-gray-1000 dark:hover:to-gray-800 sm:px-8 md:px-10"
          >
            <h3
              className={`mb-5 font-truculenta text-3xl font-semibold text-gray-700 transition-all duration-150 ease-out dark:text-white lg:text-4xl ${
                titleColorClasses[theme.color]
              }`}
            >
              {post._values.title}{" "}
              <span className="inline-block opacity-0 transition-all duration-300 ease-out group-hover:opacity-100">
                <BsArrowRight className="-mt-1 ml-1 inline-block h-8 w-auto opacity-70" />
              </span>
            </h3>
            <div className="prose mb-5 w-full max-w-none opacity-70 dark:prose-dark">
              <TinaMarkdown content={post._values.excerpt} />
            </div>
            <div className="flex items-center">
              <div className="mr-2 flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full object-cover shadow-sm"
                  src={post?.author?.avatar}
                  alt={post?.author?.name}
                />
              </div>
              <p className="text-base font-medium text-gray-600 group-hover:text-gray-800 dark:text-gray-200 dark:group-hover:text-white">
                {post?.author?.name}
              </p>
              {formattedDate !== "" && (
                <>
                  <span className="mx-2 font-bold text-gray-200 dark:text-gray-500">
                    —
                  </span>
                  <p className="text-base text-gray-400 group-hover:text-gray-500 dark:text-gray-300 dark:group-hover:text-gray-150">
                    {formattedDate}
                  </p>
                </>
              )}
            </div>
          </Link>
        );
      })}
    </>
  );
};
