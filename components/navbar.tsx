import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ThemeSelector from "./themeselector";

export default function Navbar() {
  const { locale } = useRouter();
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

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

  const RawrawLogo = () => {
    if (theme == "dark") {
      return (
        <Image src="/red_logo.svg" height={50} width={90} alt="Red logo" />
      );
    } else if (theme == "psy") {
      return (
        <Image
          src="/high_logo.svg"
          height={50}
          width={90}
          alt="Psychedelic logo"
        />
      );
    }
    return (
      <Image
        src="/yellow_logo.svg"
        height={50}
        width={90}
        alt="Yellow logo"
      />
    );
  };

  return (
    <nav className={`${theme} bg-first border-b border-second mb-6`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-[5rem]">
          <div className="flex space-x-2">
            <LanguageSwitcher />
          </div>
          <div className="flex justify-center">
            <div className="flex-shrink-0 flex items-center">
              {<RawrawLogo />}
            </div>
          </div>
          <div className="flex justify-end">
            <ThemeSelector setTheme={setTheme} />
          </div>
        </div>
      </div>
    </nav>
  );
}
