// pages/index.tsx
import React from "react";
import { AlertDialogDemo } from "../components/Alert";
import { ComboboxDemo } from "../components/Comobox";
import { InputDemo } from "../components/Field";
import { InputForm } from "../components/Formexample";
import { ChartAverageAttendence, ChartWeightedAverage } from "../components/Charts";

export default function Home() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-600">
        test dashboard
      </p>
      <div className="h-4" />  {/* This is your "extra white line" */}
        <ChartWeightedAverage/>
        <div className="h-4" />  {/* This is your "extra white line" */}
        <ChartAverageAttendence/>

    </>
  );
}
