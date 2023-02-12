import { IPreviousTopic, ITopic } from "../interfaces";
import getTopics, { Lang } from "../lib/gettopics";

export function GetLocalPlayers(
  players: string[],
  setPlayers: React.Dispatch<React.SetStateAction<string[]>>
) {
  if (localStorage.getItem("players") !== null) {
    const playersLocal = JSON.parse(localStorage.getItem("players") || "");
    if (playersLocal.length == 0) {
      localStorage.setItem("players", JSON.stringify(players));
    } else {
      setPlayers(playersLocal);
    }
  } else {
    localStorage.setItem("players", JSON.stringify(players));
  }
}

export function GetLocalPreviousTopics(
  previousTopics: IPreviousTopic[],
  setPreviousTopics: React.Dispatch<React.SetStateAction<IPreviousTopic[]>>
) {
  const previousTopicsLocal = localStorage.getItem("previousTopics");
  if (previousTopicsLocal !== null) {
    if (JSON.parse(previousTopicsLocal).length == 0) {
      localStorage.setItem("previousTopics", JSON.stringify(previousTopics));
    } else {
      setPreviousTopics(JSON.parse(previousTopicsLocal));
    }
  }
}

export function GetLocalTopics(
  setTopics: React.Dispatch<React.SetStateAction<ITopic[]>>,
  lang: "tr" | "en"
) {
  const topicsLocal = localStorage.getItem("topics");
  const topicsData = getTopics(lang);
  if (topicsLocal !== null) {
    if (JSON.parse(topicsLocal).length == 0) {
      localStorage.setItem("topics", JSON.stringify(topicsData));
    } else {
      setTopics(JSON.parse(topicsLocal));
    }
  } else {
    setTopics(topicsData);
    localStorage.setItem("topics", JSON.stringify(topicsData));
  }
}
