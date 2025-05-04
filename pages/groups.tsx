import React, { useState } from "react";
import StepProgress from "../components/StepProgress";
import { SliderDemo as Slider } from "../components/Slider";
import { ButtonOutline } from "../components/Button";
import NavigationButton from "../components/NavigationButton";

export default function GroupsPage() {
  const [creatingGroups, setCreatingGroups] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = ["1. Group division", "2. Student selection", "3. Overview"];

  const handleCreateClick = () => {
    setCreatingGroups(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">Groups</h1>

      {!creatingGroups ? (
        <>
          <p className="text-gray-600">You don’t have any groups yet</p>
          <div className="h-4" />
          <ButtonOutline buttonname="Create Groups" onClick={handleCreateClick} />
        </>
      ) : (
        <>
          <StepProgress steps={steps} currentStep={currentStep} />
          <div className="mt-6">
            {currentStep === 0 && (
              <>
                <p className="text-gray-600 mb-4">
                  Select number of groups that you want to create
                </p>
                <Slider />
              </>
            )}

            {currentStep === 1 && (
              <>
                <p className="text-gray-600 mb-4">Select students for each group</p>
                {/* Replace with real student selection UI */}
              </>
            )}

            {currentStep === 2 && (
              <>
                <p className="text-gray-600 mb-4">Overview of group setup</p>
                {/* Replace with real overview UI */}
              </>
            )}
          </div>

          {/* Navigation Buttons */}
          {currentStep > 0 && (
            <div className="mt-8 flex justify-between">
              <NavigationButton
                label="Back"
                direction="left"
                onClick={() => setCurrentStep(currentStep - 1)}
              />
              {currentStep < 2 ? (
                <NavigationButton
                  label="Next"
                  direction="right"
                  onClick={() => setCurrentStep(currentStep + 1)}
                />
              ) : (
                <NavigationButton
                  label="Finish"
                  direction="right"
                  onClick={() => {
                    // Final submission logic here
                  }}
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

