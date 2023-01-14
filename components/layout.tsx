import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Navbar from "./navbar";

export default function Layout({ children, font }:any) {
  const { theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(theme)
  useEffect(() => {
    setCurrentTheme(theme)
  }, [theme])
  
  return (
    <div className={`${theme} bg-main h-full`}>
      <Navbar />
      <main className={`${font.className}`}>
        <div className="max-h-screen h-screen pb-8">
            {children}
        </div>
      </main>
    </div>
  );
}
