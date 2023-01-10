import { useTranslation } from 'next-i18next'
export default function CountDown({gameTime}: any) {
  const {t} = useTranslation()
  return (
    <div className="dark:shadow-sm lg:py-2 py-4 w-1/2 dark:shadow-lime-700 dark:bg-lemon-haze border-slate-200 shadow-xl rounded-xl flex justify-center items-center">
      <div className="text-center text-slate-600 dark:text-dark-green">
        <div className="text-xs font-bold text-center">{t('common:time')}</div>
        <div className="">{gameTime}</div>
        <div className="text-xs">{t('common:second')}</div>
      </div>
    </div>
  );
}
