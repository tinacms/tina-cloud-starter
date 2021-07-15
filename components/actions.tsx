import * as React from "react";
import { BiRightArrowAlt } from "react-icons/bi";

export const Actions = ({ color = "default", className = "", actions }) => {
  return (
    <div className={`flex flex-wrap items-center -mx-3 -my-2 ${className}`}>
      {actions &&
        actions.map(function (action, index) {
          let element = null;
          if (action.type === "button") {
            element = (
              <button
                key={index}
                className={`z-10 relative flex items-center px-7 py-3 mx-3 my-2 font-semibold text-lg transition duration-150 ease-out text-white rounded transform bg-blue-500 hover:bg-blue-600 bg-gradient-to-r from-blue-400 to-blue-600 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 whitespace-nowrap`}
              >
                {action.label}
                {action.icon && (
                  <BiRightArrowAlt
                    className={`ml-1 -mr-1 w-6 h-6 text-blue-50`}
                  />
                )}
              </button>
            );
          }
          if (action.type === "link" || action.type === "linkExternal") {
            element = (
              <a
                key={index}
                href="#"
                className={`group inline-flex items-center font-semibold mx-3 my-2 text-lg transition duration-150 ease-out ${
                  color === "primary"
                    ? `text-white  hover:text-blue-100`
                    : `text-blue-600  hover:text-blue-400`
                }`}
                style={{
                  textShadow: `0 3px 7px rgba(var(--color-rgb-blue-400),0.2)`,
                }}
              >
                {action.label}
                {action.icon && (
                  <BiRightArrowAlt
                    className={`ml-0 mr-0 w-6 h-6 ${
                      color === "primary"
                        ? `text-blue-100  group-hover:text-blue-200`
                        : `text-blue-500  group-hover:text-blue-300`
                    }`}
                  />
                )}
              </a>
            );
          }
          return element;
        })}
    </div>
  );
};
