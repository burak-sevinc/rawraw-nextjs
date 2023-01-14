import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Navbar from "./navbar";

export default function Layout({ children, font }:any) {
  const { theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(theme)
  useEffect(() => {
    setCurrentTheme(theme)
    console.log("current theme", theme)
  }, [theme])
  
  return (
    <div className="dark:bg-dark h-full">
      <Navbar />
      <main className={`${theme} ${font.className}`}>
        <div className="max-h-screen h-screen">
            {children}
        </div>
      </main>
    </div>
  );
}
