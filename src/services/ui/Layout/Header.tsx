import Link from "next/link";
import { BASE_LINK } from "src/routes";

const Header = (): JSX.Element => {
  return (
    <header
      className={
        "flex flex-row items-center content-between py-xs px-s md:px-2xl pb-2xl md:pb-3xl"
      }
    >
      <Link href={BASE_LINK}>
        <div className={"w-52 sm:w-80 ml-[-10px] mr-5 shrink-0"}>
          <p>LOGO</p>
        </div>
      </Link>
      <nav
        className={
          "flex sm:flex-row items-center gap-xs sm:gap-m ml-auto shrink flex-col justify-end"
        }
      >
        <div className={"w-14 sm:w-24"}>
          <p>Header</p>
        </div>
      </nav>
    </header>
  );
};

export default Header;
