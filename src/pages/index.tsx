import React from "react";
import SizedSection from "../services/ui/SizedSection";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import nextI18NextConfig from "../../next-i18next.config";
import AppLayout from "../services/ui/Layout/AppLayout";
import BaseSeo from "../services/seo/BaseSeo";

const Home = (): JSX.Element => {
  return (
    <AppLayout>
      <BaseSeo description={"Coucou"} title={"LA NDI MDL"} />
      <main className={"flex flex-col items-center"}>
        <SizedSection
          className={
            "flex flex-row z-10 min-h-[28rem] items-start sm:min-h-[26rem] justify-center lg:justify-between"
          }
        >
          <div
            className={
              "ml-xs sm:ml-xl md:ml-0 lg:ml-2xl relative flex flex-col items-center gap-s"
            }
          >
            <h1
              className={
                "font-VarsityTeam md:w-full text-4xl md:text-5xl leading-8 md:leading-10 sm:tracking-wide text-center lg:text-start"
              }
            >
              Home
            </h1>
          </div>
        </SizedSection>
        <div
          className={
            "bg-white w-full mt-[-54px] flex flex-col items-center pb-6 md:pb-12"
          }
        >
          <SizedSection
            className={"flex flex-col justify-between lg:flex-row items-center"}
          >
            <p
              className={
                "w-full xl:w-[34rem] text-center font-regular text-s leading-5 lg:pt-0 xl:pt-10  max-w-xl"
              }
            >
              {" "}
              Chibron
            </p>
          </SizedSection>
        </div>
      </main>
    </AppLayout>
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
