/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from "react";
import { useTranslation } from 'next-i18next'
import { Dialog, Transition } from "@headlessui/react";

export default function PlayerModal({
  open,
  setOpen,
  players,
  setPlayers,
  setNotification,
}: any) {
  const { t }:any = useTranslation()
  const cancelButtonRef = useRef(null);
  const [nickname, setNickname] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const handleAddPlayer = async () => {
    await setPlayers([nickname, ...players]);
    const playersLocal = localStorage.getItem('players')
    if(playersLocal !== null){
      const playersParse = JSON.parse(playersLocal)
        playersParse.unshift(nickname)
        localStorage.setItem('players', JSON.stringify(playersParse))

    }
    setNickname("");
    setOpen(false);
    setNotification({
      visible: true,
      status: "success",
      message: t('messages:playerAdded'),
    });
  };
  

  
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
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
                <div className="w-full grid grid-cols-1 flex px-4 justify-items-center space-y-4">
                  <div className="mx-auto flex-shrink-0 flex md:col-span-1 items-center justify-center lg:h-12 lg:w-12 w-1/2 h-24 rounded-full bg-dark sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="lg:h-6 lg:w-6 w-1/2 text-slate-200 dark:text-lemon-green"
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

                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <input
                      onChange={(e) => setNickname(e.target.value)}
                      type="text"
                      name=""
                      id=""
                      placeholder={t('common:nickname')}
                      className="w-full h-12 bg-slate-200 dark:bg-dark-green rounded-md p-4 border border-slate-300 dark:border-lemon-green dark:text-lemon-green dark:placeholder:text-lime-600"
                    />
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="transition delay-50 duration-150 bg-slate-200 hover:scale-105 w-full inline-flex justify-center rounded-md border border-slate-300 hover:bg-slate-400 hover:text-slate-100 shadow-sm px-4 py-2 dark:bg-lemon-green text-slate-600 text-base font-medium text-white dark:text-dark-green dark:hover:shadow-lg dark:hover:shadow-light-green sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handleAddPlayer()}
                  disabled={isButtonDisabled}
                >
                  {t('common:create')}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full transition delay-50 duration-150 hover:scale-105 dark:hover:text-lime-100 inline-flex justify-center rounded-md px-4 py-2 text-base font-medium dark:text-lemon-green sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  {t('common:close')}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
