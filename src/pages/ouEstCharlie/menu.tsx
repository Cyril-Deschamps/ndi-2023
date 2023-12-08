import React, { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import nextI18NextConfig from "../../../next-i18next.config";

import Image from "next/image";

import ImageFurio from "../../assets/img/furio.png";
import ImageForest from "../../assets/img/oecForet.png";
import ImageOcean from "../../assets/img/oecOcean.png";
import ImageCity from "../../assets/img/oecVille.png";

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
    return (
      <div
        className={
          "flex flex-col items-center gap-xl text-white text-5xl text-center"
        }
      >
        <p>Trouvez Furio</p>
        <Image alt={""} src={ImageFurio} />
      </div>
    );
  };

  return (
    <div className={"flex flex-1 justify-center items-center bg-green"}>
      {time < 1 ? <FirstView /> : <SecondView />}
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
  const [showForestText, setShowForestText] = useState(false);

  const ForestText = (): JSX.Element => {
    return (
      <div className={"absolute top-0 m-0 p-5 bg-black w-screen h-screen"}>
        Hello
      </div>
    );
  };

  return (
    <div className={"absolute top-0 m-0 p-5 bg-black w-screen h-screen"}>
      <div
        className={
          "flex flex-col items-center justify-center text-white text-5xl"
        }
      >
        <div className={"object-contain"}>
          <Image
            alt={""}
            className={"max-h-[800px] w-auto"}
            src={ImageForest}
          />
          <button
            className={"absolute top-[54px] right-[620px] text-transparent"}
            onClick={() => setShowForestText(true)}
          >
            Ko
          </button>
          <p>Trouvez et cliquez sur Furio</p>
        </div>
      </div>
      {showForestText ? <ForestText /> : null}
    </div>
  );
};

const Ocean = (): JSX.Element => {
  const [showOceanText, setshowOceanText] = useState(false);

  const OceanText = (): JSX.Element => {
    return (
      <div className={"absolute top-0 m-0 p-5 bg-black w-screen h-screen"}>
        Hello
      </div>
    );
  };

  return (
    <div className={"absolute top-0 m-0 p-5 bg-black w-screen h-screen"}>
      <div
        className={
          "flex flex-col items-center justify-center text-white text-5xl"
        }
      >
        <div className={"object-contain"}>
          <Image alt={""} className={"max-h-[800px] w-auto"} src={ImageOcean} />
          <button
            className={"absolute top-[400px] left-[720px] text-transparent"}
            onClick={() => setshowOceanText(true)}
          >
            Ko
          </button>
          <p>Trouvez et cliquez sur Furio</p>
        </div>
      </div>
      {showOceanText ? <OceanText /> : null}
    </div>
  );
};

const City = (): JSX.Element => {
  const [showCityText, setshowCityText] = useState(false);

  const CityText = (): JSX.Element => {
    return (
      <div className={"absolute top-0 m-0 p-5 bg-black w-screen h-screen"}>
        Hello
      </div>
    );
  };

  return (
    <div className={"absolute top-0 m-0 p-5 bg-black w-screen h-screen"}>
      <div
        className={
          "flex flex-col items-center justify-center text-white text-5xl"
        }
      >
        <div className={"object-contain"}>
          <Image alt={""} className={"max-h-[800px] w-auto"} src={ImageCity} />
          <button
            className={"absolute top-[260px] right-[500px] text-transparent"}
            onClick={() => setshowCityText(true)}
          >
            Ko
          </button>
          <p>Trouvez et cliquez sur Furio</p>
        </div>
      </div>
      {showCityText ? <CityText /> : null}
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
