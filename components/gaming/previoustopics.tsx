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

    <div className="relative rounded-md mx-auto bg-second h-auto overflow-hidden">
      <div className="absolute top-0 left-0 right-0 px-4 py-3 flex items-center font-semibold text-lg text-third bg-opacity-20 bg-second/90 backdrop-blur-lg shadow-lg shadow-second">
      {t('previousTopics')}
      </div>
      <div className="overflow-auto scrollbar scrollbar-thumb-thumb-color scrollbar-track-track-color scrollbar-thin flex flex-col divide-y divide-fourth h-80  pt-12">
        {previousTopics.map((item: any, index: number) => (
          <div key={index} className="flex items-center gap-4 p-4">
            <div className="flex space-x-2">
              <h3 className="text-xs bg-third text-second rounded-full px-2 items-center flex">{duration(item.time)}</h3>
              <h3 className="text-third ml-1 lowercase">{item.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
