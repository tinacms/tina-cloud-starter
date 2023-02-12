import * as React from "react";
import { GoCircleSlash } from "react-icons/go";
import { Button, wrapFieldsWithMeta } from "tinacms";
import { Popover, Transition } from "@headlessui/react";
import { Icon, IconOptions } from "../util/icon";
import { BiChevronRight } from "react-icons/bi";

const parseIconName = (name: string) => {
  const splitName = name.split(/(?=[A-Z])/);
  if (splitName.length > 1) {
    return splitName.slice(1).join(" ");
  } else {
    return name;
  }
};

export const IconPickerInput = wrapFieldsWithMeta(({ input }) => {
  const [filter, setFilter] = React.useState("");
  const filteredBlocks = React.useMemo(() => {
    return Object.keys(IconOptions).filter((name) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    });
  }, [filter]);

  const inputLabel = Object.keys(IconOptions).includes(input.value)
    ? parseIconName(input.value)
    : "Select Icon";
  const InputIcon = IconOptions[input.value] ? IconOptions[input.value] : null;

  return (
    <div className="relative z-[1000]">
      <input type="text" id={input.name} className="hidden" {...input} />
      <Popover>
        {({ open }) => (
          <>
            <Popover.Button as={"span"}>
              <Button
                className={`h-11 px-4 text-sm ${InputIcon ? "h-11" : "h-10"}`}
                size="custom"
                rounded="full"
                variant={open ? "secondary" : "white"}
              >
                {InputIcon && (
                  <InputIcon className="mr-1 h-auto w-7 fill-current text-blue-500" />
                )}
                {inputLabel}
                {!InputIcon && (
                  <BiChevronRight className="ml-1 h-auto w-5 fill-current opacity-70" />
                )}
              </Button>
            </Popover.Button>
            <div className="absolute -bottom-2 left-0 w-full min-w-[192px] max-w-2xl translate-y-full">
              <Transition
                enter="transition duration-150 ease-out"
                enterFrom="transform opacity-0 -translate-y-2"
                enterTo="transform opacity-100 translate-y-0"
                leave="transition duration-75 ease-in"
                leaveFrom="transform opacity-100 translate-y-0"
                leaveTo="transform opacity-0 -translate-y-2"
              >
                <Popover.Panel className="relative z-50 overflow-hidden rounded-lg border border-gray-150 bg-white shadow-lg">
                  {({ close }) => (
                    <div className="flex h-full max-h-[24rem] w-full flex-col">
                      <div className="z-10 border-b border-gray-100 bg-gray-50 p-2 shadow-sm">
                        <input
                          type="text"
                          className="block w-full rounded-sm border border-gray-100 bg-white py-1.5 px-2.5 text-sm placeholder-gray-200 shadow-inner"
                          onClick={(event) => {
                            event.stopPropagation();
                            event.preventDefault();
                          }}
                          value={filter}
                          onChange={(event) => {
                            setFilter(event.target.value);
                          }}
                          placeholder="Filter..."
                        />
                      </div>
                      {filteredBlocks.length === 0 && (
                        <span className="relative bg-gray-50 px-2 py-3 text-center text-xs italic text-gray-300">
                          No matches found
                        </span>
                      )}
                      {filteredBlocks.length > 0 && (
                        <div className="grid w-full auto-rows-auto grid-cols-6 overflow-y-auto p-2">
                          <button
                            className="relative flex-1 rounded-lg py-2 px-3 text-center text-xs outline-none transition-all duration-150 ease-out hover:bg-gray-50 hover:text-blue-500 focus:bg-gray-50 focus:text-blue-500"
                            key={"clear-input"}
                            onClick={() => {
                              input.onChange("");
                              setFilter("");
                              close();
                            }}
                          >
                            <GoCircleSlash className="h-auto w-6 text-gray-200" />
                          </button>
                          {filteredBlocks.map((name) => {
                            return (
                              <button
                                className="relative flex flex-1 items-center justify-center rounded-lg py-2 px-3 text-center text-xs outline-none transition-all duration-150 ease-out hover:bg-gray-50 hover:text-blue-500 focus:bg-gray-50 focus:text-blue-500"
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
                                  className="h-auto w-7"
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
});
