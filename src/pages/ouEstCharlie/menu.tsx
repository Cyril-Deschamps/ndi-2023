import React, { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import nextI18NextConfig from "../../../next-i18next.config";

const Menu = (): JSX.Element => {
  const [time, setTime] = useState(0);

  // React timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const FirstView = (): JSX.Element => {
    return <p className={"text-white text-5xl"}>Trouve Charlie</p>;
  };

  return (
    <div className={"flex flex-1 justify-center items-center bg-black"}>
      {time < 3 ? <FirstView /> : <SecondView />}
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

export default Menu;

const Forest = (): JSX.Element => {
  return (
    <div className={"absolute bg-black w-screen h-screen p-4xl"}>
      <div className={"text-white text-5xl"}>Forest</div>
    </div>
  );
};

const Ocean = (): JSX.Element => {
  return (
    <div className={"absolute bg-black w-screen h-screen p-4xl"}>
      <div className={"text-white text-5xl"}>Ocean</div>
    </div>
  );
};

const City = (): JSX.Element => {
  return (
    <div className={"absolute bg-black w-screen h-screen p-4xl"}>
      <div className={"text-white text-5xl"}>City</div>
    </div>
  );
};

const SecondView = (): JSX.Element => {
  const [showForest, setShowForest] = useState(false);
  const [showOcean, setshowOcean] = useState(false);
  const [showCity, setshowCity] = useState(false);

  return (
    <div
      className={
        "flex flex-col items-center gap-xl text-white text-5xl text-center"
      }
    >
      <p>Empêche-le de mal agir</p>
      <button
        className={
          "shrink px-4xl py-5 outline font-semibold text-sm bg-transparent rounded-full"
        }
        onClick={() => setShowForest(true)}
      >
        Forêt
      </button>
      <button
        className={
          "shrink px-4xl py-5 outline font-semibold text-sm bg-transparent rounded-full"
        }
        onClick={() => setshowOcean(true)}
      >
        Océan
      </button>
      <button
        className={
          "shrink px-4xl py-5 outline font-semibold text-sm bg-transparent rounded-full"
        }
        onClick={() => setshowCity(true)}
      >
        Ville
      </button>
      {showForest ? <Forest /> : null}
      {showOcean ? <Ocean /> : null}
      {showCity ? <City /> : null}
    </div>
  );
};
