// pages/assignments.tsx
import React, { useState } from "react";
import StepProgress from "../components/StepProgress";
import { FormsAssignment } from "../components/FormAssignemnt";
import { ButtonOutline } from "../components/Button";
import NavigationButton from "../components/NavigationButton";

export default function AssignmentsPage() {
  const [showForm, setShowForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = ["1. Assignment info", "2. Grading criteria", "3. Overview"];

  const handleCreateAssignment = () => {
    setShowForm(true);
    setCurrentStep(0);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <FormsAssignment />;
      case 1:
        return <p className="text-gray-600">Grading criteria step placeholder</p>;
      case 2:
        return <p className="text-gray-600">Overview step placeholder</p>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">Assignments</h1>

      {!showForm ? (
        <>
          <p className="text-gray-600">You don't have any assignments yet</p>
          <div className="h-4" />
          <ButtonOutline buttonname="Create assignment" onClick={handleCreateAssignment} />
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
