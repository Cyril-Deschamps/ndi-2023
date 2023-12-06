import { Trans } from "next-i18next";
import Image from "next/image";
import React from "react";
import { Trip } from "../trip";
import tripImageBasic from "../../../assets/img/trip-image-basic.jpg";
import useFileAsObjectURL from "../../files/useFileAsObjectURL";
import Link from "next/link";
import { format } from "date-fns";
import BlankImage from "../../../assets/img/blank.svg";
import BookingLogo from "../../../assets/img/logo-booking-affiliate.svg";
import { TFuncKey } from "react-i18next";
import coffeeIcon from "../../../assets/img/icons/icon-coffee.svg";
import hotelIcon from "../../../assets/img/icons/icon-hotel.svg";
import planeIcon from "../../../assets/img/icons/icon-plane.svg";
import { useCountry } from "../../countries/CountryContext";

const TripListItem = ({ trip }: { trip: Trip }): JSX.Element => {
  const { countriesList } = useCountry();

  const objectUrl = useFileAsObjectURL({
    url: trip.destinationPicture,
  });

  return (
    <div className={"bg-white rounded-xl overflow-hidden shadow-sm p-4"}>
      <Image
        alt={"Image destination"}
        className={"w-full h-48 object-cover rounded-xl mr-auto ml-auto "}
        height={50}
        src={
          trip.destinationPicture
            ? objectUrl?.url || BlankImage
            : tripImageBasic
        }
        width={100}
      />
      <div className={"pt-2"}>
        <div className={"flex justify-between"}>
          <div className={"flex flex-col"}>
            <h2 className={"text-2xl font-bold mb-2"}>
              {trip.destinationName}
            </h2>
            <span
              className={
                "relative text-sm text-gray-500 font-medium top-[-0.85rem]"
              }
            >
              {countriesList[trip.destinationCountryCode]}
            </span>
          </div>
          <span className={"text-sm font-medium pt-[0.65rem] pl-1"}>
            <Trans
              count={trip.travelersNumber}
              i18nKey={"trips_results:nights_number" as TFuncKey}
              values={{
                count: trip.nightsNumber,
              }}
            />
          </span>
        </div>

        <ul className={"pl-2 py-2 flex flex-col gap-2"}>
          <li
            className={
              "leading-tight text-sm mb-1 flex flex-row gap-3 items-center"
            }
          >
            <Image alt={"coffee"} className={"w-5"} src={hotelIcon} />
            BITE&nbsp;:
            <span className={"whitespace-nowrap"}>
              <strong>{trip.Accomodation.averagePricePerNight} $</strong> / BITE
            </span>
          </li>
          <li className={"text-sm mb-1 flex flex-row gap-3 items-center"}>
            <Image alt={"coffee"} className={"w-5"} src={planeIcon} />
            BITE&nbsp;:
            <strong className={"whitespace-nowrap"}>
              {trip.Transportation.price}&nbsp;$
            </strong>
          </li>
          <li className={"text-sm mb-1 flex flex-row gap-3 items-center"}>
            <Image alt={"coffee"} className={"pt-[3px] w-5"} src={coffeeIcon} />
            BITE&nbsp;:
            <strong className={"whitespace-nowrap"}>
              {trip.otherSpentPrice}
              &nbsp;$
            </strong>
          </li>
        </ul>
        <div className={"flex flex-col gap-3 my-3"}>
          <div
            className={
              "flex flex-row flex-wrap justify-between items-center gap-y-2"
            }
          >
            <p className={"font-bold text-xs pt-1"}>{`${(
              trip.totalPrice / trip.travelersNumber
            ).toFixed()} $ / BITE`}</p>
            <p className={"font-bold"}>
              BITE :{" "}
              <span className={"text-blue text-xl"}>
                {trip.totalPrice}&nbsp;$
              </span>
            </p>
            <Link
              className={
                "p-2 px-3 mt-2 bg-green rounded-xl text-white uppercase text-xs font-medium w-full text-center"
              }
              href={`https://www.kiwi.com/deep?affilid=cyrildeschampsorgatripsorgatrips&booking_token=${trip.Transportation.bookingToken}`}
              rel={"noopener noreferrer"}
              target={"_blank"}
            >
              BITE
            </Link>
          </div>
          <Link
            className={
              "p-2 px-3 bg-booking-blue rounded-xl text-white uppercase text-xs font-medium flex flex-col items-center gap-1 text-center"
            }
            href={`https://www.booking.com/searchresults.en.html?aid=${
              process.env.REACT_APP_BOOKING_AFFILIATE_ID
            }&ss=${encodeURIComponent(trip.destinationName)}&checkin=${format(
              trip.Transportation.arrivalLocalDate,
              "yyyy-MM-dd",
            )}&checkout=${format(
              trip.Transportation.leavingLocalDate,
              "yyyy-MM-dd",
            )}&group_adults=${trip.travelersNumber}&nflt=price%3DUSD-min-${
              trip.Accomodation.averagePricePerNight
            }-1`}
            rel={"noopener noreferrer"}
            target={"_blank"}
          >
            BITE
            <Image
              alt={"logo booking"}
              className={"mix-blend-plus-lighter object-none object-top h-6"}
              src={BookingLogo}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TripListItem;
