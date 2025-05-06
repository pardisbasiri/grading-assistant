// src/pages/Dashboard2.jsx
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SelectScrollable } from "../components/SelectStudent";
import { TableStudentInfo } from "../components/TableStudentInfo";
import { ChartsSideBySide, ChartSummaryFeedback } from "../components/ChartsStudent";


export default function Dashboard2() {
  return (
    <div className="p-6 space-y-10">
      {/* Header with back button */}
      <div className="flex items-center gap-3">
        <Button asChild variant="outline" size="icon">
          <Link href="/dashboard" aria-label="Back to Dashboard">
            <ArrowLeft />
          </Link>
        </Button>
        <h1 className="text-4xl font-bold">Student Alerts</h1>
      </div>

      {/* Student selector */}
      <div>
        <SelectScrollable />
      </div>

      {/* Table with info */}
      <div>
        <TableStudentInfo />
      </div>

      {/* Charts */}
      <div>
        <ChartsSideBySide/>
      </div>

      {/* Table */}
      <div>
        <ChartSummaryFeedback/>
      </div>
    </div>
  );
}
