import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import nextI18NextConfig from "../../../next-i18next.config";
import AppLayout from "../../services/ui/Layout/AppLayout";
import SizedSection from "../../services/ui/SizedSection";
import BaseSeo from "../../services/seo/BaseSeo";

const LegalNotice = (): JSX.Element => {
  return (
    <AppLayout>
      <BaseSeo description={"Chibre"} title={"Chibre"} />
      <main className={"flex flex-col items-center"}>
        <SizedSection className={"mb-xl"} little>
          <div className={"bg-white rounded-3xl p-l"}>
            <span className={"text-s"}>Chibre</span>
          </div>
        </SizedSection>
      </main>
    </AppLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale ?? "en",
      ["website", "legal_notice"],
      nextI18NextConfig,
    )),
  },
});

export default LegalNotice;
