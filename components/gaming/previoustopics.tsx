import moment from "moment";
import 'moment-duration-format';
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";



export default function PreviousTopics({ previousTopics }: any) {
  const {t} = useTranslation()
  const {locale} = useRouter()
  
  const duration = (second: number) => {
    const result = moment.duration(second, 'seconds').format(`m [${t('common:min')}] s [${t('common:sec')}]`, {
      usePlural: true,
    });
    return result;
  }
  return (
    <div className="w-full">

    <div className="relative rounded-md mx-auto bg-slate-200 dark:bg-dark-green shadow-lg h-auto overflow-hidden ring-1 ring-slate-900/5">
      <div className="absolute top-0 left-0 right-0 px-4 py-3 flex items-center font-semibold text-lg dark:shadow-xl text-slate-900 dark:text-lemon-green dark:bg-opacity-20 bg-slate-300/90 dark:bg-dark-green backdrop-blur-sm">
      {t('previousTopics')}
      </div>
      <div className="overflow-auto scrollbar dark:scrollbar-thumb-lime-700 dark:scrollbar-track-lime-900 scrollbar-thumb-slate-400 scrollbar-track-slate-300 scrollbar-thin  flex flex-col divide-y h-80 dark:divide-slate-200/10 divide-slate-300/50 pt-12">
        {previousTopics.map((item: any, index: number) => (
          <div key={index} className="flex items-center gap-4 p-4">
            <div className="flex space-x-2">
              <h3 className="text-xs bg-slate-300 dark:bg-lemon-haze dark:text-dark-green rounded-full px-2 items-center flex">{duration(item.time)}</h3>
              <h3 className="ml-1 lowercase">{item.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
