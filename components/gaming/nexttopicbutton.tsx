import { useTranslation } from "next-i18next";
export default function NextTopicButton() {
  const { t } = useTranslation();
  return (
    <div className="cursor-pointer transition delay-50 duration-300 hover:scale-105 text-third hover:text-second hover:bg-third border-third hover:border-fourth p-4 border rounded-xl h-full flex justify-center items-center">
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
