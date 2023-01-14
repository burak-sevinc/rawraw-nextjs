import { useTheme } from 'next-themes';
import { Html, Head, Main, NextScript } from 'next/document'
import { useEffect, useState } from 'react';


export default function Document() {
  const { theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(theme)

  useEffect(() => {
    setCurrentTheme(theme)
  }, [theme])
  
  return (
    <Html lang="en">
      <Head />
      <body className={`${theme} bg-main`} >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
