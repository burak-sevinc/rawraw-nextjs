import moment from "moment";
import "moment-duration-format";
import { useTranslation } from "next-i18next";
import { useContext } from "react";
import { GlobalContext } from "../../context/globalContext";
import GetFont from "../../hooks/getFont";

export default function PreviousTopics() {
  const font = GetFont()
  const { previousTopics } = useContext(GlobalContext);
  const { t } = useTranslation();
  const duration = (second: number) => {
    const result = moment
      .duration(second, "seconds")
      .format(`m [${t("common:min")}] s [${t("common:sec")}]`, {
        usePlural: true,
      });
    return result;
  };

  return (
    <div className="w-full">
      <div className="relative rounded-md mx-auto bg-second h-auto overflow-hidden">
        <div className={`${font.className} absolute top-0 left-0 right-0 px-4 py-3 flex items-center font-semibold text-lg text-third bg-opacity-20 bg-second/90 backdrop-blur-lg shadow-lg shadow-second`}>
          {t("previousTopics")}
        </div>
        <div className="overflow-auto scrollbar scrollbar-thumb-thumb-color scrollbar-track-track-color scrollbar-thin flex flex-col divide-y divide-fourth h-80  pt-14">
          {previousTopics.map((item: any, index: number) => (
            <div key={index} className="grid grid-cols-4 items-center gap-4">
                <h3 className="text-xs col-span-1 w-full p-2 m-2 text-center bg-third text-second rounded-lg items-center justify-center flex">
                  {duration(item.time)}
                </h3>
                <h3 className="text-third col-span-3 ml-1 p-2 lowercase">{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
