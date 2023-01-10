import { useTranslation } from "next-i18next";
export default function NextTopicButton() {
  const { t } = useTranslation();
  return (
    <div className="cursor-pointer text-slate-600 hover:text-slate-800 transition delay-50 duration-300 hover:scale-105 hover:bg-slate-300 border-slate-300 hover:border-slate-400 dark:hover:bg-lemon-haze p-4 dark:bg-dark-green dark:text-lemon-green dark:hover:text-dark-green border dark:border-lemon-green shadow-xl rounded-xl h-full flex justify-center items-center">
      <div className="justify-center">
        <div className="flex justify-center">
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
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </div>
        <p className="text-center font-bold">{t("common:nextTopic")}</p>
      </div>
    </div>
  );
}
