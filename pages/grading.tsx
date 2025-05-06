// pages/grading.tsx
import React, { useState } from "react";
import StepProgress from "../components/StepProgress";
import { FormsAssignment } from "../components/FormAssignemnt";
import { ButtonOutline, ButtonOutlineBig } from "../components/Button";
import NavigationButton from "../components/NavigationButton";
import { FormsAssignmentNew } from "../components/FormAssignemntNew";
import { DynamicCriteriaBuilder } from "../components/DynamicCriteriaBuilder copy 2";
import { StaticOverviewTable } from "../components/StaticOverviewTable";
import { GradingOne } from "../components/Grading1";
import { StudentGradingTabs } from "../components/Grading2";

export default function GradingPage() {
  const [showForm, setShowForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = ["1. Group grading", "2. Personal grading", "3. Overview"];

  const handleCreateAssignment = () => {
    setShowForm(true);
    setCurrentStep(0);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return  <GradingOne/>
      case 1:
        return <p className="text-gray-600">Personal grading</p>;
      case 2:
        return <p className="text-gray-600">Summary</p>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">Grading</h1>

      {!showForm ? (
        <>
          <p className="text-gray-600">Choose assignment to grade:</p>
          <div className="h-8" />
          <ButtonOutlineBig buttonname="Finding user needs" onClick={handleCreateAssignment} />
        </>
      ) : (
        <>
          <StepProgress steps={steps} currentStep={currentStep} />
          <div className="h-6" />
          {renderStepContent()}

          {/* Navigation buttons */}
          <div className="mt-8 flex justify-between">
            {currentStep > 0 ? (
              <NavigationButton
                label="Back"
                direction="left"
                onClick={() => setCurrentStep(currentStep - 1)}
              />
            ) : (
              <div /> // Placeholder for layout alignment
            )}

            {currentStep < steps.length - 1 ? (
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
                  // Finalize logic here
                }}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}