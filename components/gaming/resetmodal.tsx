/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import { Dialog, Transition } from "@headlessui/react";
import { useTheme } from "next-themes";
import { Roboto_Mono } from "@next/font/google";
import { GlobalContext } from "../../context/globalContext";

const robotoMono = Roboto_Mono({
  subsets: ["latin", "latin-ext"],
});

export interface Props {
  resetModal: boolean;
  setResetModal: (resetModal: boolean) => void;
  handleReset: void;
}

export default function ResetModal({
  resetModal,
  setResetModal,
  handleReset,
}: any) {
  const { updateNotification } = useContext(GlobalContext);
  const { t } = useTranslation();
  const cancelButtonRef = useRef(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(theme);
  const handleResetButton = async () => {
    handleReset();
    setIsButtonDisabled(true);
    setResetModal(false);
    updateNotification({
      visible: true,
      status: "success",
      message: t("messages:resetSuccess"),
    });
  };

  useEffect(() => {
    setIsButtonDisabled(false);
    setCurrentTheme(theme);
  }, [resetModal, theme]);

  return (
    <Transition.Root show={resetModal} as={Fragment}>
      <Dialog
        as="div"
        className={`${currentTheme} ${robotoMono.className} fixed z-10 inset-0 overflow-y-auto`}
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
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-80 transition-opacity" />
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
            <div className="relative justify-center inline-block align-bottom bg-second rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="w-full block text-third space-y-2">
                  <h2 className="font-bold text-lg">
                    {t("common:resetTitle")}
                  </h2>
                  <h3 className="text-sm">{t("common:resetDescription")}</h3>
                </div>
              </div>
              <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="transition delay-50 duration-150 hover:scale-105 w-full inline-flex justify-center rounded-md border border-third hover:bg-fourth hover:text-white shadow-sm px-4 py-2 bg-second text-third sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handleResetButton()}
                  disabled={isButtonDisabled}
                >
                  {t("common:resetButton")}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full transition delay-50 duration-150 hover:scale-105 hover:text-white inline-flex justify-center rounded-md px-4 py-2 text-third sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
