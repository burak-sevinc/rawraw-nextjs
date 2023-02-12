import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ThemeSelector from "./themeselector";

export default function Navbar() {
  const { locale } = useRouter();
  const { theme, setTheme } = useTheme();
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
        <Image src="/red_logo.svg" height={90} width={90} alt="Red logo" />
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
      <Image src="/yellow_logo.svg"  width={90} height={90} alt="Yellow logo" priority />
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
          <div className="flex justify-end items-center space-x-2">
            <span className="text-third">
              <Link href={`#about`} scroll={false}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
              </Link>
            </span>

            <ThemeSelector setTheme={setTheme} />
          </div>
        </div>
      </div>
    </nav>
  );
}
