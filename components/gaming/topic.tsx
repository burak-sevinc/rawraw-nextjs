import { useTranslation } from "next-i18next";
export default function Topic({currentTopic}:any) {
  const {t} = useTranslation()
  return (
    <div className="col-span-2 p-4 flex text-xl text-third items-center mt-8 border border-third rounded-xl">
      <div className="font-bold">{t("common:topic")}:</div>
      <div className="pl-4 lowercase">{currentTopic}</div>
    </div>
  );
}
