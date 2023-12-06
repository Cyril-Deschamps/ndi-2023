import Head from "next/head";
import React, { ReactNode } from "react";
import { hostBaseURL } from "../auth/config";
import { AppConfig } from "../utils/AppConfig";

interface BaseSeoProps {
  title: string;
  description: string;
  children?: ReactNode;
}

const BaseSeo = ({
  title,
  description,
  children,
}: BaseSeoProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>{`${AppConfig.siteName} - ${title}`}</title>
        <meta content={description} name={"description"} />
        <meta content={"website"} property={"og:type"} />
        <meta
          content={`${AppConfig.siteName} - ${title}`}
          property={"og:title"}
        />
        <meta content={description} property={"og:description"} />
        <meta
          content={`${hostBaseURL}/assets/logo.png`}
          property={"og:image"}
        />
        {children}
      </Head>
    </>
  );
};

export default BaseSeo;
