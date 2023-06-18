import { OpenStreetMapProvider } from "leaflet-geosearch";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";

// import InteractiveMap from "../InteractiveMap";
const InteractiveMap = dynamic(() => import("@/components/InteractiveMap"), {
  ssr: false,
});
const Step1 = ({ setStepNo, setEventData, eventData }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [locateOnMap, setLocateOnMap] = useState(null);
  const inputRef = useRef(null);
  const handleSearch = () => {
    const provider = new OpenStreetMapProvider();
    provider.search({ query: inputRef.current.value }).then((results) => {
      setSearchResults(results);
      // console.log(results);
    });
  };

  return (
    <div>
      <div className="p-1 rounded-full border-darkerBlue border flex w-1/2 items-center gap-x-3 relative">
        <BiSearch className="text-darkerBlue text-3xl ml-2" />
        <input
          type="text"
          placeholder="Search your region"
          ref={inputRef}
          onChange={() => {
            if (inputRef.current.value === "") {
              setSearchResults([]);
            }
          }}
          className="grow p-2 mr-3 focus:outline-none placeholder:text-darkerBlue placeholder:font-semibold text-darkerBlue text-lg"
        />
        {
          <div className="absolute top-16 z-[100000] bg-white w-full flex flex-col divide-y-2 border-2 rounded-lg ">
            {searchResults.map((result) => (
              <div
                key={result.label}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setLocateOnMap(result);
                  console.log(result);
                  setSearchResults([]);
                  inputRef.current.value = "";
                }}
              >
                {result.label}
              </div>
            ))}
          </div>
        }
        <button onClick={handleSearch}>Search</button>
      </div>

      <InteractiveMap
        setEventData={setEventData}
        locateOnMap={locateOnMap}
        stepNo={1}
      />
      {/* <InteractiveMap /> */}
      <button
        onClick={() => {
          console.log(eventData.selectedRegion);
          setStepNo(2);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Step1;
