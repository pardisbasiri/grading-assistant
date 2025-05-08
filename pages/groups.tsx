import React, { useState } from "react";
import StepProgress from "../components/StepProgress";
import { SliderDemo3 as Slider } from "../components/Slider";
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
          <p className="text-gray-600">You don’t have any groups yet.</p>
          <div className="h-4" /><Button onClick={handleCreateClick} className="bg-[#1F2937] text-white">
  Create Group
</Button><Button onClick={handleCreateClick} className="bg-primary text-white"> Create groups </Button>
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
                    Drag and drop students to assign them to different groups.
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
                
                <div className="mt-4 mb-2">
    <div className="border rounded-md p-4 w-fit">
      <p className="font-semibold mb-2">Overview:</p>
      <div className="flex flex-col space-y-1">
        <div className="flex justify-between w-64">
          <span className="text-sm text-gray-700">Amount of students</span>
          <span className="text-sm font-medium text-gray-900">30</span>
        </div>
        <div className="flex justify-between w-64">
          <span className="text-sm text-gray-700">Amount of groups</span>
          <span className="text-sm font-medium text-gray-900">6</span>
        </div>
        <div className="flex justify-between w-64">
          <span className="text-sm text-gray-700">Students per group</span>
          <span className="text-sm font-medium text-gray-900">5</span>
        </div>
      </div>
    </div>
  </div>
              </>
            )}
          </div>
  
          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <NavigationButton
              label="Back"
              direction="left"
              onClick={handleBack}
            />
            <NavigationButton
              label={currentStep === steps.length - 1 ? "Publish" : "Next"}
              direction="right"
              onClick={handleNext}
            />
          </div>
        </>
      )}
    </div>
  );
  
}
