import { useEffect, useState } from "react";
import Notification from "./gaming/notification";
import PlayerModal from "./playermodal";
import { useTranslation } from 'next-i18next'
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Players({ players, setPlayers }: any) {
  const { t } = useTranslation();
  const [notification, setNotification] = useState({visible:false ,status: '', message: ''})
  const [open, setOpen] = useState(false);
  const {theme} = useTheme()
  const [avatarBgColor, setAvatarBgColor] = useState("")
  const [avatarTextColor, setAvatarTextColor] = useState("")

  useEffect(() => {
    if(theme == "light"){
      setAvatarBgColor("354244")
      setAvatarTextColor("c8d4d7")
    }else if(theme == "dark"){
      setAvatarBgColor("FFE77AFF")
      setAvatarTextColor("1E5128")
    }else if(theme == "psy"){
      setAvatarBgColor("3A2170")
      setAvatarTextColor("DE4959")
    }
  }, [theme])
  
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


  const avatarUrl = (name: string, avatarBgColor: string, avatarTextColor: string) => `https://ui-avatars.com/api/?name=${name}&length=2&bold=true&rounded=true&format=svg&background=${avatarBgColor}&color=${avatarTextColor}`
  
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
      <div className="bg-second rounded-md relative h-auto overflow-hidden">
        <div className="absolute top-0 left-0 right-0 px-4 py-3 flex items-center font-semibold text-lg shadow-second shadow-lg bg-opacity-20 bg-second/90 backdrop-blur-lg">
          <h1 className="text-xl text-third font-bold pb-4">{t('common:players')}</h1>
          <div
            onClick={() => setOpen(!open)}
            className="cursor-pointer transition delay-50 duration-200 ease-in-out hover:scale-125 ml-auto border border-third group hover:bg-fourth hover:border-0 rounded-full w-8 h-8 flex justify-center items-center"
          >
            <svg
              className="w-4 h-4 text-third group-hover:text-third"
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
        <div className="overflow-auto scrollbar scrollbar-thumb-thumb-color scrollbar-track-track-color scrollbar-thin flex flex-col divide-y lg:max-h-[38.5rem] xl:max-h-[38.5rem] max-h-[12rem] divide-fourth pt-16">
          {players.map((item: any, index: number) => (
            <div
              key={index}
              className="text-sm flex justify-between p-4 space-x-2"
            >
              <div className="flex dark:text-lemon-green items-center space-x-2">
                <span>
                  <Image src={avatarUrl(item, avatarBgColor, avatarTextColor)} width={30} height={30} alt={item} className="rounded-full" />
                </span>
                <h3 className="ml-1 font-semibold text-third">{item}</h3>
              </div>
              <div
                className="cursor-pointer mr-2 text-fourth hover:text-second hover:bg-third dark:hover:bg-lemon-green dark:hover:text-dark-green w-6 h-6 flex items-center justify-center rounded-full"
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
