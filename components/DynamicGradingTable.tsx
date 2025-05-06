// src/components/DynamicGradingTable.tsx
"use client";

import * as React from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// --- Interfaces and Type Definitions for Rubric Data (no changes) ---
interface SubCriteriaData {
    id: string;
    criterion: string;
    weight: string;
    rubricNumbers: number[] | null;
}

interface MainCriteriaData {
    id: string;
    criterion: string;
    weight: string;
    rubricNumbers: number[] | null;
    subCriteria: SubCriteriaData[];
}

const STATIC_TABLE_DATA: MainCriteriaData[] = [
  {
    id: "row-1",
    criterion: "Quality of work",
    weight: "50%",
    rubricNumbers: null,
    subCriteria: [
      { id: "sub-1a", criterion: "Content", weight: "60%", rubricNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
      { id: "sub-1b", criterion: "Formatting", weight: "20%", rubricNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
      { id: "sub-1c", criterion: "Submission deadline", weight: "20%", rubricNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    ]
  },
  { id: "row-2", criterion: "Class participation", weight: "30%", rubricNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], subCriteria: [] },
  { id: "row-3", criterion: "Teamwork contribution", weight: "20%", rubricNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], subCriteria: [] },
];

interface DynamicGradingTableProps {
  className?: string;
  selectedRubrics: Record<string, number | null>;
  onRubricSelect: (itemId: string, value: number) => void;
}

export function DynamicGradingTable({
  className,
  selectedRubrics,
  onRubricSelect,
}: DynamicGradingTableProps) {

  const handleRubricButtonClick = (itemId: string, value: number) => {
    onRubricSelect(itemId, value);
  };

  const renderRubricCell = (
    itemId: string,
    numbers: number[] | null
  ): React.ReactNode => {
    if (!numbers) return <span className="text-muted-foreground text-xs sm:text-sm">--</span>;

    return (
      // Using flex and flex-wrap for buttons, but not justify-between this time.
      // Let the column width dictate how many fit.
      <div className="flex flex-wrap gap-px"> 
        {numbers.map((num) => {
          const isSelected = selectedRubrics[itemId] === num;
          return (
            <Button
              key={`num-${itemId}-${num}`}
              variant={isSelected ? "default" : "outline"}
              className={cn(
                "h-7 w-7 p-0 text-[11px] leading-none rounded",
                isSelected
                  ? "bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold border border-gray-400 dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-slate-50 dark:border-slate-400"
                  : "border-gray-300 hover:bg-gray-100 text-gray-700 dark:border-slate-700 dark:hover:bg-slate-800 dark:text-slate-300"
              )}
              onClick={() => handleRubricButtonClick(itemId, num)}
              aria-pressed={isSelected}
              aria-label={`Select score ${num} for ${itemId}`}
            >
              {num}
            </Button>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn("mt-1 w-full", className)}>
      <div className="border rounded-lg shadow-sm w-full overflow-x-auto">
        {/* Using table-layout: fixed with percentage widths */}
        <Table className="w-full" style={{ tableLayout: 'fixed' }}>
          <TableHeader className="bg-muted/50">
            <TableRow>
              {/* MODIFIED: Using percentage widths for columns */}
              <TableHead style={{ width: '35%' }} className="pl-2 sm:pl-3 pr-1 py-2 text-xs sm:text-sm font-semibold whitespace-nowrap">Criteria</TableHead>
              <TableHead style={{ width: '15%' }} className="px-1 sm:px-2 py-2 text-xs sm:text-sm font-semibold whitespace-nowrap">Weight</TableHead>
              <TableHead style={{ width: '50%' }} className="text-left pl-1 pr-2 py-2 text-xs sm:text-sm font-semibold">Rubric</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {STATIC_TABLE_DATA.map((mainItem) => (
              <React.Fragment key={mainItem.id}>
                <TableRow className="border-b hover:bg-muted/30 bg-muted/10">
                  <TableCell className="pl-2 sm:pl-3 pr-1 py-1.5 text-xs sm:text-sm font-medium align-top">
                    {mainItem.criterion}
                  </TableCell>
                  <TableCell className="px-1 sm:px-2 py-1.5 text-xs sm:text-sm font-medium align-top">
                    {mainItem.weight}
                  </TableCell>
                  <TableCell className="tabular-nums py-1.5 px-1 align-top">
                    {renderRubricCell(mainItem.id, mainItem.rubricNumbers)}
                  </TableCell>
                </TableRow>
                {mainItem.subCriteria?.map((subItem) => (
                  <TableRow key={subItem.id} className="hover:bg-muted/20">
                    <TableCell className="pl-4 sm:pl-6 pr-1 py-1.5 text-xs align-top">
                      {subItem.criterion}
                    </TableCell>
                    <TableCell className="px-1 sm:px-2 py-1.5 text-xs align-top">
                      {subItem.weight}
                    </TableCell>
                    <TableCell className="tabular-nums py-1.5 px-1 align-top">
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