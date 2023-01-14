import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Navbar from "./navbar";

export default function Layout({ children, font, bodyRef }: any) {
  const { theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(theme);

  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  return (
    <div className={`${theme} bg-main`}>
      <Navbar />
      <main className={`${font.className}`}>
        <div className="pb-12">{children}</div>
      </main>
    </div>
  );
}
