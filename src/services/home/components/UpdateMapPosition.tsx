import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const UpdateMapPosition = ({
  center,
  zoom,
}: {
  center: { lat: number; lng: number };
  zoom: number;
}): null => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, map, zoom]);

  return null;
};

export default UpdateMapPosition;
