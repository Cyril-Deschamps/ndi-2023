import Image from "next/image";
import Link, { default as NextLink } from "next/link";
import Divider from "../Divider";
import SizedSection from "../SizedSection";
import { AppConfig } from "../../utils/AppConfig";
import { BASE_LINK } from "../../../routes";

import facebookIcon from "../../../assets/img/icons/icon-facebook.svg";
import instagramIcon from "../../../assets/img/icons/icon-instagram.svg";
import {
  HELP_LEGAL_NOTICE_LINK,
  HELP_PRIVACY_POLICY_LINK,
} from "../../../routes/help";

const Footer = (): JSX.Element => {
  return (
    <footer className={"bg-white flex justify-center pt-3xl pb-m"}>
      <SizedSection>
        <nav className={"flex flex-row justify-between items-center"}>
          <div
            className={"flex flex-row gap-x-3xl gap-y-xs font-medium flex-wrap"}
          >
            <Link href={BASE_LINK}>
              <div className={"whitespace-nowrap w-full md:w-auto"}>Home</div>
            </Link>
          </div>
          <div
            className={"flex flex-row gap-x-2xl gap-y-l justify-end flex-wrap"}
          >
            <NextLink href={"flop.com"}>
              <Image
                alt={"icon-facebook"}
                className={"w-xl"}
                src={facebookIcon}
              />
            </NextLink>
            <NextLink href={"flop.com"}>
              <Image
                alt={"icon-instagram"}
                className={"w-xl"}
                src={instagramIcon}
              />
            </NextLink>
          </div>
        </nav>
        <Divider className={"my-l w-full"} />
        <div
          className={
            "flex flex-row items-center flex-wrap-reverse justify-center md:flex-nowrap gap-m"
          }
        >
          <p
            className={
              "md:basis-full text-center md:text-start text-gray-500 text-xs w-full"
            }
          >
            © {new Date().getFullYear()} {AppConfig.siteName} -{" "}
            {AppConfig.author}. Chibre.
          </p>
          <div className={"md:basis-full justify-center flex  w-full"}>
            Chibron
          </div>

          <nav
            className={
              "md:basis-full md:justify-end justify-center flex gap-2xl text-gray-500 text-xs  w-full"
            }
          >
            <Link href={HELP_LEGAL_NOTICE_LINK}>Flopito</Link>
            <Link href={HELP_PRIVACY_POLICY_LINK}>Flopiteur</Link>
          </nav>
        </div>
      </SizedSection>
    </footer>
  );
};

export default Footer;
