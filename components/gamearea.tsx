import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import CountDown from "./gaming/countdown";
import CurrentPlayer from "./gaming/currentplayer";
import NextTopicButton from "./gaming/nexttopicbutton";
import Notification from "./gaming/notification";
import StopTimeButton from "./gaming/stoptimebutton";
import Topic from "./gaming/topic";
import ResetModal from "./gaming/resetmodal";
import getTopics from "../lib/gettopics";

export default function GameArea({
  players,
  currentTopic,
  setCurrentTopic,
  topics,
  previousTopics,
  setPreviousTopics,
  setTopics,
  setPlayers,
}: any) {
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [gameTime, setGameTime] = useState(0);
  const [paused, setPaused] = useState(true);
  const [resetModal, setResetModal] = useState(false);
  const [resetButtonDisabled, setResetButtonDisabled] = useState(true);
  const [notification, setNotification] = useState({
    visible: false,
    status: "",
    message: "",
  });
  const { t } = useTranslation();
  useEffect(() => {
    if (players.length == 0) {
      setCurrentPlayer("");
      setGameTime(0);
      setPaused(true);
    } else {
      setResetButtonDisabled(false);
    }
  }, [players]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (paused == false && players.length > 1) {
        setGameTime(gameTime + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [gameTime, paused, players]);

  function random(e): any {
    const count = e.length;
    return Math.floor(Math.random() * count);
  }

  function removeTopic(topicId): any {
    setTopics((topics): any => {
      return topics.filter((value, i) => i !== topicId);
    });
    localStorage.setItem("topics", JSON.stringify(topics));
  }

  const handleNextTopic = () => {
    if (players.length > 1) {
      setCurrentPlayer(players[random(players)]); //Set current player
      if (currentTopic !== "") {
        //Check current topic for first time
        //Create previous topic object
        const previousTopic = {
          name: currentTopic,
          time: gameTime,
        };
        setPreviousTopics([previousTopic, ...previousTopics]); //Add previous topic to previousTopics state
        const previousTopicsLocal = previousTopics;
        previousTopicsLocal.unshift(previousTopic);
        localStorage.setItem(
          "previousTopics",
          JSON.stringify(previousTopicsLocal)
        );
      }
      if (topics.length != 0) {
        const topicId = random(topics); //Random topic id
        setCurrentTopic(topics[topicId].name); //Set current topic
        removeTopic(topicId);
        setGameTime(0); //Reset game time
        setPaused(false);
      } else {
        setCurrentTopic("");
        setPaused(true);
        setGameTime(0);
        setNotification({
          visible: true,
          status: "error",
          message: t("messages:topicsFinished"),
        });
      }
    } else {
      setNotification({
        visible: true,
        status: "error",
        message: t("messages:minPlayer"),
      });
    }
  };

  const handleStopTime = () => {
    if (players.length > 1) {
      setCurrentPlayer(players[0]);
      setPaused(!paused);
      if (currentTopic == "") {
        handleNextTopic();
      }
    } else {
      setNotification({
        visible: true,
        status: "error",
        message: t("messages:minPlayer"),
      });
      setPaused(true);
    }
  };

  const handleResetButton = () => {
    setResetModal(true);
  };

  const handleReset = () => {
    const topicsData = getTopics();
    setTopics(topicsData);
    setCurrentTopic("");
    setPreviousTopics([]);
    setPlayers([]);
    setGameTime(0);
    setResetButtonDisabled(true)
    localStorage.setItem("previousTopics", JSON.stringify([]));
    localStorage.setItem("topics", JSON.stringify([]));
    localStorage.setItem("players", JSON.stringify([]));
  };

  return (
    <div className="relative">
      <ResetModal
        resetModal={resetModal}
        setResetModal={setResetModal}
        setNotification={setNotification}
        handleReset={handleReset}
      />
      <Notification
        notification={notification}
        setNotification={setNotification}
      />
      <div className="p-4 bg-slate-200 rounded-md dark:bg-dark-green">
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-4 lg:space-y-0 space-y-4">
          <div className="lg:col-span-2 flex space-x-2 justify-center">
            <CountDown gameTime={gameTime} />
            <CurrentPlayer currentPlayer={currentPlayer} />
          </div>
          <div className="lg:col-span-2 flex justify-end space-x-2 justify-center">
            <div onClick={() => handleStopTime()} className="w-1/2">
              <StopTimeButton paused={paused} currentTopic={currentTopic} />
            </div>
            <div onClick={() => handleNextTopic()} className="w-1/2">
              <NextTopicButton />
            </div>
          </div>
        </div>
        <div>
          <Topic currentTopic={currentTopic} />
        </div>
        {!resetButtonDisabled ? (
          <div className="pt-4 flex justify-end">
            <span
              className="bg-slate-300/50 shadow-lg 
          rounded-full text-slate-600 p-2 border 
          border-slate-300 hover:bg-slate-300/90
          dark:bg-lemon-haze dark:text-dark-green 
          dark:border-lemon-green dark:hover:bg-light-green
          dark:hover:text-lemon-haze"
              onClick={() => handleResetButton()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
