import Link from "next/link";
import Markdown from "react-markdown";
import { BsArrowRight } from "react-icons/bs";

export const Posts = ({ data }) => {
  return (
    <>
      {data.map((postData) => {
        const post = postData.node;
        return (
          <Link
            key={post.sys.filename}
            href={`/posts/` + post.sys.filename}
            passHref
          >
            <a
              key={post.id}
              className="group block px-8 py-10 mb-8 last:mb-0 bg-gray-50 bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-gray-700 dark:from-gray-800 dark:to-gray-700 rounded-md shadow-sm transition-all duration-150 ease-out hover:shadow-md hover:to-gray-50 dark:hover:to-gray-600"
            >
              <h3 className="text-gray-900 dark:text-white text-3xl font-semibold title-font mb-5 transition-all duration-150 ease-out group-hover:text-blue-600 dark:group-hover:text-blue-300">
                {post.values.title}{" "}
                <span className="inline-block opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                  <BsArrowRight className="inline-block h-8 -mt-1 ml-1 w-auto opacity-70" />
                </span>
              </h3>
              <div className="prose dark:prose-dark prose-lg w-full max-w-none mb-5">
                <Markdown>{post.values.excerpt}</Markdown>
              </div>
              <div className="flex items-center -mb-2">
                <div className="flex-shrink-0 mr-2">
                  <img
                    className="h-10 w-10 rounded-full shadow-sm"
                    src={post.data.author.data.avatar}
                    alt={post.data.author.data.name}
                  />
                </div>
                <p className="text-sm font-medium text-gray-600 group-hover:text-gray-800 dark:text-gray-200 dark:group-hover:text-white">
                  {post.data.author.data.name}
                </p>
                <span className="font-bold text-gray-200 dark:text-gray-500 mx-2">
                  —
                </span>
                <p className="text-sm text-gray-400 group-hover:text-gray-500 dark:text-gray-300 dark:group-hover:text-gray-150">
                  {post.values.date}
                </p>
              </div>
            </a>
          </Link>
        );
      })}
    </>
  );
};
