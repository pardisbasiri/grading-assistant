// src/pages/Dashboard2.tsx
"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SelectScrollable } from "../components/SelectStudent";
import { TableStudentInfo } from "../components/TableStudentInfo";
import { ChartsSideBySide } from "../components/ChartsStudent";
import { SendMessageCard } from "../components/SendMessageCard";

const ANA_MARIA_SELECT_VALUE = "anaMariaGomez";

interface StudentData {
  id: string;
  name: string;
}

const ANA_MARIA_DATA: StudentData = {
  id: "ana-maria-gomez-unique-id",
  name: "Ana Maria Gomez"
};

export default function Dashboard2() {
  const [selectedStudentValue, setSelectedStudentValue] = useState<string>(ANA_MARIA_SELECT_VALUE);

  const handleStudentSelect = (valueFromSelect: string) => {
    setSelectedStudentValue(valueFromSelect);
  };

  const showAnaMariaDetails = selectedStudentValue === ANA_MARIA_SELECT_VALUE;

  return (
    <div className="p-6 space-y-10">
      <div className="flex items-center gap-3">
        <Button asChild variant="outline" size="icon">
          <Link href="/dashboard" aria-label="Back to Dashboard">
            <ArrowLeft />
          </Link>
        </Button>
        <h1 className="text-4xl font-bold">
          {showAnaMariaDetails ? `${ANA_MARIA_DATA.name}'s Dashboard & Alerts` : "Student Details"}
        </h1>
      </div>

      <div>
        <SelectScrollable
          onSelect={handleStudentSelect}
          initialValue={selectedStudentValue}
        />
      </div>

      {showAnaMariaDetails ? (
        // If "Ana Maria Gomez" is selected, show her components
        <>
          <div>
            <TableStudentInfo studentData={ANA_MARIA_DATA} />
          </div>
          <div>
            <ChartsSideBySide studentId={ANA_MARIA_DATA.id} />
          </div>
          <div className="mt-8">
            <SendMessageCard />
          </div>
        </>
      ) : (
        <div className="text-center border rounded-md p-10 mt-6 bg-muted/50">
          <p className="text-lg font-medium text-muted-foreground">
            This page has not been developed yet for the selected student.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            (Prototype currently supports full details for Ana Maria Gomez only)
          </p>
        </div>
      )}
    </div>
  );
}