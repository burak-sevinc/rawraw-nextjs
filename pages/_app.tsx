import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { ThemeProvider } from "next-themes";
import { appWithTranslation } from "next-i18next";
import GlobalContextProvider from "../context/globalContext";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalContextProvider>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </GlobalContextProvider>
    </>
  );
};

export default appWithTranslation(App);
