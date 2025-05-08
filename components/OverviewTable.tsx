// src/components/StudentOverviewTable.tsx

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const studentsData = [
  { id: "s1", name: "Alejandro Fernandez", grade: "5.8", comments: "" },
  { id: "s2", name: "Ana Maria Gomez", grade: "5.8", comments: "Focus more on user needs" },
  { id: "s3", name: "Gabriel Lopez", grade: "5.8", comments: "" },
  { id: "s4", name: "Eelena Martinez", grade: "5.8", comments: "" },
  { id: "s5", name: "Beatriz torrez", grade: "5.8", comments: "" },
];

export function StudentOverviewTable({ className }: { className?: string }) {
  return (
    // This outer div now only handles max-width and block display for left-alignment.
    // NO PADDING HERE. Padding is handled by table cells.
    <div className={cn("w-full max-w-2xl font-sans", className)}> 
    <div className="h-6" />
      
      {/* This div is the actual visible bordered box.
          It will be flush with the left of its max-w-2xl parent. 
          Using lighter borders and header background to match the new screenshot.
      */}
      <div className="rounded-md border border-slate-300 dark:border-slate-700 overflow-x-auto bg-white dark:bg-slate-900">
        <Table className="min-w-full">
          {/* Header: Very light background (slate-50), lighter text */}
          <TableHeader className="bg-slate-50 dark:bg-slate-800">
            <TableRow className="border-b border-slate-300 dark:border-slate-700 h-[50px]">
              <TableHead 
                className="h-12 px-4 text-left align-middle 
                           font-semibold text-slate-600 dark:text-slate-300
                           border-r border-slate-300 dark:border-slate-700
                           w-[240px] sm:w-[40%]"
              >
                Student
              </TableHead>
              <TableHead 
                className="h-12 px-4 text-left align-middle 
                           font-semibold text-slate-600 dark:text-slate-300
                           border-r border-slate-300 dark:border-slate-700
                           w-[80px] sm:w-[15%]"
              >
                grade
              </TableHead>
              <TableHead 
                className="h-12 px-4 text-left align-middle 
                           font-semibold text-slate-600 dark:text-slate-300
                           w-auto sm:w-[45%]" 
              >
                Comments
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentsData.map((student) => (
              <TableRow 
                key={student.id} 
                // Removed hover effect to match screenshot
                className="border-b border-slate-300 dark:border-slate-700 last:border-b-0 h-[50px]" 
              >
                <TableCell 
                  className="p-4 align-middle text-slate-700 dark:text-slate-200 font-normal border-r border-slate-300 dark:border-slate-700"
                >
                  {student.name}
                </TableCell>
                <TableCell 
                  className="p-4 align-middle text-slate-700 dark:text-slate-200 border-r border-slate-300 dark:border-slate-700"
                >
                  {student.grade}
                </TableCell>
                <TableCell 
                  className="p-4 align-middle text-slate-700 dark:text-slate-200"
                >
                  {student.comments || ""}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}