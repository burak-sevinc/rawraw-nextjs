import { useTranslation } from "next-i18next";
import { useContext } from "react";
import { GlobalContext } from "../../context/globalContext";

export default function Topic() {
  const { currentTopic } = useContext(GlobalContext);
  const { t } = useTranslation();
  return (
    <div className="col-span-2 p-4 flex text-xl text-third items-center mt-8 border border-third rounded-xl">
      <div className="font-bold">{t("common:topic")}:</div>
      <div className="pl-4 flex">
        {currentTopic.name}
        <div className="ml-2 bg-third text-first text-xs flex items-center px-2 rounded-lg">{currentTopic.category}</div>
      </div>
    </div>
  );
}
