// src/components/StaticOverviewTable.tsx
"use client";

import * as React from "react";

// Import Shadcn UI Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Make sure cn is imported

// --- Interfaces and Type Definitions ---
interface SubCriteriaData {
    id: string;
    criterion: string;
    weight: string;
    rubricNumbers: number[] | null;
    rubricCategories: string[] | null;
}

interface MainCriteriaData {
    id: string;
    criterion: string;
    weight: string;
    rubricNumbers: number[] | null;
    rubricCategories: string[] | null;
    subCriteria: SubCriteriaData[];
}

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
      { id: "sub-1c", criterion: "Submission deadline", weight: "20%", rubricNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], rubricCategories: ["Bad", "Bad", "Moderate", "Moderate", "Good", "Good", "Very Good", "Very Good", "Perfect", "Perfect"] },
    ]
  },
  { id: "row-2", criterion: "Class participation", weight: "30%", rubricNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], rubricCategories: ["Bad", "Bad", "Moderate", "Moderate", "Good", "Good", "Very Good", "Very Good", "Perfect", "Perfect"], subCriteria: [] },
  { id: "row-3", criterion: "Teamwork contribution", weight: "20%", rubricNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], rubricCategories: ["Bad", "Bad", "Moderate", "Moderate", "Good", "Good", "Very Good", "Very Good", "Perfect", "Perfect"], subCriteria: [] },
];

export function DynamicOverviewTable({ className }: { className?: string }) {
  const [selectedRubrics, setSelectedRubrics] = React.useState<Record<string, number | null>>(() => {
    const initialSelections: Record<string, number | null> = {};
    STATIC_TABLE_DATA.forEach(mainItem => {
        if (mainItem.rubricNumbers) {
            initialSelections[mainItem.id] = null;
        }
        mainItem.subCriteria.forEach(subItem => {
            if (subItem.rubricNumbers) {
                initialSelections[subItem.id] = null;
            }
        });
    });
    return initialSelections;
  });

  const handleRubricSelect = (itemId: string, value: number) => {
    setSelectedRubrics(prev => ({
      ...prev,
      [itemId]: prev[itemId] === value ? null : value,
    }));
  };

  // Corrected renderRubricCell
  const renderRubricCell = (
    itemId: string,
    numbers: number[] | null
  ): React.ReactNode => {
    if (!numbers) return <span className="text-muted-foreground">--</span>;

    return numbers.map((num) => {
      // --- THIS IS THE IMPORTANT FIX ---
      const isSelected = selectedRubrics[itemId] === num;
      // --- END FIX ---

      return (
        <Button
          key={`num-${itemId}-${num}`}
          variant={isSelected ? "default" : "outline"}
          size="sm"
          className={cn(
            "h-8 w-8 p-0 mx-0.5 text-xs rounded-md", // Base styles

            isSelected
              ? [ // Styles for SELECTED button (when variant="default")
                  "bg-gray-200",        // Grey background
                  "hover:bg-gray-300",  // Hover for selected
                  "text-gray-800",      // Dark text for contrast
                  "border",             // Ensure border width is applied
                  "border-gray-400"     // Visible border color for selected
                ]
              : [ // Styles for UNSELECTED button (when variant="outline")
                  "border-gray-300",    // Specific border for unselected (matches image)
                  "hover:bg-gray-100"   // Hover for unselected
                ]
          )}
          onClick={() => handleRubricSelect(itemId, num)}
          aria-pressed={isSelected} // Use the defined isSelected variable
          aria-label={`Select score ${num} for ${itemId}`}
        >
          {num}
        </Button>
      );
    });
  };

  return (
     <div className={cn("mt-6", className)}>
       <div className="border rounded-lg overflow-hidden shadow-sm">
           <Table>
              <TableHeader className="bg-muted/50">
                 <TableRow>
                    <TableHead className="w-[30%] pl-4 font-semibold">Criteria</TableHead>
                    <TableHead className="w-[15%] font-semibold">Weight</TableHead>
                    <TableHead className="text-left font-semibold pr-4 pl-1">Rubric</TableHead>
                 </TableRow>
              </TableHeader>

              <TableBody>
                 {STATIC_TABLE_DATA.map((mainItem) => (
                    <React.Fragment key={mainItem.id}>
                       <TableRow className="border-b hover:bg-muted/30 bg-muted/10">
                          <TableCell className="pl-4 font-medium">{mainItem.criterion}</TableCell>
                          <TableCell className="font-medium">{mainItem.weight}</TableCell>
                          <TableCell className="tabular-nums whitespace-nowrap py-2 px-1">
                             {renderRubricCell(mainItem.id, mainItem.rubricNumbers)}
                          </TableCell>
                       </TableRow>

                       {mainItem.subCriteria?.map((subItem) => (
                          <TableRow key={subItem.id} className="text-sm hover:bg-muted/20">
                             <TableCell className="pl-10">{subItem.criterion}</TableCell>
                             <TableCell>{subItem.weight}</TableCell>
                             <TableCell className="tabular-nums whitespace-nowrap py-2 px-1">
                                {renderRubricCell(subItem.id, subItem.rubricNumbers)}
                             </TableCell>
                          </TableRow>
                       ))}
                    </React.Fragment>
                 ))}
              </TableBody>
           </Table>
       </div>
     </div>
  );
}