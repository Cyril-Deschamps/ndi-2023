import { AppProps } from "next/app";
import React from "react";
import { appWithTranslation } from "next-i18next";
import localFont from "next/font/local";
import classNames from "classnames";
import Head from "next/head";
import "../assets/styles/global.css";
import { Roboto } from "next/font/google";
import nextI18NextConfig from "../../next-i18next.config";
import "../services/validations/yup-init";
import "../services/i18n";
import { ProvideToast } from "../services/toast-notifications";
import { useRouter } from "next/router";
const varsityTeamFont = localFont({
  src: "../assets/fonts/VarsityTeam.otf",
  variable: "--font-varsity-team",
});
const robotoFont = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  return (
    <React.StrictMode>
      <Head>
        <meta
          content={"width=device-width, initial-scale=1"}
          name={"viewport"}
        />
      </Head>
      <div
        className={classNames(
          varsityTeamFont.variable,
          robotoFont.className,
          "flex flex-col w-full min-h-screen p-0 m-0 bg-black font-Roboto",
        )}
      >
        <ProvideToast>
          <Component className={"z-10"} {...pageProps} />
          <button
            className={
              "z-[100000] text-xs absolute bottom-3 right-3 bg-red-900 border hover:bg-blue-700 text-green-700 font-bold py-1 px-2 rounded"
            }
            onClick={() => {
              localStorage.clear();
              if (router.pathname !== "/") {
                router.push("/");
              } else {
                router.reload();
              }
            }}
          >
            <p>Reset game</p>
          </button>
        </ProvideToast>
      </div>
    </React.StrictMode>
  );
};

export default appWithTranslation(App, nextI18NextConfig);
