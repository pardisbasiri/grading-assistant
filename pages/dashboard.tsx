// pages/index.tsx
import React from "react";
import { AlertDialogDemo } from "../components/Alert";
import { ComboboxDemo } from "../components/Comobox";
import { TabsDemo } from "../components/Tabs";

export default function Home() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-600">
        test dashboard
      </p>
      <div className="h-4" />  {/* This is your "extra white line" */}
        <AlertDialogDemo />
        <div className="h-4" />  {/* This is your "extra white line" */}
        <ComboboxDemo />
        <div className="h-12" />  {/* This is your "extra white line" */}
        <TabsDemo />
    </>
  );
}
