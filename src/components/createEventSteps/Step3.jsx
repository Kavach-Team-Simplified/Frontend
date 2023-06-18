const Step3 = ({ setStepNo, setEventData, eventData }) => {
  return (
    <div>
      <div>Step3</div>
      <button onClick={() => setStepNo(2)}>Prev</button>
      <button onClick={() => alert("Done")}>Submit</button>
    </div>
  );
};

export default Step3;
