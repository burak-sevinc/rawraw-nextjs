import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import GetFont from "../hooks/getFont";

export default function Custom404() {
  const [mounted, setMounted] = useState(false);
  const robotoMono = GetFont();
  const { t } = useTranslation();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <div className={`flex justify-center text-center min-h-screen items-center ${robotoMono.className}`}>
      <div className="">
        <div className="flex justify-center">
          <Image
            className=""
            src={"/404cat.png"}
            width={100}
            alt="404 Page Not Found"
            height={100}
          />
        </div>
        <h1 className="font-extrabold text-4xl">
          {t("common:pageNotFoundTitle")}
        </h1>
        <p className="font-bold text-xl">
          {t("common:pageNotFoundDescription")}
        </p>
        <button className="bg-second text-third p-4 rounded-xl mt-4 text-sm hover:bg-third hover:text-first">
          {t("common:goHome")}
        </button>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common", "messages"])),
  },
});
