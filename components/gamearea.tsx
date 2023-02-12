import { useContext, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import CountDown from "./gaming/countdown";
import CurrentPlayer from "./gaming/currentplayer";
import NextTopicButton from "./gaming/nexttopicbutton";
import Notification from "./gaming/notification";
import StopTimeButton from "./gaming/stoptimebutton";
import Topic from "./gaming/topic";
import ResetModal from "./gaming/resetmodal";
import getTopics from "../lib/gettopics";
import { GlobalContext } from "../context/globalContext";
import { useRouter } from "next/router";

export default function GameArea() {
  const {
    updateCurrentPlayer,
    gameTime,
    updateGameTime,
    paused,
    updatePaused,
    currentTopic,
    updateCurrentTopic,
    players,
    topics,
    previousTopics,
    updatePreviousTopics,
    updateTopics,
    updatePlayers,
    updateNotification,
  } = useContext(GlobalContext);

  const [nextTopicButtonDisabled, setNextTopicButtonDisabled] = useState(false);
  const [resetModal, setResetModal] = useState(false);
  const [resetButtonDisabled, setResetButtonDisabled] = useState(true);
  const { t } = useTranslation();
  const {locale} = useRouter();
  const lang: "tr" | "en" = locale == "tr" ? "tr" : "en"

  useEffect(() => {
    if (players.length == 0) {
      updateCurrentPlayer("");
      updateGameTime(0);
      updatePaused(true);
    } else {
      setResetButtonDisabled(false);
    }
  }, [players, updateCurrentPlayer, updateGameTime, updatePaused]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (paused == false && players.length > 1) {
        updateGameTime(gameTime + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [gameTime, paused, players]);

  useEffect(() => {
    if (gameTime < 3) {
      if (paused) {
        setNextTopicButtonDisabled(false);
      } else {
        setNextTopicButtonDisabled(true);
      }
    } else {
      setNextTopicButtonDisabled(false);
    }
  }, [gameTime, nextTopicButtonDisabled, paused]);

  function random(e: number) {
    const count = e;
    return Math.floor(Math.random() * count);
  }

  function removeTopic(topicId: number) {
    let removedTopics = topics.filter(
      (item: unknown, index: number) => index !== topicId
    );
    updateTopics(removedTopics);
    localStorage.setItem("topics", JSON.stringify(topics));
  }

  const handleNextTopic = () => {
    if (nextTopicButtonDisabled) {
      updateNotification({
        visible: true,
        status: "error",
        message: t("messages:minNextTopicTime"),
      });
      return;
    }
    if (players.length > 1) {
      const playersLength = players.length;
      const currentPlayerId = players[random(playersLength)];
      updateCurrentPlayer(currentPlayerId); //Set current player
      if (currentTopic.name !== "") {
        //Check current topic for first time
        //Create previous topic object
        const previousTopic = {
          name: currentTopic.name,
          time: gameTime,
        };
        updatePreviousTopics([previousTopic, ...previousTopics]); //Add previous topic to previousTopics state
        const previousTopicsLocal = previousTopics;
        previousTopicsLocal.unshift(previousTopic);
        localStorage.setItem(
          "previousTopics",
          JSON.stringify(previousTopicsLocal)
        );
      }

      if (topics.length > 0) {
        const topicId = random(topics.length); //Random topic id
        updateCurrentTopic({
          name: topics[topicId].name,
          category: topics[topicId].category}); //Set current topic
        removeTopic(topicId);
        updateGameTime(0); //Reset game time
        updatePaused(false);
      } else {
        updateCurrentTopic({
          name: "",
          category: "",
        });
        updatePaused(true);
        updateGameTime(0);
        updateNotification({
          visible: true,
          status: "error",
          message: t("messages:topicsFinished"),
        });
      }
    } else {
      updateNotification({
        visible: true,
        status: "error",
        message: t("messages:minPlayer"),
      });
    }
  };

  const handleStopTime = () => {
    if (players.length > 1) {
      updatePaused(!paused);
      if (currentTopic.name == "") {
        handleNextTopic();
      }
    } else {
      updateNotification({
        visible: true,
        status: "error",
        message: t("messages:minPlayer"),
      });
      updatePaused(true);
    }
  };

  const handleResetButton = () => {
    setResetModal(true);
  };

  const handleReset = () => {
    const topicsData = getTopics(lang);
    updateTopics(topicsData);
    updateCurrentTopic({
      name: "",
      category: ""
    });
    updatePreviousTopics([]);
    updatePlayers([]);
    updateGameTime(0);
    setResetButtonDisabled(true);
    localStorage.setItem("previousTopics", JSON.stringify([]));
    localStorage.setItem("topics", JSON.stringify([]));
    localStorage.setItem("players", JSON.stringify([]));
  };

  return (
    <div className="relative">
      <ResetModal
        resetModal={resetModal}
        setResetModal={setResetModal}
        handleReset={handleReset}
      />
      <Notification />
      <div className="p-4 bg-second rounded-md">
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-4 lg:space-y-0 space-y-4">
          <div className="lg:col-span-2 flex space-x-2 justify-center">
            <CountDown />
            <CurrentPlayer />
          </div>
          <div className="lg:col-span-2 flex justify-end space-x-2 justify-center">
            <div onClick={() => handleStopTime()} className="w-1/2">
              <StopTimeButton />
            </div>
            <div onClick={() => handleNextTopic()} className="w-1/2">
              <NextTopicButton />
            </div>
          </div>
        </div>
        <div>
          <Topic />
        </div>
        {!resetButtonDisabled ? (
          <div className="pt-4 flex justify-end items-center">
            <p className="text-xs text-fourth">{t("common:resetInfo")}</p>
            <span
              className="bg-third/50 shadow-lg 
          rounded-full text-third p-2 border 
          border-third hover:bg-third hover:text-second"
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
