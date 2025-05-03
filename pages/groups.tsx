// pages/index.tsx
import React from "react";
import { ButtonOutline } from "../components/Button";
import { AlertDialogDemo } from "../components/Alert";
import { ComboboxDemo } from "../components/Comobox";
import { InputDemo } from "../components/Field";
import { InputForm } from "../components/Formexample";


export default function Home() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-4">Groups</h1>
      <p className="text-gray-600">
        You dont have any groups yet </p>
        <div className="h-4" />  {/* This is your "extra white line" */}
        <ButtonOutline buttonname="Create groups"/>

    </>
  );
}
