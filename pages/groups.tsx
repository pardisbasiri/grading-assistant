import React, { useState } from "react";
import StepProgress from "../components/StepProgress";
import { SliderDemo as Slider } from "../components/Slider";
import { ButtonOutline } from "../components/Button";
import NavigationButton from "../components/NavigationButton";
import StudentGroupManager from "../components/StudentGrouping/StudentGroupManager";
import { Button } from "@/components/ui/button";
import { Shuffle, Plus } from "lucide-react";

export default function GroupsPage() {
  const [creatingGroups, setCreatingGroups] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = ["1. Group Division", "2. Student Selection", "3. Overview"];

  const handleCreateClick = () => {
    setCreatingGroups(true);
    setCurrentStep(0);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAddGroup = () => {
    window.dispatchEvent(new CustomEvent("add-group"));
  };

  const handleShuffleStudents = () => {
    window.dispatchEvent(new CustomEvent("shuffle-students"));
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">Groups</h1>
  
      {!creatingGroups ? (
        <>
          <p className="text-gray-600">You don’t have any groups yet</p>
          <div className="h-4" />
          <ButtonOutline buttonname="Create groups" onClick={handleCreateClick} />
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
                <div className="flex justify-between items-center mb-4">
                  <p className="text-gray-600">
                    Assign students to groups by dragging them below
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleAddGroup}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Group
                    </Button>
                    <Button variant="outline" onClick={handleShuffleStudents}>
                      <Shuffle className="w-4 h-4 mr-2" />
                      Shuffle
                    </Button>
                  </div>
                </div>
                <StudentGroupManager />
              </>
            )}
  
            {currentStep === 2 && (
              <>
                <p className="text-gray-600 mb-4">Overview of group setup</p>
                {/* Final review logic or confirmation UI can go here */}
              </>
            )}
          </div>
  
          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <NavigationButton
              label="Back"
              direction="left"
              onClick={handleBack}
              disabled={currentStep === 0}
            />
            <NavigationButton
              label={currentStep === steps.length - 1 ? "Finish" : "Next"}
              direction="right"
              onClick={handleNext}
            />
          </div>
        </>
      )}
    </div>
  );
  
}
