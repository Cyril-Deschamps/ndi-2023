import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import UpdateMapPosition from "./UpdateMapPosition";

const amazonieCoords = {
  lat: -3.465305,
  lng: -62.215881,
};
const amazonieZoom = 5;

const middleEastCoords = {
  lat: 30,
  lng: 45,
};
const middleEastZoom = 5;

const chinaCoords = {
  lat: 35.86166,
  lng: 104.195397,
};
const chinaZoom = 5;

const polytechMontpellierCoords = {
  lat: 43.632536,
  lng: 3.862517,
};
const polytechMontpellierZoom = 13;

const whereIsCharlieIcon = new Icon({
  iconUrl:
    "https://i.postimg.cc/c0jFD0HL/DALL-E-2023-12-07-22-30-30-Create-a-simple-cartoon-character-resembling-a-villainous-version-of-W.png?dl=1",
  iconSize: [125, 125], // size of the icon
  iconAnchor: [75, 0], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const arabIcon = new Icon({
  iconUrl: "https://i.postimg.cc/8zx3QfL1/klipartz-com-2.png",
  iconSize: [125, 125], // size of the icon
  iconAnchor: [35, 5], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const LastView = (): JSX.Element => {
  const router = useRouter();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const step = JSON.parse(localStorage.getItem("step") ?? "3");
      if (step) {
        setStep(step);
      }
    }
  }, []);

  const stepToCoord = (step: number): { lat: number; lng: number } => {
    switch (step) {
      case 0:
        return amazonieCoords;
      case 1:
        return chinaCoords;
      case 2:
        return middleEastCoords;
      case 3:
        return polytechMontpellierCoords;
      default:
        return { lat: 0, lng: 0 };
    }
  };

  const stepToZoom = (step: number): number => {
    switch (step) {
      case 0:
        return amazonieZoom;
      case 1:
        return chinaZoom;
      case 2:
        return middleEastZoom;
      case 3:
        return polytechMontpellierZoom;
      default:
        return 5;
    }
  };

  return (
    <MapContainer
      center={stepToCoord(step)}
      dragging={false}
      scrollWheelZoom={false}
      style={{ height: "100vh", width: "100vw" }}
      zoom={stepToZoom(step)}
      zoomControl={false}
    >
      <UpdateMapPosition center={stepToCoord(step)} zoom={stepToZoom(step)} />
      <TileLayer
        url={
          "https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=94a1d5898fdc4af89e6e0ef72195a05a"
        }
      />
      <Marker
        eventHandlers={{ click: () => router.push("/ouEstCharlie/menu") }}
        icon={whereIsCharlieIcon}
        position={amazonieCoords}
      >
        <Tooltip
          className={"cursor-pointer"}
          direction={"top"}
          interactive
          permanent
        >
          <p className={"text-center"}>Cliquer ici pour jouez à</p>
          <p className={"text-center font-bold"}>Où est Charlie en Amazonie</p>
        </Tooltip>
      </Marker>
      <Marker
        eventHandlers={{ click: () => router.push("/snake") }}
        icon={whereIsCharlieIcon}
        position={chinaCoords}
      >
        <Tooltip
          className={"cursor-pointer"}
          direction={"top"}
          interactive
          permanent
        >
          <p className={"text-center"}>Cliquer ici pour jouez à</p>
          <p className={"text-center font-bold"}>Snake en Chine</p>
        </Tooltip>
      </Marker>
      <Marker
        eventHandlers={{ click: () => router.push("/explosion") }}
        icon={arabIcon}
        position={middleEastCoords}
      >
        <Tooltip
          className={"cursor-pointer"}
          direction={"top"}
          interactive
          permanent
        >
          <p className={"text-center"}>Cliquer ici pour jouez à</p>
          <p className={"text-center font-bold"}>
            Exploser des arbres au Moyen-Orient
          </p>
        </Tooltip>
      </Marker>
      <Marker
        eventHandlers={{
          click: () => {
            let errorMessage = false;
            let value = "";
            while (value !== "invariant") {
              value =
                prompt(
                  (errorMessage ? "Faux ! " : "") +
                    "Rentrer le code pour sauver le monde !",
                ) ?? "";
              errorMessage = true;
            }
            router.push("/the-end");
          },
        }}
        icon={whereIsCharlieIcon}
        position={polytechMontpellierCoords}
      >
        <Tooltip
          className={"cursor-pointer"}
          direction={"top"}
          interactive
          permanent
        >
          <p className={"text-center"}>Cliquer ici pour rentrer le code</p>
          <p className={"text-center font-bold"}>pour sauver le monde</p>
        </Tooltip>
      </Marker>
    </MapContainer>
  );
};

export default dynamic(() => Promise.resolve(LastView));
