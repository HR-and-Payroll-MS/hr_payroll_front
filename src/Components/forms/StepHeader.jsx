const StepHeader = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="flex px-4 py-0 m-0 *:h-12 min-h-fit max-h-fit  gap-5 border-b border-gray-200 justify-start items-start  ">
      {steps.map((step, index) => (
        <button
          key={index}
          onClick={() => onStepClick(index)}
          className={`flex gap-2 px-2.5 border-b-3 items-center transition ${
            currentStep === index
              ? "border-green-700 text-green-800"
              : "border-white hover:text-green-800"
          }`}
        >
          {step}
        </button>
      ))}
    </div>
  );
};
export default StepHeader