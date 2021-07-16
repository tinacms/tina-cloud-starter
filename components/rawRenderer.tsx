import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export const RawRenderer = ({ rawData, color = "" }) => {
  let [isOpen, setIsOpen] = useState(false);

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
        className={`z-10 relative flex items-center px-5 py-2 mx-3 my-2 font-semibold shadow-sm text-base transition duration-150 ease-out rounded transform focus:shadow-outline focus:outline-none whitespace-nowrap text-blue-500 dark:text-white bg-gradient-to-r from-gray-100 to-gray-150 dark:from-gray-800 dark:to-gray-700 opacity-80 hover:opacity-100`}
      >
        View Raw Data
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen max-h-screen px-4 py-12 text-center flex flex-col items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gradient-to-br from-gray-800 to-gray-1000 opacity-80" />
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
              <div className="flex-1 w-full prose dark:prose-dark max-w-3xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-1000 shadow-xl rounded-xl inline-flex flex-col max-h-full">
                <pre className="flex-1 overflow-y-auto">
                  <code>{JSON.stringify(rawData, null, 2)}</code>
                </pre>
                <button
                  type="button"
                  className="flex-0 font-semibold text-lg transition duration-150 ease-out opacity-80 hover:opacity-100"
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
