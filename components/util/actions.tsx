import Link from "next/link";
import * as React from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { useTheme } from "../layout";

export const Actions = ({
  parentColor = "default",
  parentField = "",
  className = "",
  actions,
}) => {
  const theme = useTheme();
  const buttonColorClasses = {
    blue: "text-white bg-blue-500 hover:bg-blue-600",
    teal: "text-white bg-teal-500 hover:bg-teal-600",
    green: "text-white bg-green-500 hover:bg-green-600",
    red: "text-white bg-red-500 hover:bg-red-600",
    pink: "text-white bg-pink-500 hover:bg-pink-600",
    purple: "text-white bg-purple-500 hover:bg-purple-600",
    orange: "text-white bg-orange-500 hover:bg-orange-600",
    yellow: "text-gray-800 bg-yellow-500 hover:bg-yellow-600",
  };

  const invertedButtonColorClasses = {
    blue: "text-blue-500 bg-white hover:bg-gray-50",
    teal: "text-teal-500 bg-white hover:bg-gray-50",
    green: "text-green-500 bg-white hover:bg-gray-50",
    red: "text-red-500 bg-white hover:bg-gray-50",
    pink: "text-pink-500 bg-white hover:bg-gray-50",
    purple: "text-purple-500 bg-white hover:bg-gray-50",
    orange: "text-orange-500 bg-white hover:bg-gray-50",
    yellow: "text-yellow-500 bg-white hover:bg-gray-50",
  };

  const linkButtonColorClasses = {
    blue: "text-blue-600 dark:text-blue-400 hover:text-blue-400 dark:hover:text-blue-200",
    teal: "ttext-teal-600 dark:text-teal-400 hover:text-teal-400 dark:hover:text-teal-200",
    green:
      "text-green-600 dark:text-green-400 hover:text-green-400 dark:hover:text-green-200",
    red: "text-red-600 dark:text-red-400 hover:text-red-400 dark:hover:text-red-200",
    pink: "text-pink-600 dark:text-pink-400 hover:text-pink-400 dark:hover:text-pink-200",
    purple:
      "text-purple-600 dark:text-purple-400 hover:text-purple-400 dark:hover:text-purple-200",
    orange:
      "text-orange-600 dark:text-orange-400 hover:text-orange-400 dark:hover:text-orange-200",
    yellow:
      "text-yellow-600 dark:text-yellow-400 hover:text-yellow-400 dark:hover:text-yellow-200",
  };

  return (
    <div className={`flex flex-wrap items-center gap-y-4 gap-x-6 ${className}`}>
      {actions &&
        actions.map(function (action, index) {
          let element = null;
          if (action.type === "button") {
            element = (
              <Link
                key={index}
                href={action.link ? action.link : "/"}
                legacyBehavior
              >
                <button
                  data-tinafield={`${parentField}.${index}`}
                  className={`focus:shadow-outline relative z-10 flex transform items-center whitespace-nowrap rounded-lg px-7 py-3 text-lg  font-semibold ring-offset-2 ring-offset-current transition duration-150 ease-out focus:outline-none focus:ring-2 ${
                    parentColor === "primary"
                      ? invertedButtonColorClasses[theme.color]
                      : buttonColorClasses[theme.color]
                  }`}
                >
                  {action.label}
                  {action.icon && (
                    <BiRightArrowAlt
                      className={`ml-1 -mr-1 h-6 w-6 opacity-80`}
                    />
                  )}
                </button>
              </Link>
            );
          }
          if (action.type === "link" || action.type === "linkExternal") {
            element = (
              <Link
                key={index}
                href={action.link ? action.link : "/"}
                passHref
                data-tinafield={`${parentField}.${index}`}
                className={`group inline-flex items-center text-lg font-semibold transition duration-150 ease-out ${
                  parentColor === "primary"
                    ? `text-white  hover:text-gray-50`
                    : linkButtonColorClasses[theme.color]
                }`}
                style={{
                  textShadow: `0 3px 7px rgba(var(--color-rgb-blue-400),0.2)`,
                }}
              >
                {action.label}
                {action.icon && (
                  <BiRightArrowAlt className={`ml-0 mr-0 h-6 w-6 opacity-80`} />
                )}
              </Link>
            );
          }
          return element;
        })}
    </div>
  );
};
