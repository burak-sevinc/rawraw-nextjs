/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";

export default function Notification({ notification, setNotification }: any) {

  useEffect(() => {
    const timer = setTimeout(
      () =>
        setNotification({
          visible: false,
          status: "",
          message: ""
        }),
      2000
    );
    return () => clearTimeout(timer);
  },[notification, setNotification]);
  const checkCircleIcon = () => {
    return (
      <svg
        className="h-6 w-6 text-dark-green"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    );
  };
  const xCircleIcon = () => {
    return (
      <svg
        className="w-6 h-6 text-red-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    );
  };

  const icon = (notification: any) => {
    if (notification.status == "success") {
      return checkCircleIcon();
    } else if (notification.status == "error") {
      return xCircleIcon();
    }
  };
  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="fixed z-10 inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={notification.visible}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="max-w-sm w-full bg-second rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">{icon(notification)}</div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-third">
                      {notification.message}
                    </p>
                    {/* <p className="mt-1 text-sm text-gray-500">
                      Anyone with a link can now view this file.
                    </p> */}
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <button
                      className="inline-flex text-fourth hover:text-third transition delay-50 duration-200 hover:scale-105"
                      onClick={() => {
                        setNotification({
                          visible: false,
                        });
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
