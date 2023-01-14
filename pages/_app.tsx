import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { ThemeProvider } from "next-themes";
import { appWithTranslation } from 'next-i18next'
import { Roboto, Roboto_Mono } from "@next/font/google"

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
})

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <Layout font={robotoMono}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default appWithTranslation(App)
