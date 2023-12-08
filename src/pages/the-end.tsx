import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import nextI18NextConfig from "../../next-i18next.config";

const TheEnd = (): JSX.Element => {
  return (
    <div className={"flex flex-1 justify-center items-center"}>
      <p className={"text-white text-5xl"}>C LA FIN PD</p>
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

export default TheEnd;
