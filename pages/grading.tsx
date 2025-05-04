// pages/index.tsx
import React from "react";
import { DynamicCriteriaBuilder } from "../components/DynamicCriteriaBuilder copy 2";
import { StaticOverviewTable } from "../components/StaticOverviewTable";
import { AlertDialogPublish, AlertDialogSave } from "../components/Alert";

export default function grading() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-4">Grading</h1>
      <p className="text-gray-600">
        
      </p>
      <DynamicCriteriaBuilder/>
    </>
  );
}
