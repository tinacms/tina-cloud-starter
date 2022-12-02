import * as React from "react";
import { GoCircleSlash } from "react-icons/go";
import * as BoxIcons from "react-icons/bi";
import TinaIconSvg from "../../public/tina.svg";
import { useTheme } from "../layout";
import { Button, TinaField, wrapFieldsWithMeta } from "tinacms";
import { Popover, Transition } from "@headlessui/react";

const IconOptions = {
  Tina: (props) => (
    <svg
      {...props}
      viewBox="0 0 66 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Tina</title>
      <path
        d="M39.4615 36.1782C42.763 33.4475 44.2259 17.3098 45.6551 11.5091C47.0843 5.70828 52.995 6.0025 52.995 6.0025C52.995 6.0025 51.4605 8.67299 52.0864 10.6658C52.7123 12.6587 57 14.4401 57 14.4401L56.0752 16.8781C56.0752 16.8781 54.1441 16.631 52.995 18.9297C51.8459 21.2283 53.7336 43.9882 53.7336 43.9882C53.7336 43.9882 46.8271 57.6106 46.8271 63.3621C46.8271 69.1136 49.5495 73.9338 49.5495 73.9338H45.7293C45.7293 73.9338 40.1252 67.2648 38.9759 63.9318C37.8266 60.5988 38.2861 57.2658 38.2861 57.2658C38.2861 57.2658 32.1946 56.921 26.7931 57.2658C21.3915 57.6106 17.7892 62.2539 17.1391 64.8512C16.4889 67.4486 16.2196 73.9338 16.2196 73.9338H13.1991C11.3606 68.2603 9.90043 66.2269 10.6925 63.3621C12.8866 55.4269 12.4557 50.9263 11.9476 48.9217C11.4396 46.9172 8 45.1676 8 45.1676C9.68492 41.7349 11.4048 40.0854 18.8029 39.9133C26.201 39.7413 36.1599 38.9088 39.4615 36.1782Z"
        fill="currentColor"
      />
      <path
        d="M20.25 63.03C20.25 63.03 21.0305 70.2533 25.1773 73.9342H28.7309C25.1773 69.9085 24.7897 59.415 24.7897 59.415C22.9822 60.0035 20.4799 62.1106 20.25 63.03Z"
        fill="currentColor"
      />
    </svg>
  ),
  ...BoxIcons,
};

const iconColorClass: { [name: string]: { regular: string; circle: string } } =
  {
    blue: {
      regular: "text-blue-400",
      circle: "bg-blue-400 dark:bg-blue-500 text-blue-50",
    },
    teal: {
      regular: "text-teal-400",
      circle: "bg-teal-400 dark:bg-teal-500 text-teal-50",
    },
    green: {
      regular: "text-green-400",
      circle: "bg-green-400 dark:bg-green-500 text-green-50",
    },
    red: {
      regular: "text-red-400",
      circle: "bg-red-400 dark:bg-red-500 text-red-50",
    },
    pink: {
      regular: "text-pink-400",
      circle: "bg-pink-400 dark:bg-pink-500 text-pink-50",
    },
    purple: {
      regular: "text-purple-400",
      circle: "bg-purple-400 dark:bg-purple-500 text-purple-50",
    },
    orange: {
      regular: "text-orange-400",
      circle: "bg-orange-400 dark:bg-orange-500 text-orange-50",
    },
    yellow: {
      regular: "text-yellow-400",
      circle: "bg-yellow-400 dark:bg-yellow-500 text-yellow-50",
    },
    white: {
      regular: "text-white opacity-80",
      circle: "bg-white-400 dark:bg-white-500 text-white-50",
    },
  };

const iconSizeClass = {
  small: "w-8 h-8",
  medium: "w-12 h-12",
  large: "w-14 h-14",
  custom: "",
};

export const Icon = ({
  data,
  parentColor = "",
  className = "",
  tinaField = "",
}) => {
  if (IconOptions[data.name] === null || IconOptions[data.name] === undefined) {
    return null;
  }

  const { name, color, size } = data;

  const theme = useTheme();

  const IconSVG = IconOptions[name];

  const iconSizeClasses = size && iconSizeClass[size];

  const iconColor = color
    ? color === "primary"
      ? theme.color
      : color
    : theme.color;

  if (data.style == "circle") {
    return (
      <div
        data-tinafield={tinaField}
        className={`relative z-10 inline-flex items-center justify-center flex-shrink-0 ${iconSizeClasses} rounded-full ${iconColorClass[iconColor].circle} ${className}`}
      >
        <IconSVG className="w-2/3 h-2/3" />
      </div>
    );
  } else {
    const iconColorClasses =
      iconColorClass[
        parentColor === "primary" &&
        (iconColor === theme.color || iconColor === "primary")
          ? "white"
          : iconColor
      ].regular;
    return (
      <IconSVG
        data-tinafield={tinaField}
        className={`${iconSizeClasses} ${iconColorClasses} ${className}`}
      />
    );
  }
};

const formatFieldLabel = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const parseIconName = (name: string) => {
  const splitName = name.split(/(?=[A-Z])/);
  if (splitName.length > 1) {
    return splitName.slice(1).join(" ");
  } else {
    return name;
  }
};

export const iconSchema: TinaField = {
  type: "object",
  label: "Icon",
  name: "icon",
  fields: [
    {
      type: "string",
      label: "Icon",
      name: "name",
      ui: {
        component: wrapFieldsWithMeta(({ input }) => {
          const [filter, setFilter] = React.useState("");
          const filteredBlocks = React.useMemo(() => {
            return Object.keys(IconOptions).filter((name) => {
              return name.toLowerCase().includes(filter.toLowerCase());
            });
          }, [filter]);

          const inputLabel = Object.keys(IconOptions).includes(input.value)
            ? parseIconName(input.value)
            : "Select Icon";
          const InputIcon = IconOptions[input.value]
            ? IconOptions[input.value]
            : null;

          return (
            <div className="relative z-[1000]">
              <input
                type="text"
                id={input.name}
                className="hidden"
                {...input}
              />
              <Popover>
                {({ open }) => (
                  <>
                    <Popover.Button as={"span"}>
                      <Button
                        className="text-sm h-11 px-4"
                        size="custom"
                        rounded="full"
                        variant={open ? "secondary" : "white"}
                      >
                        {InputIcon && (
                          <InputIcon className="w-7 mr-1 h-auto fill-current text-blue-500" />
                        )}
                        {inputLabel}
                      </Button>
                    </Popover.Button>
                    <div className="absolute w-full -bottom-2 left-0 translate-y-full">
                      <Transition
                        enter="transition duration-150 ease-out"
                        enterFrom="transform opacity-0 -translate-y-2"
                        enterTo="transform opacity-100 translate-y-0"
                        leave="transition duration-75 ease-in"
                        leaveFrom="transform opacity-100 translate-y-0"
                        leaveTo="transform opacity-0 -translate-y-2"
                      >
                        <Popover.Panel className="relative overflow-hidden rounded-lg shadow-lg bg-white border border-gray-150 z-50">
                          {({ close }) => (
                            <div className="min-w-[192px] max-h-[24rem] flex flex-col w-full h-full">
                              <div className="bg-gray-50 p-2 border-b border-gray-100 z-10 shadow-sm">
                                <input
                                  type="text"
                                  className="bg-white text-sm rounded-sm border border-gray-100 shadow-inner py-1.5 px-2.5 w-full block placeholder-gray-200"
                                  onClick={(event: any) => {
                                    event.stopPropagation();
                                    event.preventDefault();
                                  }}
                                  value={filter}
                                  onChange={(event: any) => {
                                    setFilter(event.target.value);
                                  }}
                                  placeholder="Filter..."
                                />
                              </div>
                              {filteredBlocks.length === 0 && (
                                <span className="relative text-center text-xs px-2 py-3 text-gray-300 bg-gray-50 italic">
                                  No matches found
                                </span>
                              )}
                              {filteredBlocks.length > 0 && (
                                <div className="w-full grid grid-cols-6 auto-rows-auto p-2 overflow-y-auto">
                                  <button
                                    className="relative rounded-lg text-center text-xs py-2 px-3 flex-1 outline-none transition-all ease-out duration-150 hover:text-blue-500 focus:text-blue-500 focus:bg-gray-50 hover:bg-gray-50"
                                    key={"clear-input"}
                                    onClick={() => {
                                      input.onChange("");
                                      setFilter("");
                                      close();
                                    }}
                                  >
                                    <GoCircleSlash className="w-6 h-auto text-gray-200" />
                                  </button>
                                  {filteredBlocks.map((name) => {
                                    return (
                                      <button
                                        className="relative rounded-lg text-center text-xs py-2 px-3 flex-1 outline-none transition-all ease-out duration-150 hover:text-blue-500 focus:text-blue-500 focus:bg-gray-50 hover:bg-gray-50"
                                        key={name}
                                        onClick={() => {
                                          input.onChange(name);
                                          setFilter("");
                                          close();
                                        }}
                                      >
                                        <Icon
                                          data={{
                                            name: name,
                                            size: "custom",
                                            color: "blue",
                                          }}
                                          className="w-7 h-auto"
                                        />
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          )}
                        </Popover.Panel>
                      </Transition>
                    </div>
                  </>
                )}
              </Popover>
            </div>
          );
        }),
      },
    },
    {
      type: "string",
      label: "Color",
      name: "color",
      options: Object.keys(iconColorClass).map((color) => ({
        label: formatFieldLabel(color),
        value: color,
      })),
    },
    {
      name: "style",
      label: "Style",
      type: "string",
      options: [
        {
          label: "Circle",
          value: "circle",
        },
        {
          label: "Float",
          value: "float",
        },
      ],
    },
  ],
};
