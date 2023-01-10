import { useTranslation } from "next-i18next";
export default function Topic({currentTopic}:any) {
  const {t} = useTranslation()
  return (
    <div className="col-span-2 p-4 flex text-xl dark:text-lime-100 items-center mt-8 border border-slate-300 dark:border-lemon-green rounded-xl shadow-xl">
      <div className="font-bold">{t("common:topic")}:</div>
      <div className="pl-4 lowercase">{currentTopic}</div>
    </div>
  );
}
