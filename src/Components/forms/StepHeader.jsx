const StepHeader = ({ steps,childclassname="flex gap-2 px-2.5 border-b-3 items-center transition",notcurrentsytle="border-white hover:text-green-800",iscurrentstyle="border-green-700 text-green-800", currentStep, onStepClick,classname="flex justify-start items-start  px-4 py-0 m-0 *:h-12 min-h-fit max-h-fit  gap-5 border-b border-gray-200 " }) => {
  return (
    <div className={`${classname}`}>
      {steps.map((step, index) => (
        <button
          key={index}
          onClick={() => onStepClick(index)}
          className={`${childclassname} ${
            currentStep === index
              ? iscurrentstyle
              : notcurrentsytle
          }`}
        >
          {step}
        </button>
      ))}
    </div>
  );
};
export default StepHeader