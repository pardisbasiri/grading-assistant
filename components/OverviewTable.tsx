// src/components/StudentGradeTable.tsx
"use client";

import * as React from "react";

// Import Shadcn UI Components
import {
  Table,
  TableBody,
  // TableCaption, // Not needed for this example
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

// --- Interfaces and Type Definitions ---

// Define the structure for student grade data
interface StudentGrade {
  id: string; // Unique identifier for the key prop
  studentName: string;
  grade: number; // Using number for grade
  comments?: string; // Comments are optional
}

// --- Hardcoded Data ---
// Data based on the provided image
const STUDENT_GRADE_DATA: StudentGrade[] = [
  { id: "sg-1", studentName: "Alejandro Fernandez", grade: 5.8 },
  { id: "sg-2", studentName: "Ana María Gomez", grade: 5.8, comments: "Focus more on user needs" },
  { id: "sg-3", studentName: "Gabriel Lopez", grade: 5.8 },
  { id: "sg-4", studentName: "Eelena Martinez", grade: 5.8 }, // Typo in image? Assuming 'Elena' but keeping as shown.
  { id: "sg-5", studentName: "Beatriz torrez", grade: 5.8 }, // Kept lowercase 't' as in image
];
// --- End Data Definitions ---


// --- The Student Grade Table Component ---
export function StudentOverviewTable({ className }: { className?: string }) {

  // --- Component JSX ---
  return (
    // Use cn for potential custom styling and add margin like the original example
    <div className={cn("mt-10 space-y-4", className)}>

      {/* Optional: Add a title if needed */}
      {/* <h2 className="text-xl font-semibold">Student Grades:</h2> */}

      {/* Table Container */}
      {/* Apply similar container styling as the original example */}
      <div className="border rounded-lg overflow-hidden shadow-sm">
        <Table>
          {/* Table Header */}
          {/* Use muted background for header like the original */}
          <TableHeader className="bg-muted/50">
            <TableRow>
              {/* Define column headers, make them bold */}
              <TableHead className="w-[40%] pl-4 font-semibold">Student</TableHead>
              <TableHead className="w-[20%] font-semibold">grade</TableHead>
              <TableHead className="font-semibold pr-4">Comments</TableHead>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {/* Map over the STUDENT_GRADE_DATA */}
            {STUDENT_GRADE_DATA.map((student: StudentGrade) => ( // Explicit type for item
              <TableRow key={student.id} className="border-b hover:bg-muted/20">
                 {/* Render data cells */}
                 {/* Use font-medium for the first column like the original example */}
                 <TableCell className="pl-4 font-medium">{student.studentName}</TableCell>
                 {/* Format grade to one decimal place */}
                 <TableCell>{student.grade.toFixed(1)}</TableCell>
                 {/* Display comments or an empty cell if none */}
                 <TableCell className="pr-4">
                    {student.comments ? student.comments : ''}
                 </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Optional: Add buttons or other elements below the table if needed */}
      {/* <div className="flex justify-start space-x-3 pt-4"> ... buttons ... </div> */}

    </div> // End of main container div
  );
} // End of StudentGradeTable component