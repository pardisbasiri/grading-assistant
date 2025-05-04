import React from "react";

interface StepProgressProps {
  steps: string[];
  currentStep: number;
}

const StepProgress: React.FC<StepProgressProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex w-full items-center">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <React.Fragment key={index}>
            {/* Left connector line */}
            {index > 0 && (
              <div className="flex-1 border-t border-gray-300" />
            )}

            {/* Step circle */}
            <div
              className={`rounded-full px-4 py-1 border text-sm font-medium whitespace-nowrap z-10
                ${
                  isActive
                    ? "bg-gray-800 text-white border-gray-800"
                    : isCompleted
                    ? "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
                    : "text-gray-800 border-gray-300"
                }`}
            >
              {step}
            </div>

            {/* Right connector line */}
            {index < steps.length - 1 && (
              <div className="flex-1 border-t border-gray-300" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepProgress;

