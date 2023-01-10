import { useEffect, useState } from "react";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import GameArea from "../components/gamearea";
import PreviousTopics from "../components/gaming/previoustopics";
import Players from "../components/players";
import getTopics from "../lib/gettopics";

function Home(_props: InferGetStaticPropsType<typeof getStaticProps>) {
  const [topics, setTopics]: any = useState([]);
  const [currentTopic, setCurrentTopic] = useState("");
  const [players, setPlayers] = useState([]);
  const [previousTopics, setPreviousTopics] = useState([]);
  const { t } = useTranslation("common");

  useEffect(() => {
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

    const previousTopicsLocal = localStorage.getItem("previousTopics");
    if (previousTopicsLocal !== null) {
      if (JSON.parse(previousTopicsLocal).length == 0) {
        localStorage.setItem("previousTopics", JSON.stringify(previousTopics));
      } else {
        setPreviousTopics(JSON.parse(previousTopicsLocal));
      }
    }

    const topicsLocal = localStorage.getItem("topics");
    const topicsData = getTopics();
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
  }, []);

  return (
    <>
      <div className="lg:grid-rows-2 rounded-xl shadow-2xl dark:shadow-dark-green border border-slate-200 dark:border-lemon-green bg-gray-100 dark:bg-dark grid lg:grid-cols-4 grid-cols-1 mt-8 md:mx-12 mx-4 lg:mx-44 xl:mx-64 lg:space-x-4 lg:space-y-0 space-y-4 p-4">
        <div className="lg:col-span-1 lg:row-span-2 col-span-1 space-y-4">
          <Players players={players} setPlayers={setPlayers} />
        </div>
        <div className="lg:col-span-3 lg:row-span-2 col-span-1 space-y-4">
          <GameArea
            players={players}
            topics={topics}
            currentTopic={currentTopic}
            setCurrentTopic={setCurrentTopic}
            setPreviousTopics={setPreviousTopics}
            previousTopics={previousTopics}
            setTopics={setTopics}
            setPlayers={setPlayers}
          />
          <PreviousTopics previousTopics={previousTopics} />
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common", "messages"])),
  },
});

export default Home;
