import React, { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import nextI18NextConfig from "../../next-i18next.config";

const Home = (): JSX.Element => {
  const [time, setTime] = useState(0);

  // React timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const FirstView = (): JSX.Element => {
    return (
      <p className={"text-white text-5xl fadeOut 5s ease-in-out"}>
        Nous voici en 2021...
      </p>
    );
  };

  const SecondView = (): JSX.Element => {
    return (
      <p className={"text-white text-5xl fadeOut 5s ease-in-out"}>Chibre</p>
    );
  };

  return (
    <div className={"flex flex-1 justify-center items-center"}>
      {time < 10 ? <FirstView /> : <SecondView />}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale ?? "fr",
      ["validations"],
      nextI18NextConfig,
    )),
  },
});

export default Home;
