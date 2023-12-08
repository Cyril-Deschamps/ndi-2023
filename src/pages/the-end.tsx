import React, { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import nextI18NextConfig from "../../next-i18next.config";
import Image from "next/image";
import win1 from "../assets/img/win1.png";


const Home = (): JSX.Element => {
  const [time, setTime] = useState(0);

  // React timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={"flex flex-1 justify-center items-center"}>
      {time < 4 ? <FirstView/> : null}
      {time >= 5 && time < 10 ? <SecondView /> : null}
      {time >= 11 && time < 16 ? <FirstImage /> : null}
      {time >= 17 ? <ThirdView /> : null}
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
        Votre mission est un succès
      </p>
    </div>
  );
};

const SecondView = (): JSX.Element => {
  return (
    <p className={'text-white text-5xl fadeOut 5s ease-in-out text-center'}>
      La Terre est sauvée, la magie de Noël est de retour...
    </p>
  );
};

const ThirdView = (): JSX.Element => {
  return (
    <p className={"text-white text-5xl fadeOut 5s ease-in-out text-center"}>
      Félicitations, vous avez sauvé Noël !
    </p>
  );
};

const FirstImage = (): JSX.Element => {
    return (
      <Image 
      alt={"Picture of the author"}
      height={1000}
      src={win1}
      width={1000}/>
    );
  };
