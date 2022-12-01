import * as React from "react";
import * as BoxIcons from "react-icons/bi";
import { useTheme } from "../layout";
import { Button, TinaField } from "tinacms";
import { Popover, Transition } from "@headlessui/react";

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
  if (BoxIcons[data.name] === null || BoxIcons[data.name] === undefined) {
    return null;
  }

  const { name, color, size } = data;

  const theme = useTheme();

  const IconSVG = BoxIcons[name];

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
  return name
    .split(/(?=[A-Z])/)
    .slice(1)
    .join(" ");
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
        component: ({ input }) => {
          const [filter, setFilter] = React.useState("");
          const filteredBlocks = React.useMemo(() => {
            return Object.keys(BoxIcons).filter((name) => {
              return parseIconName(name)
                .toLowerCase()
                .includes(filter.toLowerCase());
            });
          }, [filter]);

          return (
            <div className="mb-4 relative z-[1000]" style={{ zIndex: 1000 }}>
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
                        size="medium"
                        rounded="full"
                        variant={open ? "ghost" : "white"}
                      >
                        <BoxIcons.BiCoffeeTogo className="w-8 h-auto fill-current text-blue-500" />
                      </Button>
                    </Popover.Button>
                    <div className="absolute w-3/4 bottom-1 left-0">
                      <Transition
                        enter="transition duration-150 ease-out"
                        enterFrom="transform opacity-0 -translate-y-2"
                        enterTo="transform opacity-100 translate-y-0"
                        leave="transition duration-75 ease-in"
                        leaveFrom="transform opacity-100 translate-y-0"
                        leaveTo="transform opacity-0 -translate-y-2"
                      >
                        <Popover.Panel className="relative overflow-hidden rounded-lg shadow-lg bg-white border border-gray-100 z-50">
                          {({ close }) => (
                            <div className="min-w-[192px] max-h-[24rem] overflow-y-auto flex flex-col w-full h-full">
                              <div className="sticky top-0 bg-gray-50 p-2 border-b border-gray-100 z-10">
                                <input
                                  type="text"
                                  className="bg-white text-xs rounded-sm border border-gray-100 shadow-inner py-1 px-2 w-full block placeholder-gray-200"
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
                                <div
                                  className="w-full grid grid-cols-6 auto-rows-auto p-1"
                                  style={{
                                    gridTemplateColumns:
                                      "repeat(6, minmax(0, 1fr))",
                                    gridAutoRows: "auto",
                                  }}
                                >
                                  {filteredBlocks.map((name) => {
                                    return (
                                      <button
                                        className="relative rounded-lg text-center text-xs py-2 px-3 flex-1 outline-none transition-all ease-out duration-150 hover:text-blue-500 focus:text-blue-500 focus:bg-gray-50 hover:bg-gray-50"
                                        key={name}
                                        onClick={() => {
                                          alert("boom");
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
                                          className="w-6 h-auto"
                                        />
                                        {/* {parseIconName(name)} */}
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
        },
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
