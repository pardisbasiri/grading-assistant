import React, { useState } from "react"
import StepProgress from "../components/StepProgress"
import { GradingOne } from "../components/Grading1"
import { StudentGradingTabs } from "../components/Grading2"
import { AssignmentGradingCard } from "../components/AssignmentGradingCard"
import { StudentOverviewTable } from "../components/OverviewTable"
import { GroupsListView } from "../components/GroupsListView"
import NavigationButton from "../components/NavigationButton"
import FinishButtonWithDialog from "../components/FinishButtonWithDialog"
import { showCustomToast } from "../components/CustomToast"

interface Assignment {
  id: string
  name: string
  dueDate: string
  deliveryStatus: string
  gradingStatus: string
}

const assignmentsData: Assignment[] = [
  {
    id: "assign-1",
    name: "Finding user needs",
    dueDate: "20 May",
    deliveryStatus: "Delivered by all 6 groups",
    gradingStatus: "Not graded yet",
  },
]

export default function GradingPage() {
  const [showForm, setShowForm] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = ["1. Group grading", "2. Personal grading", "3. Overview"]

  const handleCreateAssignment = () => {
    setShowForm(true)
    setCurrentStep(0)
  }

  const handlePublish = () => {
    console.log("Grading published")
    showCustomToast("Grading Published", handleUndo)
  }

  const handleUndo = () => {
    console.log("Undo grading publish")
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <GroupsListView onGroup5Click={() => setCurrentStep(1)} />
      case 1:
        return <GradingOne />
      case 2:
        return <StudentGradingTabs />
      case 3:
        return <StudentOverviewTable />
      default:
        return null
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">Grading</h1>

      {!showForm ? (
        <>
          <p className="text-muted-foreground">Choose assignment to grade:</p>
          <div className="h-8" />
          {assignmentsData.map((assignmentItem) => (
            <div
              key={assignmentItem.id}
              role="button"
              tabIndex={0}
              onClick={handleCreateAssignment}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleCreateAssignment()
                }
              }}
            >
              <AssignmentGradingCard
                id={assignmentItem.id}
                name={assignmentItem.name}
                dueDate={assignmentItem.dueDate}
                deliveryStatus={assignmentItem.deliveryStatus}
                gradingStatus={assignmentItem.gradingStatus}
                onClick={handleCreateAssignment}
              />
            </div>
          ))}
        </>
      ) : (
        <>
          {currentStep > 0 && (
            <StepProgress steps={steps} currentStep={currentStep - 1} />
          )}
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
              className="bg-gray-900 text-white hover:bg-gray-800"
            />
            {currentStep > 0 &&
              (currentStep === 3 ? (
                <FinishButtonWithDialog
                  onConfirm={handlePublish}
                  onUndo={handleUndo}
                  buttonLabel="Publish"
                />
              ) : (
                <NavigationButton
                  label="Next"
                  direction="right"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="bg-gray-900 text-white hover:bg-gray-800"
                />
              ))}
          </div>
        </>
      )}
    </div>
  )
}
