const Step2 = ({ setStepNo, setEventData, eventData }) => {
  return (
    <div>
      <div>Step2</div>
      <button onClick={() => setStepNo(1)}>Prev</button>
      <button onClick={() => setStepNo(3)}>Next</button>
    </div>
  );
};

export default Step2;
