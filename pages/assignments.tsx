// pages/assignments.tsx
import React, { useState } from "react"
import StepProgress from "../components/StepProgress"
import { FormsAssignment } from "../components/FormAssignemnt"
import { ButtonOutline } from "../components/Button"
import { Button } from "@/components/ui/button"
import NavigationButton from "../components/NavigationButton"
import { FormsAssignmentNew } from "../components/FormAssignemntNew"
import { DynamicCriteriaBuilder } from "../components/DynamicCriteriaBuilder copy 2"
import { StaticOverviewTable } from "../components/StaticOverviewTable"
import FinishButtonWithDialog from "../components/FinishButtonWithDialog"
import { showCustomToast } from "../components/CustomToast"

export default function AssignmentsPage() {
  const [showForm, setShowForm] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const steps = ["1. Assignment info", "2. Grading criteria", "3. Overview"]

  const handleCreateAssignment = () => {
    setShowForm(true)
    setCurrentStep(0)
  }

  const handlePublish = () => {
    console.log("Assignment published")
    showCustomToast("Assignment Published", handleUndo)  
  }

  const handleUndo = () => {
    console.log("Undo assignment publish")
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <FormsAssignmentNew />
      case 1:
        return <DynamicCriteriaBuilder />
      case 2:
        return <StaticOverviewTable />
      default:
        return null
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">Assignments</h1>

      {!showForm ? (
        <>
          <p className="text-muted-foreground">You don't have any assignments yet.</p>
          <div className="h-4" />
          <Button
            onClick={handleCreateAssignment}
            className="bg-gray-900 text-white hover:bg-gray-800"
          >
            Create Assignment
          </Button>
        </>
      ) : (
        <>
          <StepProgress steps={steps} currentStep={currentStep} />
          <div className="h-6" />
          {renderStepContent()}

          <div className="mt-8 flex justify-between">
  <NavigationButton
    label="Back"
    direction="left"
    onClick={() => {
      if (currentStep === 0) {
        setShowForm(false)
      } else {
        setCurrentStep(currentStep - 1)
      }
    }}
    className="bg-gray-900 text-white hover:bg-gray-800"  // ✅ same style as Finish
  />

  {currentStep < steps.length - 1 ? (
    <NavigationButton
      label="Next"
      direction="right"
      onClick={() => setCurrentStep(currentStep + 1)}
      className="bg-gray-900 text-white hover:bg-gray-800"  // ✅ same style as Finish
    />
  ) : (
    <FinishButtonWithDialog
      onConfirm={handlePublish}
      onUndo={handleUndo}
      buttonLabel="Publish"
    />
  )}
</div>

        </>
      )}
    </div>
  )
}
