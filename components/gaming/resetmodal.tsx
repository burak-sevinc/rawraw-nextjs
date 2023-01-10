/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import { Dialog, Transition } from "@headlessui/react";

export default function ResetModal({
  resetModal,
  setResetModal,
  setNotification,
  handleReset,
}: any) {
  const { t } = useTranslation();
  const cancelButtonRef = useRef(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const handleResetButton = async () => {
    handleReset();
    setIsButtonDisabled(true);
    setResetModal(false);
    setNotification({
      visible: true,
      status: "success",
      message: t("messages:resetSuccess"),
    });
  };

  useEffect(() => {
    setIsButtonDisabled(false);
  }, [resetModal]);

  return (
    <Transition.Root show={resetModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setResetModal}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-dark bg-opacity-80 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative justify-center inline-block align-bottom bg-white dark:bg-dark-green rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="w-full block text-slate-600 dark:text-lemon-haze space-y-2">
                  <h2 className="font-bold text-lg">
                    {t("common:resetTitle")}
                  </h2>
                  <h3 className="text-sm">{t("common:resetDescription")}</h3>
                </div>
              </div>
              <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="transition delay-50 duration-150 bg-slate-200 hover:scale-105 w-full inline-flex justify-center rounded-md border border-slate-300 hover:bg-slate-400 hover:text-slate-100 shadow-sm px-4 py-2 dark:bg-lemon-green text-slate-600 text-base font-medium text-white dark:text-dark-green dark:hover:shadow-lg dark:hover:shadow-light-green sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handleResetButton()}
                  disabled={isButtonDisabled}
                >
                  {t("common:resetButton")}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full transition delay-50 duration-150 hover:scale-105 dark:hover:text-lime-100 inline-flex justify-center rounded-md px-4 py-2 text-base font-medium dark:text-lemon-green sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setResetModal(false)}
                  ref={cancelButtonRef}
                >
                  {t("common:close")}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
