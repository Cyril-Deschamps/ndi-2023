import React, { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import nextI18NextConfig from "../../next-i18next.config";
import Image from "next/image";
import loose1 from "../assets/img/loose1.png";

import { useRouter } from "next/router";
import { set } from "date-fns";

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
      {time < 4 ? <FirstView /> : null}
      {time >= 5 && time < 10 ? <SecondView /> : null}
      {time >= 11 && time < 16 ? <FirstImage /> : null}
      {time >= 17 && time < 21 ? <ThirdView /> : null}
      {time >= 22 && time < 27 ? <RestartGamePrompt /> : null}
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
        Votre mission a échoué...
      </p>
    </div>
  );
};

const SecondView = (): JSX.Element => {
  return (
    <p className={"text-white text-5xl fadeOut 5s ease-in-out text-center"}>
      La Terre est condamnée, la magie de Noël a disparu...
    </p>
  );
};

const ThirdView = (): JSX.Element => {
  return (
    <p className={"text-white text-5xl fadeOut 5s ease-in-out text-center"}>
      Tout espoir est perdu...
    </p>
  );
};

const FirstImage = (): JSX.Element => {
  return (
    <Image
      alt={"Picture of the author"}
      height={1000}
      src={loose1}
      width={1000}
    />
  );
};

const RestartGamePrompt = () => {
  const router = useRouter();

  useEffect(() => {
    const shouldRestart = window.confirm("Voulez-vous recommencer la partie?");

    if (shouldRestart) {
      router.push("/");
    }

    // Cleanup function to ensure the effect runs only once
    return () => {
      // Do nothing in the cleanup function
    };
  }, [router]);

  return null; // This component renders nothing
};
