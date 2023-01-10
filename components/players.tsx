import { useState } from "react";
import Notification from "./gaming/notification";
import PlayerModal from "./playermodal";
import { useTranslation } from 'next-i18next'

export default function Players({ players, setPlayers }: any) {
  const { t } = useTranslation();
  const [notification, setNotification] = useState({visible:false ,status: '', message: ''})
  const [open, setOpen] = useState(false);

  const deletePlayer = (index: any) => {
    const newPlayers = players.filter((_: any, i: number) => i !== index);
    setPlayers(newPlayers)
    setNotification({
      visible: true,
      status: "success",
      message: t('messages:playerRemoved')
    })
    localStorage.setItem('players', JSON.stringify(newPlayers))
  };
  
  return (
    <div className="relative">
      <Notification notification={notification} setNotification={setNotification} />
      <PlayerModal
        open={open}
        setOpen={setOpen}
        players={players}
        setPlayers={setPlayers}
        setNotification={setNotification}
      />
      <div className="bg-slate-200 dark:bg-dark-green rounded-md relative h-auto overflow-hidden">
        <div className="absolute top-0 left-0 right-0 px-4 py-3 flex items-center font-semibold text-lg dark:shadow-xl text-slate-900 dark:text-lemon-green dark:bg-opacity-20 bg-slate-300/90 dark:bg-dark-green backdrop-blur-sm">
          <h1 className="text-xl dark:text-lemon-green font-bold pb-4">{t('common:players')}</h1>
          <div
            onClick={() => setOpen(!open)}
            className="cursor-pointer transition delay-50 duration-200 ease-in-out hover:scale-125 shadow-xl ml-auto border dark:border-lemon-green border border-slate-300 bg-slate-green group hover:bg-light-green hover:border-0 rounded-full w-8 h-8 flex justify-center items-center"
          >
            <svg
              className="w-4 h-4 text-slate-600 dark:text-lemon-green group-hover:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              ></path>
            </svg>
          </div>
        </div>
        <div className="overflow-auto scrollbar dark:scrollbar-thumb-lime-700 dark:scrollbar-track-lime-900 scrollbar-thumb-slate-400 scrollbar-track-slate-300 scrollbar-thin flex flex-col divide-y lg:max-h-[35.5rem] xl:max-h-[34rem] max-h-[12rem] dark:divide-slate-200/10 divide-slate-300/70 pt-16">
          {players.map((item: any, index: number) => (
            <div
              key={index}
              className="text-sm flex justify-between p-4 space-x-2"
            >
              <div className="flex dark:text-lemon-green items-center space-x-2">
                <span>
                  <svg
                    className="w-6 h-6 text-slate-500 dark:text-lemon-green"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </span>
                <h3 className="ml-1 font-semibold">{item}</h3>
              </div>
              <div
                className="cursor-pointer mr-2 dark:text-lemon-green dark:hover:text-dark-green hover:text-red-500 hover:bg-slate-300 dark:hover:bg-lemon-green dark:hover:text-dark-green w-6 h-6 flex items-center justify-center rounded-full"
                onClick={() => deletePlayer(index)}
              >
                <svg
                  className="w-4 h-4"
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
