/* This example requires Tailwind CSS v2.0+ */
import React, {
  ChangeEvent,
  Dispatch,
  Fragment,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "next-i18next";
import { Dialog, Transition } from "@headlessui/react";
import { useTheme } from "next-themes";
import { GlobalContext } from "../context/globalContext";
import GetFont from "../hooks/getFont";

export type PlayerModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function PlayerModal({ open, setOpen }: PlayerModalProps) {
  const { t } = useTranslation();
  const { players, updatePlayers, updateNotification } =
    useContext(GlobalContext);
  const robotoMono = GetFont();
  const nicknameRef = useRef<HTMLInputElement>(null);
  const [nickname, setNickname] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [minError, setMinError] = useState(false);
  const { theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(theme);

  useEffect(() => {
    !open ? setMinError(false) : "";
    setCurrentTheme(theme);
  }, [open, theme]);

  const handleMinLength = (e: ChangeEvent<HTMLInputElement>) => {
    if (nicknameRef.current?.value == "") {
      setMinError(true);
      return nicknameRef.current.focus();
    } else {
      setNickname(e.target.value);
      setMinError(false);
    }
  };

  const handleAddPlayer = async () => {
    if (nicknameRef.current?.value == "") {
      setMinError(true);
      return nicknameRef.current.focus();
    } else {
      setMinError(false);
    }
    await updatePlayers([nickname, ...players]);
    const playersLocal = localStorage.getItem("players");
    if (playersLocal !== null) {
      const playersParse = JSON.parse(playersLocal);
      playersParse.unshift(nickname);
      localStorage.setItem("players", JSON.stringify(playersParse));
    }
    setNickname("");
    setOpen(false);
    updateNotification({
      visible: true,
      status: "success",
      message: t("messages:playerAdded"),
    });
  };

  const inputPlaceholder: string = t("common:nickname");

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className={`${currentTheme} ${robotoMono.className} fixed z-10 inset-0 overflow-y-auto`}
        initialFocus={nicknameRef}
        onClose={setOpen}
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
                <div className="w-full grid grid-cols-1 flex px-4 justify-items-center space-y-4">
                  <div className="mx-auto flex-shrink-0 flex md:col-span-1 items-center justify-center lg:h-12 lg:w-12 w-1/2 h-24 rounded-full bg-fourth sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="lg:h-6 lg:w-6 w-1/2 text-third"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      ></path>
                    </svg>
                  </div>

                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full block">
                    <input
                      onChange={(e) => handleMinLength(e)}
                      type="text"
                      id="nickname"
                      required
                      onKeyPress={(e) =>
                        e.key === "Enter" ? handleAddPlayer() : ""
                      }
                      ref={nicknameRef}
                      placeholder={inputPlaceholder}
                      className={`w-full h-12 bg-second
                      rounded-md p-4 border border-third 
                      text-third outline-none focus:ring-2 focus:ring-fourth
                      placeholder:text-third
                      ${
                        minError
                          ? "ring-2 ring-red-500 dark:border-red-500"
                          : ""
                      }
                      `}
                    />
                    {minError ? (
                      <p className="text-sm text-red-500 pt-2">
                        {t("messages:minNicknameLength")}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="transition delay-50 duration-150 bg-second hover:scale-105 w-full inline-flex justify-center rounded-md border border-third hover:bg-fourth hover:text-white shadow-sm px-4 py-2 text-third sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handleAddPlayer()}
                  disabled={isButtonDisabled}
                >
                  {t("common:create")}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full transition delay-50 duration-150 hover:scale-105 dark:hover:text-lime-100 inline-flex justify-center rounded-md px-4 py-2 text-third sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
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
