import { useTranslation } from 'next-i18next'
export default function CurrentPlayer({currentPlayer}: any) {
  const {t} = useTranslation()
  return (
    <div className="border border-slate-300 lg:py-2 py-4 w-1/2 dark:border-0 dark:shadow-sm dark:shadow-lime-700 dark:bg-lemon-haze border-slate-200 shadow-xl rounded-xl flex justify-center items-center">
      <div className="text-center space-y-2 text-slate-600 dark:text-dark-green break-all">
        <div className="text-xs font-bold">{t('common:gameTurn')}</div>
        <div className="mx-2 text-xs">{currentPlayer}</div>
      </div>
    </div>
  );
}
