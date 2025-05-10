import React, { useState } from "react"
import StepProgress from "../components/StepProgress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import NavigationButton from "../components/NavigationButton"
import StudentGroupManager from "../components/StudentGrouping/StudentGroupManager"
import { Shuffle, Plus } from "lucide-react"
import FinishButtonWithDialog from "../components/FinishButtonWithDialog"
import { showCustomToast } from "../components/CustomToast"

export default function GroupsPage() {
  const [creatingGroups, setCreatingGroups] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [groupNumber, setGroupNumber] = useState("")
  const [divisionMethod, setDivisionMethod] = useState("")

  const steps = ["1. Group Division", "2. Student Selection", "3. Overview"]

  const handleCreateClick = () => {
    setCreatingGroups(true)
    setCurrentStep(0)
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    } else {
      setCreatingGroups(false)
    }
  }

  const handleAddGroup = () => {
    window.dispatchEvent(new CustomEvent("add-group"))
  }

  const handleShuffleStudents = () => {
    window.dispatchEvent(new CustomEvent("shuffle-students"))
  }

  const handlePublish = () => {
    console.log("Groups published")
    showCustomToast("Groups Published", handleUndo)
  }

  const handleUndo = () => {
    console.log("Undo group publish")
  }

  return (
    <div className="p-6 z-0">
      <h1 className="text-4xl font-bold mb-4">Groups</h1>

      {!creatingGroups ? (
        <>
          <p className="text-muted-foreground">You don’t have any groups yet.</p>
          <div className="h-4" />
          <Button onClick={handleCreateClick} className="bg-[#1F2937] text-white">
            Create Group
          </Button>
          <Button onClick={handleCreateClick} className="bg-primary text-white">
            Create groups
          </Button>
        </>
      ) : (
        <>
          <StepProgress steps={steps} currentStep={currentStep} />
          <div className="mt-6">
            {currentStep === 0 && (
              <div className="flex flex-col gap-6 mb-12">
                <p className="text-muted-foreground">
                  Choose how to divide the 30 students into groups
                </p>

                <div className="flex flex-col gap-2">
                  <label htmlFor="group-number" className="text-sm font-semibold">
                    How many groups do you want?
                  </label>
                  <Input
  id="group-number"
  type="number"
  min={1}
  max={30}
  value={groupNumber}
  placeholder="Enter number"
  onChange={(e) => setGroupNumber(e.target.value)}
  className="w-40 placeholder:text-muted-foreground"
/>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-sm font-semibold">
                    How would you like to divide your students?
                  </p>
                  <Select value={divisionMethod} onValueChange={setDivisionMethod}>
                    <SelectTrigger className="w-64">
                      <SelectValue
                        placeholder="Select division method"
                        className="text-muted-foreground font-normal"
                      />
                    </SelectTrigger>
                    <SelectContent className="z-50 bg-white shadow-lg">
                      <SelectItem
                        value="random"
                        className="px-2 py-1 rounded data-[highlighted]:bg-gray-100"
                      >
                        Random with customizability
                      </SelectItem>
                      <SelectItem
                        value="manual"
                        className="px-2 py-1 rounded data-[highlighted]:bg-gray-100"
                      >
                        Manually
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-muted-foreground">
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
  <div className="mt-4 mb-2">
    <div className="border rounded-xl p-6 w-full max-w-md shadow-sm">
      <p className="text-base font-semibold mb-4">Overview</p>
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Amount of students</span>
          <span className="text-sm font-medium">30</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Amount of groups</span>
          <span className="text-sm font-medium">6</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Students per group</span>
          <span className="text-sm font-medium">5</span>
        </div>
      </div>
    </div>
  </div>
)}
          </div>

          <div className="mt-8 flex justify-between">
            <NavigationButton
              label="Back"
              direction="left"
              onClick={handleBack}
              className="bg-gray-900 text-white hover:bg-gray-800"
            />
            {currentStep < steps.length - 1 ? (
              <NavigationButton
                label="Next"
                direction="right"
                onClick={handleNext}
                className="bg-gray-900 text-white hover:bg-gray-800"
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
