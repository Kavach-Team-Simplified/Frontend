import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { Icon } from "leaflet";

import L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet/dist/leaflet.css";

import "leaflet-control-geocoder/dist/Control.Geocoder.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png").default,
  iconUrl: require("leaflet/dist/images/marker-icon.png").default,
  shadowUrl: require("leaflet/dist/images/marker-shadow.png").default,
});

function LocationMarker() {
  const [myPosition, setMyPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setMyPosition([position.coords.latitude, position.coords.longitude]);
    });
  }, []);
  useEffect(() => {
    if (myPosition) {
      map.flyTo(myPosition, 17, {
        animate: true,
        duration: 1,
      });
    }
  }, [myPosition]);

  return myPosition === null ? null : (
    <Marker
      position={myPosition}
      icon={
        new Icon({
          iconUrl: "/assets/myLocation.svg",
          iconSize: [30, 30],
        })
      }
    >
      <Popup>You are here</Popup>
    </Marker>
  );
}

const SearchLocation = ({ provider }) => {
  const map = useMap();
  const searchControl = new GeoSearchControl({
    provider: provider,

    showMarker: true,
    // showPopup: true,
    autoClose: false,
    retainZoomLevel: false,
    animateZoom: true,

    searchLabel: "Enter address, please",
    keepResult: true,
  });
  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, []);
  return null;
};

const AddMarkerOnClick = ({ markerAddSelected, setEventData }) => {
  const [markers, setMarkers] = useState([]);
  const map = useMapEvents({
    click(e) {
      if (markerAddSelected) {
        const newMarker = e.latlng;
        setMarkers([...markers, newMarker]);
        setEventData((prev) => ({
          ...prev,
          selectedRegion: {
            region: [...markers, newMarker],
          },
        }));
      }
    },
  });

  return (
    <>
      {markers.map((position, idx) => (
        <Marker
          key={`marker-${idx}`}
          position={position}
          icon={
            new Icon({
              iconUrl: "/assets/mapMarker.svg",
              iconSize: [30, 30],
            })
          }
        >
          <Popup>
            <button
              onClick={() => {
                setMarkers(markers.filter((_, i) => i !== idx));
              }}
            >
              Delete
            </button>
            <span>Marker {idx}</span>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

const LocateOnMap = ({ locateOnMap }) => {
  const map = useMap();
  useEffect(() => {
    if (locateOnMap) {
      map.flyTo(locateOnMap.bounds[0], 17, {
        animate: true,
        duration: 1,
      });
    }
  }, [locateOnMap]);

  return (
    <>
      {locateOnMap ? (
        <Marker
          draggable={false}
          position={locateOnMap.bounds[0]}
          icon={
            new Icon({
              iconUrl: "/assets/searchedLocation.svg",
              iconSize: [30, 30],
            })
          }
        >
          <Popup>{locateOnMap.label && <span>{locateOnMap.label}</span>}</Popup>
        </Marker>
      ) : null}
    </>
  );
};

const InteractiveMap = ({ locateOnMap, setEventData, stepNo }) => {
  const [markerAddSelected, setMarkerAddSelected] = useState(false);
  const provider = new OpenStreetMapProvider();
  return (
    <>
      <div className="relative">
        <button
          onClick={() => {
            setMarkerAddSelected(!markerAddSelected);
          }}
          className="absolute top-0 right-0 z-[1000] bg-white p-2 rounded-lg"
        >
          {markerAddSelected ? "Stop" : "Add Marker"}
        </button>
        <MapContainer
          style={{ height: "400px", width: "100%" }}
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={true}
        >
          {/* </div> */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {stepNo === 1 && (
            <>
              <LocateOnMap locateOnMap={locateOnMap} />
              <LocationMarker />
              <AddMarkerOnClick
                markerAddSelected={markerAddSelected}
                setEventData={setEventData}
              />
            </>
          )}
        </MapContainer>
      </div>
    </>
  );
};

export default InteractiveMap;
