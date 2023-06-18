import PageWrapper from "@/components/Pagewrapper";
// import Step1 from "@/components/createEventSteps/Step1";
// import Step2 from "@/components/createEventSteps/Step2";
// import Step3 from "@/components/createEventSteps/Step3";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Step1 = dynamic(() => import("@/components/createEventSteps/Step1"), {
  ssr: false,
});
const Step2 = dynamic(() => import("@/components/createEventSteps/Step2"), {
  ssr: false,
});
const Step3 = dynamic(() => import("@/components/createEventSteps/Step3"), {
  ssr: false,
});

const CreateEvent = () => {
  const [windowIsLoaded, setWindowIsLoaded] = useState(false);
  const [stepNo, setStepNo] = useState(1);

  const [eventData, setEventData] = useState({
    selectedRegion: null,
    name: null,
    description: null,
    time: {
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
    },
    officialsCSV: null,
    noOfOfficialsByML: null,
    selectedOfficials: [],
  });
  const stepMap = {
    1: (
      <Step1
        setStepNo={setStepNo}
        setEventData={setEventData}
        eventData={eventData}
      />
    ),
    2: (
      <Step2
        setStepNo={setStepNo}
        setEventData={setEventData}
        eventData={eventData}
      />
    ),
    3: (
      <Step3
        setStepNo={setStepNo}
        setEventData={setEventData}
        eventData={eventData}
      />
    ),
  };
  useEffect(() => {}, []);

  return <PageWrapper heading={"Create Event"}>{stepMap[stepNo]}</PageWrapper>;
};

export default CreateEvent;
