// src/components/StaticOverviewTable.tsx
"use client";

import * as React from "react";

// Import Shadcn UI Components
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { AlertDialogPublish, AlertDialogSave } from "./Alert";
import { AlertDialogPortal } from "@radix-ui/react-alert-dialog";

// --- Interfaces and Type Definitions ---

// For sub-criteria data structure
interface SubCriteriaData {
    id: string;
    criterion: string;
    weight: string;
    rubricNumbers: number[] | null;
    rubricCategories: string[] | null;
}

// For the hardcoded main data structure
interface MainCriteriaData {
    id: string;
    criterion: string;
    weight: string;
    rubricNumbers: number[] | null;
    rubricCategories: string[] | null;
    subCriteria: SubCriteriaData[];
}

// For the grouped category object returned by reduce
type CategoryGroup = { label: string; count: number };

// Hardcoded Data using the interfaces
const STATIC_TABLE_DATA: MainCriteriaData[] = [
  {
    id: "row-1",
    criterion: "Quality of work",
    weight: "50%",
    rubricNumbers: null,
    rubricCategories: null,
    subCriteria: [
      { id: "sub-1a", criterion: "Content", weight: "60%", rubricNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], rubricCategories: ["Bad", "Bad", "Moderate", "Moderate", "Good", "Good", "Very Good", "Very Good", "Perfect", "Perfect"] },
      { id: "sub-1b", criterion: "Formatting", weight: "20%", rubricNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], rubricCategories: ["Bad", "Bad", "Moderate", "Moderate", "Good", "Good", "Very Good", "Very Good", "Perfect", "Perfect"] },
      { id: "row-4", criterion: "Submission deadline", weight: "20%", rubricNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], rubricCategories: ["Bad", "Bad", "Moderate", "Moderate", "Good", "Good", "Very Good", "Very Good", "Perfect", "Perfect"] },
    ]
  },
  { id: "row-5", criterion: "Class participation", weight: "30%", rubricNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], rubricCategories: ["Bad", "Bad", "Moderate", "Moderate", "Good", "Good", "Very Good", "Very Good", "Perfect", "Perfect"], subCriteria: [] },
  { id: "row-6", criterion: "Teamwork contribution", weight: "20%", rubricNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], rubricCategories: ["Bad", "Bad", "Moderate", "Moderate", "Good", "Good", "Very Good", "Very Good", "Perfect", "Perfect"], subCriteria: [] },
];
// --- End Data Definitions ---


// --- The Static Table Component ---
export function StaticOverviewTable({ className }: { className?: string }) {
  const [rubricMode, setRubricMode] = React.useState<'numerical' | 'categorical'>('numerical');

  const handleSave = () => { console.log("Save clicked"); }
  const handlePublish = () => { console.log("Publish clicked"); }

  // Helper function to render rubric cells based on mode
  const renderRubricCell = (numbers: number[] | null, categories: string[] | null): React.ReactNode => { // Explicit return type
    // Numerical Mode
    if (rubricMode === 'numerical') {
       if (!numbers) return <span className="text-muted-foreground">--</span>;
       return numbers.map((num) => (
         <span key={`num-${num}-${Math.random()}`}
              className="inline-block text-center w-8 md:w-10 lg:w-12 px-1 py-0.5 text-xs">
           {num}
         </span>
       ));
    }
    // Categorical Mode
    else {
      if (!categories) return <span className="text-muted-foreground">--</span>;

      // Group consecutive identical categories
      const uniqueCategories = categories.reduce<CategoryGroup[]>((acc, category) => {
         if (!acc.length || acc[acc.length - 1].label !== category) {
            acc.push({ label: category, count: 1 });
         } else {
            acc[acc.length - 1].count++;
         }
         return acc;
       }, []);

      // Render the grouped categories
      return uniqueCategories.map((cat, index) => (
          <span key={`${cat.label}-${index}`}
               className={`inline-block text-center px-1 py-0.5 text-xs border-r border-border/50 last:border-r-0`}
               style={{ width: `calc(${cat.count * 10}% - 1px)` }}
          >
             {cat.label}
          </span>
       ));
    }
  }; // End of renderRubricCell function

  // --- Component JSX ---
  return (
     <div className={cn("mt-10 space-y-4", className)}>
       {/* Header Area: Title and Toggle Buttons */}
       <div className="flex justify-between items-center mb-2">
         <h2 className="text-xl font-semibold">Overview:</h2>
         <ToggleGroup
            type="single"
            variant="outline"
            value={rubricMode}
            onValueChange={(value) => {
                if (value === 'numerical' || value === 'categorical') { setRubricMode(value); }
                else { setRubricMode('numerical'); }
            }}
            size="sm"
         >
           <ToggleGroupItem value="numerical" aria-label="Toggle numerical rubric" className={cn("px-4 py-1.5", "border-slate-200 dark:border-slate-700", "text-slate-600 dark:text-slate-400", "data-[state=on]:bg-slate-100 dark:data-[state=on]:bg-slate-800", "hover:bg-slate-50 dark:hover:bg-slate-800/50")}>Numerical</ToggleGroupItem>
           <ToggleGroupItem value="categorical" aria-label="Toggle categorical rubric" className={cn("px-4 py-1.5", "border-slate-200 dark:border-slate-700", "text-slate-600 dark:text-slate-400", "data-[state=on]:bg-slate-100 dark:data-[state=on]:bg-slate-800", "hover:bg-slate-50 dark:hover:bg-slate-800/50")}>Categorical</ToggleGroupItem>
         </ToggleGroup>
       </div>

       {/* Table Container */}
       <div className="border rounded-lg overflow-hidden shadow-sm">
           <Table>
              {/* Table Header */}
              <TableHeader className="bg-muted/50">
                 <TableRow>
                    <TableHead className="w-[30%] pl-4 font-semibold">Criteria</TableHead>
                    <TableHead className="w-[15%] font-semibold">Weight</TableHead>
                    <TableHead className="text-center font-semibold pr-4">Rubric</TableHead>
                 </TableRow>
              </TableHeader>

              {/* Table Body - Check this section carefully */}
              <TableBody>
                 {/* Map over the STATIC_TABLE_DATA */}
                 {STATIC_TABLE_DATA.map((mainItem: MainCriteriaData) => ( // Explicit type for item
                    <React.Fragment key={mainItem.id}>
                       {/* Main Row */}
                       <TableRow className="border-b hover:bg-muted/30 bg-muted/10">
                          <TableCell className="pl-4 font-medium">{mainItem.criterion}</TableCell>
                          <TableCell className="font-medium">{mainItem.weight}</TableCell>
                          <TableCell className="text-center tabular-nums whitespace-nowrap">
                             {/* Ensure renderRubricCell is called correctly */}
                             {renderRubricCell(mainItem.rubricNumbers, mainItem.rubricCategories)}
                          </TableCell>
                       </TableRow>

                       {/* Sub Rows (Conditional Rendering) */}
                       {mainItem.subCriteria?.map((subItem: SubCriteriaData) => ( // Optional chaining + explicit type
                          <TableRow key={subItem.id} className="text-sm hover:bg-muted/20">
                             <TableCell className="pl-10">{subItem.criterion}</TableCell>
                             <TableCell>{subItem.weight}</TableCell>
                             <TableCell className="text-center tabular-nums whitespace-nowrap">
                                {/* Ensure renderRubricCell is called correctly */}
                                {renderRubricCell(subItem.rubricNumbers, subItem.rubricCategories)}
                             </TableCell>
                          </TableRow>
                       ))}
                    </React.Fragment>
                 ))}
              </TableBody>
           </Table>
       </div>

       {/* Save/Publish Buttons */}
       <div className="flex justify-start space-x-3 pt-4">
       <AlertDialogSave/>
       <AlertDialogPublish/>
       </div>
     </div>
  );
} // End of StaticOverviewTable component