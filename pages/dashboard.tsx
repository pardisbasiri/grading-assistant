import React from "react";
import { ComboboxDemo } from "../components/Comobox";
import { TabsDemo } from "../components/Tabs";
import { ChartsSideBySide } from "../components/Charts";  // <-- Use this!

export default function Home() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-600">test dashboard</p>
      <div className="h-4" />
      <ChartsSideBySide />
      <div className="h-12" />
    </>
  );
}
