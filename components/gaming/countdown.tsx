import { useTranslation } from 'next-i18next'
export default function CountDown({gameTime}: any) {
  const {t} = useTranslation()
  return (
    <div className="bg-third lg:py-2 py-4 w-1/2 border-2 border-fourth rounded-xl flex justify-center items-center">
      <div className="text-center text-second">
        <div className="text-xs font-bold text-center">{t('common:time')}</div>
        <div className="">{gameTime}</div>
        <div className="text-xs">{t('common:second')}</div>
      </div>
    </div>
  );
}
