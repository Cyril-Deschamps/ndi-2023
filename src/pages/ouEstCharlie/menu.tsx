import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
  const [showForestText, setShowForestText] = useState(false);

  const ForestText = (): JSX.Element => {
    return (
      <div
        className={
          "absolute top-0 m-0 p-5 bg-black w-screen h-screen cursor-default"
        }
      >
        <div
          className={
            "flex flex-col justify-center gap-xl p-5 text-[25px] text-start"
          }
        >
          <p>
            Les forêts, ces joyaux de la nature, sont en danger. Chaque jour,
            elles sont victimes de la pollution, des incendies dévastateurs, et
            de la perte de leur faune et flore exceptionnelles.
          </p>
          <p>
            La pollution des forêts est un fléau qui empoisonne la vie sauvage
            et détruit les écosystèmes fragiles. Les déchets et les émissions de
            gaz à effet de serre altèrent la qualité de l'air et de l'eau,
            mettant en péril la survie des espèces végétales et animales qui en
            dépendent.
          </p>
          <p>
            Les incendies de forêt, de plus en plus fréquents et intenses. Ces
            feux dévastateurs détruisent des hectares de nature préservée,
            menaçant la vie des habitants de ces lieux et provoquant des pertes
            inestimables en termes de biodiversité.
          </p>
          <button
            className={
              "shrink px-4xl py-5 outline font-semibold text-sm bg-transparent rounded-full"
            }
            onClick={() => window.location.reload()}
          >
            Menu
          </button>
          <p className={"text-center text-green-700"}>
            <strong>Lettre numéro 1 :</strong> "i"
          </p>
        </div>
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
        <div className={"object-contain relative"}>
          <Image alt={""} className={"h-[515px] w-[515px]"} src={ImageForest} />
          <button
            className={
              "absolute top-[30px] right-[77px] text-transparent cursor-default w-6 h-12"
            }
            onClick={() => setShowForestText(true)}
          />
          <p className={"text-3xl py-xl"}>Trouvez et cliquez sur Furio</p>
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
      <div
        className={
          "absolute top-0 m-0 p-5 bg-black w-screen h-screen cursor-default"
        }
      >
        <div
          className={
            "flex flex-col justify-center gap-xl p-5 text-[25px] text-start"
          }
        >
          <p>
            La pollution des océans constitue une crise mondiale. Chaque année,
            des millions de tonnes de déchets plastiques, de produits chimiques
            toxiques et de déversements pétroliers nuisent gravement à nos mers.
          </p>
          <p>
            Cette pollution met en danger la vie marine, perturbe les
            écosystèmes marins et affecte notre propre chaîne alimentaire.
          </p>
          <p>
            Les animaux marins ingèrent ces déchets, causant des blessures et la
            mort. Pourtant, nous pouvons tous contribuer à inverser cette
            tendance en réduisant notre utilisation de plastique.
          </p>
          <button
            className={
              "shrink px-4xl py-5 outline font-semibold text-sm bg-transparent rounded-full"
            }
            onClick={() => window.location.reload()}
          >
            Menu
          </button>
          <p className={"text-center text-green-700"}>
            <strong>Lettre numéro 2 :</strong> "n"
          </p>
        </div>
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
        <div className={"object-contain relative"}>
          <Image alt={""} className={"h-[515px] w-[515px]"} src={ImageOcean} />
          <button
            className={
              "absolute top-[230px] left-[125px] text-transparent cursor-default"
            }
            onClick={() => setshowOceanText(true)}
          >
            Ko
          </button>
          <p className={"text-3xl py-xl"}>Trouvez et cliquez sur Furio</p>
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
      <div
        className={
          "absolute top-0 m-0 p-5 bg-black w-screen h-screen cursor-default"
        }
      >
        <div
          className={
            "flex flex-col justify-center gap-xl p-5 text-[25px] text-start"
          }
        >
          <p>
            La pollution en ville crée de nombreux problèmes. L'air y est
            souvent pollué à cause des voitures et des usines, ce qui peut
            rendre les gens malades.
          </p>
          <p>
            La surconsommation entraîne également beaucoup de déchets et la
            destruction d'espaces verts, nuisant à la biodiversité et à notre
            qualité de vie.
          </p>
          <p>
            La dépendance à la voiture provoque des embouteillages, des trajets
            plus longs et une augmentation des émissions de gaz à effet de serre
            qui contribuent au changement climatique.
          </p>
          <p>
            De plus, le bruit en ville, principalement dû à la circulation, peut
            perturber notre bien-être.
          </p>
          <button
            className={
              "shrink px-4xl py-5 outline font-semibold text-sm bg-transparent rounded-full"
            }
            onClick={() => window.location.reload()}
          >
            Menu
          </button>
          <p className={"text-center text-green-700"}>
            <strong>Lettre numéro 3 :</strong> "v"
          </p>
        </div>
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
        <div className={"object-contain relative"}>
          <Image alt={""} className={"h-[515px] w-[515px]"} src={ImageCity} />
          <button
            className={"absolute top-[150px] right-0 text-transparent"}
            onClick={() => setshowCityText(true)}
          >
            Ko
          </button>
          <p className={"text-3xl py-xl"}>Trouvez et cliquez sur Furio</p>
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

  const router = useRouter();

  return (
    <div
      className={
        "flex flex-col items-center gap-xl text-white text-5xl text-center"
      }
    >
      <p>Trouver les dans ses trois biomes</p>
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
      <button
        className={
          "shrink px-4xl py-5 outline outline-red-700 font-semibold text-sm bg-transparent rounded-full"
        }
        onClick={() => {
          router.push("/");
          localStorage.setItem("step", "1");
        }}
      >
        Menu principal
      </button>
      {showForest ? <Forest /> : null}
      {showOcean ? <Ocean /> : null}
      {showCity ? <City /> : null}
    </div>
  );
};
