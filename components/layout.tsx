import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import GetFont from "../hooks/getFont";
import Navbar from "./navbar";

export type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false)
  const font = GetFont();
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className={`${theme} bg-main`}>
      <Navbar />
      <main className={`${font.className}`}>
        <div className="pb-12">{children}</div>
      </main>
    </div>
  );
}
