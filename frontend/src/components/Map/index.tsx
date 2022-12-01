import React from "react";
import { useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
} from "@react-google-maps/api";
import { useListContext } from "../../appContext";
import { isEmpty } from "../../utils/utils";


type LatLngLiteral = google.maps.LatLngLiteral;
// type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

export default function Map() {
  const mapRef =  useRef<GoogleMap>()
  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 46.1390437, lng: 2.434835 }),
    []
  );
  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI : true,
      clickableIcons : false,
    }),
    []
  )

  const onLoad = useCallback((map : any) => (mapRef.current = map), []);
  const { list } = useListContext()

  return (
    <div className="container">      
      <div className="map">
        <GoogleMap
          zoom={6}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        >
          {!(isEmpty(list![0])) &&
            list!.map((point) => {
              if (point.status === true) {
                console.log(point.status)
                return <Marker
                  key={point._id}
                  position={{
                    lat : point.position[0],
                    lng : point.position[1]
                  }}
                />
              }
          })}
          
        </GoogleMap>
      </div>
    </div>
  )
}

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};
