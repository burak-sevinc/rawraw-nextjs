import { Fragment } from "react";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";

export type ThemeSelectorProps = {
  setTheme: (theme: string) => void;
};

export default function ThemeSelector({ setTheme }: ThemeSelectorProps) {
  return (
    <>
      <Menu as="div" className="relative">
        <Menu.Button>
          <div className="flex items-center group bg-second hover:bg-fourth p-2 rounded-xl">
            <Image src="/theme.svg" height={40} width={40} alt="Theme select" />
            <span className="pl-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-fourth group-hover:text-third rounded-full"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition duration-100 ease-out z-20"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <div className="absolute border border-third z-10 bg-second rounded-lg overflow-hidden mt-2 w-max right-5">
            <Menu.Items className="z-20">
              <div className="divide-y divide-fourth grid grid-cols-1">
                <Menu.Item>
                  <div
                    onClick={() => setTheme("light")}
                    className="flex cursor-pointer text-third hover:bg-third group hover:text-second p-4 space-x-2 items-center text-xs grid grid-cols-3"
                  >
                    <Image
                      alt="Ligt Mode"
                      src="/lighter.svg"
                      height={30}
                      width={30}
                      className="transition delay-50 duration-100 group-hover:scale-110"
                    />
                    <span className="sr-only">Light theme</span>
                    <p>Light</p>
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div
                    onClick={() => setTheme("dark")}
                    className="flex cursor-pointer text-third hover:bg-third group hover:text-second p-4 space-x-2 items-center text-xs grid grid-cols-3"
                  >
                    <Image
                      alt="Dark Mode"
                      src="/ashtry_cigar.svg"
                      height={50}
                      width={50}
                      className="transition delay-50 duration-100 group-hover:scale-110"
                    />
                    <span className="sr-only">Dark theme</span>
                    <p>Dark</p>
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div
                    onClick={() => setTheme("psy")}
                    className="flex cursor-pointer text-third hover:bg-third group hover:text-second p-4 space-x-2 items-center text-xs grid grid-cols-3"
                  >
                    <Image
                      alt="Psychedelic Mode"
                      src="/smiley.svg"
                      height={35}
                      width={35}
                      className="transition delay-50 duration-100 group-hover:scale-110"
                    />
                    <span className="sr-only">Psychedelic theme</span>
                    <p>Psychedelic</p>
                  </div>
                </Menu.Item>
              </div>
            </Menu.Items>
          </div>
        </Transition>
      </Menu>
    </>
  );
}
