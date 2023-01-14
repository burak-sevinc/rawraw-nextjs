import { useTranslation } from "next-i18next";
export default function StopTimeButton({ paused, currentTopic }: any) {
  const { t } = useTranslation();
  const PlayIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
        />
      </svg>
    );
  };

  const PauseIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    );
  };

  const FlagIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M3 2.25a.75.75 0 01.75.75v.54l1.838-.46a9.75 9.75 0 016.725.738l.108.054a8.25 8.25 0 005.58.652l3.109-.732a.75.75 0 01.917.81 47.784 47.784 0 00.005 10.337.75.75 0 01-.574.812l-3.114.733a9.75 9.75 0 01-6.594-.77l-.108-.054a8.25 8.25 0 00-5.69-.625l-2.202.55V21a.75.75 0 01-1.5 0V3A.75.75 0 013 2.25z"
          clipRule="evenodd"
        />
      </svg>
    );
  };

  const Button = () => {
    if (currentTopic != "") {
      return (
        <>
          <div className="flex justify-center">
            {paused ? <PlayIcon /> : <PauseIcon />}
          </div>
          <p className="text-center font-bold">
            {paused ? t("common:continue") : t("common:pause")}
          </p>
        </>
      );
    }
    return (
      <>
        <div className="flex justify-center">{<FlagIcon />}</div>
        <p className="text-center font-bold">{t("common:start")}</p>
      </>
    );
  };

  return (
    <div className="cursor-pointer p-4 transition delay-50 duration-300 hover:scale-105 text-third hover:text-second hover:bg-third border-third hover:border-fourth  p-4 border rounded-xl h-full flex justify-center items-center">
      <div className="justify-center">{Button()}</div>
    </div>
  );
}
