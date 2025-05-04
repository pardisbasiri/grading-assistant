// src/pages/Dashboard2.jsx
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SelectScrollable } from "../components/SelectStudent";
import { TableStudentInfo } from "../components/TableStudentInfo";

export default function Dashboard2() {
  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Button asChild variant="outline" size="icon">
          <Link href="/dashboard" aria-label="Back to Dashboard">
            <ArrowLeft />
          </Link>
        </Button>
        <h1 className="text-4xl font-bold">Student Alerts</h1>
      </div>
      <div className="mb-4">
        <SelectScrollable />
      </div>
      {/* Add the TableStudentInfo component here */}
      <div className="mt-8">
        <TableStudentInfo />
      </div>
    </div>
  );
}
