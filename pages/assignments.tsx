// pages/index.tsx
import { ButtonOutline } from "../components/Button";
import { FormsAssignment } from "../components/FormAssignemnt";
import React, { useState } from "react";
import { FormsAssignmentNew } from "../components/FormAssignemntNew";
import { SliderDemo } from "../components/Slider";

export default function Home() {
  // Step 1: State to track whether the form is displayed
  const [showForm, setShowForm] = useState(false);

  // Step 2: Function to handle button click and show the form
  const handleCreateAssignment = () => {
    setShowForm(true); // Update the state to show the form when the button is clicked
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-4">Assignments</h1>
      <p className="text-gray-600">
        {showForm ? "" : "You don't have any assignments yet"}
      </p>
      <div className="h-4" />  {/* This is your "extra white line" */}
      {/* Step 4: Show the button if no assignments yet, otherwise show the form */}
      {!showForm ? (
        <>
          <ButtonOutline buttonname="Create assignment" onClick={handleCreateAssignment} />
          <div className="h-4" /> {/* This is your "extra white line" */}
        </>
      ) : (
        <FormsAssignmentNew /> // This is where the form will be shown
      )}
    </>
  );
}



