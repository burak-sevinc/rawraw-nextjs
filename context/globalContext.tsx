import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  GetLocalPlayers,
  GetLocalPreviousTopics,
  GetLocalTopics,
} from "../hooks/getLocalData";
import { IAvatar, INotification, IPreviousTopic, ITopic } from "../interfaces";

export type GlobalContextType = {
  players: string[];
  updatePlayers: (players: string[]) => void;
  deletePlayer: (index: number) => void;
  topics: ITopic[];
  updateTopics: (topics: ITopic[]) => void;
  currentTopic: string;
  updateCurrentTopic: (topic: string) => void;
  previousTopics: IPreviousTopic[];
  updatePreviousTopics: (previousTopics: IPreviousTopic[]) => void;
  currentPlayer: string;
  updateCurrentPlayer: (currentPlayer: string) => void;
  notification: INotification;
  updateNotification: (notification: INotification) => void;
  avatar: IAvatar;
  updateAvatar: ({ bgColor, textColor }: IAvatar) => void;
  paused: boolean;
  updatePaused: (paused: boolean) => void;
  gameTime: number;
  updateGameTime: (gameTime: number) => void;
};

export type GlobalContextProps = {
  children?: any;
};

const globalContextValues = {
  players: [""],
  currentPlayer: "",
  topics: [],
  currentTopic: "",
  previousTopics: [],
  avatar: { bgColor: "", textColor: "" },
  paused: true,
  gameTime: 0,
  notification: { visible: false },
  updatePreviousTopics: () => {},
  updateTopics: () => {},
  updatePaused: () => {},
  updateGameTime: () => {},
  updateCurrentPlayer: () => {},
  updatePlayers: () => {},
  updateCurrentTopic: () => {},
  updateAvatar: () => {},
  updateNotification: () => {},
  deletePlayer: () => {},
};
export const GlobalContext =
  React.createContext<GlobalContextType>(globalContextValues);

export const useGlobalContext = () => {
  useContext(GlobalContext);
};

const GlobalContextProvider = ({ children }: GlobalContextProps) => {
  const [players, setPlayers] = useState<string[]>([""]);
  const [gameTime, setGameTime] = useState<number>(0);
  const [previousTopics, setPreviousTopics] = useState<IPreviousTopic[]>([]);
  const [topics, setTopics] = useState<ITopic[]>([]);
  const [paused, setPaused] = useState<boolean>(true);
  const [currentTopic, setCurrentTopic] = useState<string>("");
  const [currentPlayer, setCurrentPlayer] = useState<string>("");
  const [notification, setNotification] = useState<INotification>({
    visible: false,
  });
  const [avatar, setAvatar] = useState({
    bgColor: "",
    textColor: "",
  });

  const { t } = useTranslation();

  const updatePreviousTopics = (previousTopics: IPreviousTopic[]) => {
    setPreviousTopics(previousTopics);
  };
  const updatePaused = (paused: boolean) => {
    setPaused(paused);
  };
  const updateTopics = (topics: ITopic[]) => {
    setTopics(topics);
  };
  const updatePlayers = (players: string[]) => {
    setPlayers(players);
  };

  const updateGameTime = (gameTime: number) => {
    setGameTime(gameTime);
  };

  const deletePlayer = (index: number) => {
    const newPlayers = players.filter((_: any, i: number) => i !== index);
    updatePlayers(newPlayers);
    updateNotification({
      visible: true,
      status: "success",
      message: t("messages:playerRemoved"),
    });
    localStorage.setItem("players", JSON.stringify(newPlayers));
  };

  const updateCurrentTopic = (topic: string) => {
    setCurrentTopic(topic);
  };
  const updateCurrentPlayer = (currentPlayer: string) => {
    setCurrentPlayer(currentPlayer);
  };

  const updateAvatar = ({ bgColor, textColor }: IAvatar) => {
    setAvatar({ bgColor: bgColor, textColor: textColor });
  };
  const updateNotification = ({ visible, status, message }: INotification) => {
    setNotification({ visible: visible, status: status, message: message });
  };

  useEffect(() => {
    GetLocalPlayers(players, setPlayers);
    GetLocalPreviousTopics(previousTopics, setPreviousTopics);
    GetLocalTopics(setTopics);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        players,
        currentPlayer,
        updatePlayers,
        deletePlayer,
        updateCurrentPlayer,
        paused,
        updatePaused,
        topics,
        currentTopic,
        updateTopics,
        updateCurrentTopic,
        previousTopics,
        updatePreviousTopics,
        avatar,
        updateAvatar,
        notification,
        updateNotification,
        gameTime,
        updateGameTime,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
