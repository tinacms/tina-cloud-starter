import React from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useTheme } from "..";

export const RawRenderer = ({ rawData, parentColor }) => {
  const theme = useTheme();
  const buttonColorClasses = {
    blue: "text-blue-500",
    teal: "text-teal-500",
    green: "text-green-500",
    red: "text-red-500",
    pink: "text-pink-500",
    purple: "text-purple-500",
    orange: "text-orange-500",
    yellow: "text-yellow-600",
  };
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className={`focus:shadow-outline relative z-10 mx-3 my-2 flex transform items-center whitespace-nowrap rounded px-5 py-2 text-sm font-semibold opacity-80 shadow-sm shadow-md transition duration-150 ease-out hover:opacity-100 focus:outline-none ${
          buttonColorClasses[theme.color]
        }`}
      >
        View Raw Data
        <span
          className={`absolute left-0 top-0 -z-1 h-full w-full rounded ${
            parentColor === "primary"
              ? `bg-white opacity-80`
              : `bg-current opacity-15`
          }`}
        ></span>
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="flex max-h-screen min-h-screen flex-col items-center justify-center px-4 py-12 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="">
                <Dialog.Overlay className="fixed inset-0 bg-gradient-to-br from-gray-800 to-gray-1000 opacity-80" />
              </div>
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="prose inline-flex max-h-full w-full max-w-3xl flex-1 transform flex-col overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:prose-dark dark:bg-gray-1000">
                <pre className="flex-1 overflow-y-auto">
                  <code>{JSON.stringify(rawData, null, 2)}</code>
                </pre>
                <button
                  type="button"
                  className="flex-0 text-lg font-semibold opacity-80 transition duration-150 ease-out hover:opacity-100"
                  onClick={closeModal}
                >
                  Great, thanks!
                </button>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
