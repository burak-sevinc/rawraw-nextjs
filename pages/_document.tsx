import { useTheme } from 'next-themes';
import { Html, Head, Main, NextScript } from 'next/document'
import { useEffect, useState } from 'react';


export default function Document() {
  const { theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(theme)

  useEffect(() => {
    setCurrentTheme(theme)
    console.log("current theme:", theme)
  }, [theme])
  
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
