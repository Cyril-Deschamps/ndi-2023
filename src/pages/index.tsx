import React, { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import nextI18NextConfig from "../../next-i18next.config";
import Image from "next/image";
import furio from "../assets/img/furio.png";
import ville1 from "../assets/img/Ville1.png";

import dynamic from "next/dynamic";

const LastView = dynamic(() => import("../services/home/components/LastView"), {
  ssr: false,
  loading: () => <div>loading...</div>,
});

const Home = (): JSX.Element => {
  const [time, setTime] = useState(-1);

  // React timer
  useEffect(() => {
    if (localStorage.getItem("alreadyPlayed") === "true") {
      setTime(44);
    }
    const interval = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={"flex flex-1 justify-center items-center"}>
      {time >= 0 && time < 4 ? <FirstView /> : null}
      {time >= 5 && time < 10 ? <SecondView /> : null}
      {time >= 11 && time < 16 ? <SecondImage /> : null}
      {time >= 17 && time < 21 ? <ThirdView /> : null}
      {time >= 22 && time < 27 ? <FourthView /> : null}
      {time >= 28 && time < 31 ? <FirstImage /> : null}
      {time >= 32 && time < 37 ? <FifthView /> : null}
      {time >= 37 ? <LastView /> : null}
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

const FirstView = (): JSX.Element => {
  return (
    <div>
      <p className={`text-white text-5xl text-center`}>
        Nous sommes en 2100... <br />
        La Terre a été dévastée par la pollution et les industries.
      </p>
    </div>
  );
};

const SecondView = (): JSX.Element => {
  return (
    <p className={"text-white text-5xl fadeOut 5s ease-in-out text-center"}>
      Le réchauffement climatique a englouti la planète, privant Noël de sa
      neige tant aimée.
    </p>
  );
};

const ThirdView = (): JSX.Element => {
  return (
    <p className={"text-white text-5xl fadeOut 5s ease-in-out text-center"}>
      Vous êtes Furio, le dernier espoir de l'Humanité
    </p>
  );
};

const FirstImage = (): JSX.Element => {
  return (
    <Image alt={"Picture of the author"} height={500} src={furio} width={500} />
  );
};

const SecondImage = (): JSX.Element => {
  return (
    <Image
      alt={"Picture of the author"}
      height={700}
      src={ville1}
      style={{ borderRadius: "32px" }} // Adjust the pixel value based on your preference
      width={700}
    />
  );
};

const FourthView = (): JSX.Element => {
  return (
    <p className={"text-white text-5xl fadeOut 5s ease-in-out text-center"}>
      Les scientifiques ont conçu une mission audacieuse : <br />
      envoyer Furio dans le passé pour sauver le monde et réveiller la magie de
      Noël.
    </p>
  );
};

const FifthView = (): JSX.Element => {
  return (
    <p className={"text-white text-5xl fadeOut 5s ease-in-out text-center"}>
      Votre mission, si vous l'acceptez : <br />
      remodeler le présent en accomplissant des missions aux quatre coins du
      monde... Bonne chance à vous !
    </p>
  );
};
