import { useTranslation } from 'next-i18next'
export default function CurrentPlayer({currentPlayer}: any) {
  const {t} = useTranslation()
  return (
    <div className="lg:py-2 py-4 w-1/2 bg-third border-2 border-fourth  rounded-xl flex justify-center items-center">
      <div className="text-center space-y-2 text-second break-all">
        <div className="text-xs font-bold">{t('common:gameTurn')}</div>
        <div className="mx-2 text-xs">{currentPlayer}</div>
      </div>
    </div>
  );
}
