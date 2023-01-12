import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { locale } = useRouter();
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const renderThemeChanger = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme == "dark") {
      return (
        <div className="p-1 rounded-full flex space-x-8">
          <span className="sr-only">Dark mode toggle</span>
          <Image
            onClick={() => setTheme("light")}
            alt="light_mode"
            src="/ashtry_cigar.svg"
            height={50}
            width={50}
            className="transition delay-50 duration-100 hover:scale-110"
          />
        </div>
      );
    } else {
      return (
        <div
          onClick={() => setTheme("dark")}
          className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Image alt="light_mode" src="/lighter.svg" height={50} width={50} />
        </div>
      );
    }
  };

  const LanguageSwitcher = () => {
    return (
      <>
        {locale == "tr" ? (
          <Image
            className={`${
              locale == "tr"
                ? "brightness-100"
                : "brightness-75 transition delay-50 duration 150 hover:scale-110"
            }`}
            alt="tr"
            src="/tr.svg"
            height={30}
            width={30}
          />
        ) : (
          <Link href="/" locale="tr">
            <Image
              className={`${
                locale == "tr"
                  ? "brightness-100"
                  : "brightness-75 transition delay-50 duration 150 hover:scale-110"
              }`}
              alt="tr"
              src="/tr.svg"
              height={30}
              width={30}
            />
          </Link>
        )}

        {locale == "en" ? (
          <Image
            className={`${
              locale == "en"
                ? "brightness-100"
                : "brightness-75 transition delay-50 duration 150 hover:scale-110"
            }`}
            alt="en"
            src="/en.svg"
            height={30}
            width={30}
          />
        ) : (
          <Link href="/" locale="en">
            <Image
              className={`${
                locale == "en"
                  ? "brightness-100"
                  : "brightness-75 transition delay-50 duration 150 hover:scale-110"
              }`}
              alt="en"
              src="/en.svg"
              height={30}
              width={30}
            />
          </Link>
        )}
      </>
    );
  };
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="bg-white border dark:border-0 dark:bg-navbar-dark dark:border-b dark:border-navbar-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-[5rem]">
          <div className="flex space-x-2">
            <LanguageSwitcher />
          </div>
          <div className="flex justify-center">
            <div className="flex-shrink-0 flex items-center">
              {theme == "light" ? (
                <Image
                  src="/yellow_logo.svg"
                  height={50}
                  width={90}
                  alt="rawrawyellow"
                />
              ) : (
                <Image
                  src="/red_logo.svg"
                  height={50}
                  width={90}
                  alt="rawrawred"
                />
              )}
            </div>
          </div>
          <div className="flex justify-end">{renderThemeChanger()}</div>
        </div>
      </div>
    </nav>
  );
}
