// src/components/StudentGradingTabs.tsx
"use client";

import * as React from "react";
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DynamicGradingTable } from "./DynamicGradingTable";
import { cn } from "@/lib/utils";

// --- Interfaces and Data (no changes) ---
interface StudentGradingData {
  id: string; name: string;
  rubricSelections: Record<string, number | null>; personalFeedback: string;
}
const SAMPLE_STUDENTS = [
  { id: "student-1", name: "Ana Maria Gomez" }, { id: "student-2", name: "Alehandro Fernandez" },
  { id: "student-3", name: "Gabriel Lopez" }, { id: "student-4", name: "Elena Martinez" },
  { id: "student-5", name: "Beatriz Torrez" },
];
const RUBRIC_ITEM_IDS_FOR_INITIALIZATION = [
  "sub-1a", "sub-1b", "sub-1c", "row-2", "row-3"
];
const initializeRubricSelections = (): Record<string, number | null> => {
  const initialSelections: Record<string, number | null> = {};
  RUBRIC_ITEM_IDS_FOR_INITIALIZATION.forEach(id => { initialSelections[id] = null; });
  return initialSelections;
};

export function StudentGradingTabs({ className }: { className?: string }) {
  const [studentsData, setStudentsData] = React.useState<StudentGradingData[]>(() => {
    return SAMPLE_STUDENTS.map((student, index) => {
      let initialSelections = initializeRubricSelections();
      let initialFeedback = "";
      if (index === 0 || 1 || 2 ||3 ||4 ||5) {
        initialSelections = {
          ...initialSelections, "sub-1a": 6, "sub-1b": 5, "sub-1c": 8, "row-2": 7, "row-3": 6,
        };
      }
      return { ...student, rubricSelections: initialSelections, personalFeedback: initialFeedback };
    });
  });

  const [activeTab, setActiveTab] = React.useState<string>(SAMPLE_STUDENTS[0]?.id || "");

  React.useEffect(() => {
    if (!activeTab && SAMPLE_STUDENTS.length > 0) {
        setActiveTab(SAMPLE_STUDENTS[0].id);
    }
  }, [activeTab]);

  const handleRubricSelectForStudent = (studentId: string, itemId: string, value: number) => {
    setStudentsData((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? { ...s, rubricSelections: { ...s.rubricSelections, [itemId]: s.rubricSelections[itemId] === value ? null : value } }
          : s
      )
    );
  };
  const handleFeedbackChangeForStudent = (studentId: string, feedback: string) => {
    setStudentsData((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, personalFeedback: feedback } : s))
    );
  };

  if (!studentsData.length) {
    return <div className="p-4">No students to display.</div>;
  }
  
  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      orientation="vertical"
      className={cn(
        "w-full",
        "grid grid-cols-[auto_1fr] gap-x-6 md:gap-x-8", // TabsContent is in the '1fr' column, so it expands
        className
      )}
    >
      <TabsList
        className={cn(
          "flex flex-col items-start h-auto p-0 bg-transparent",
          "w-[200px] md:w-[240px] space-y-1"
        )}
      >
        {studentsData.map((student) => (
          <TabsTrigger
            key={student.id}
            value={student.id}
            className={cn(
              "w-full justify-start text-left px-3 py-2 font-medium rounded-md text-sm",
              "border border-gray-200 dark:border-gray-700",
              "data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 data-[state=active]:shadow-sm data-[state=active]:border-gray-300 dark:data-[state=active]:border-gray-600",
              "dark:data-[state=active]:bg-neutral-700 dark:data-[state=active]:text-neutral-50",
              "data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-accent data-[state=inactive]:hover:text-accent-foreground"
            )}
          >
            {student.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {studentsData.map((student) => (
        <TabsContent
          key={student.id}
          value={student.id}
          // This container expands due to '1fr' in parent grid.
          // DynamicGradingTable inside it, with w-full, will also expand.
          className="mt-0 min-w-0 data-[state=inactive]:hidden"
        >
          <h2 className="text-xl font-semibold mb-5">
            Grading: {student.name}
          </h2>
          <DynamicGradingTable
            selectedRubrics={student.rubricSelections}
            onRubricSelect={(itemId, value) => handleRubricSelectForStudent(student.id, itemId, value)}
          />
          <div className="mt-8">
            <Label htmlFor={`feedback-${student.id}`} className="text-base font-medium">
              Personal Feedback
            </Label>
            <Textarea
              id={`feedback-${student.id}`}
              value={student.personalFeedback}
              onChange={(e) => handleFeedbackChangeForStudent(student.id, e.target.value)}
              placeholder={`Write personal feedback for ${student.name}...`}
              className="mt-2 min-h-[100px] md:min-h-[50px]"
            />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}