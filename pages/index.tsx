import { useEffect, useState } from "react";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import GameArea from "../components/gamearea";
import PreviousTopics from "../components/gaming/previoustopics";
import Players from "../components/players";
import getTopics from "../lib/gettopics";
import Head from "next/head";
import { useTheme } from "next-themes";

function Home(_props: InferGetStaticPropsType<typeof getStaticProps>) {
  const [isLoading, setIsLoading] = useState(true);
  const [topics, setTopics]: any = useState([]);
  const [currentTopic, setCurrentTopic] = useState("");
  const [players, setPlayers] = useState([]);
  const [previousTopics, setPreviousTopics] = useState([]);
  const { t } = useTranslation("common");

  useEffect(() => {
    setIsLoading(false)
  }, []);

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-44">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
    <Head>
    <title>Rawraw Game</title>
    <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
    <div className="pb-12 md:pb-8 lg:pb-0">

      <div className="lg:grid-rows-2 rounded-xl shadow-2xl shadow-second border border-third bg-fifth grid lg:grid-cols-4 grid-cols-1 md:mx-12 mx-4 lg:mx-44 xl:mx-64 lg:space-x-4 lg:space-y-0 space-y-4 p-4">
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
