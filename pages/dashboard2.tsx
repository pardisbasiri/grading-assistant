// src/pages/Dashboard2.jsx
"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SelectScrollable } from "../components/SelectStudent";
import { TableStudentInfo } from "../components/TableStudentInfo";
import { ChartsSideBySide, ChartSummaryFeedback } from "../components/ChartsStudent";
import { SendMessageCard } from "../components/SendMessageCard";

interface Student {
  id: string;
  name: string;
}

const getCurrentlyViewedStudent = (): Student | null => {
  return {
    id: "ana-maria-gomez-id",
    name: "Ana Maria Gomez" 
  };
};

export default function Dashboard2() {
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);

  useEffect(() => {
    const studentData = getCurrentlyViewedStudent();
    setCurrentStudent(studentData);
  }, []);

  const handleStudentSelect = (studentId: string) => {
    console.log("Student selected in Dashboard2 (example):", studentId);
    if (studentId === "some-other-id") {
      setCurrentStudent({ id: "some-other-id", name: "Some Other Student"});
    } else if (studentId === "ana-maria-gomez-id") {
      setCurrentStudent(getCurrentlyViewedStudent());
    } else {
      setCurrentStudent(null);
    }
  };

  
  return (
    <div className="p-6 space-y-10">
      <div className="flex items-center gap-3">
        <Button asChild variant="outline" size="icon">
          <Link href="/dashboard" aria-label="Back to Dashboard">
            <ArrowLeft />
          </Link>
        </Button>
        <h1 className="text-4xl font-bold">Student Alerts</h1>
      </div>

      <div>
        <SelectScrollable />
      </div>

      <div>
        <TableStudentInfo />
      </div>

      <div>
        <ChartsSideBySide/>
      </div>

      <div className="mt-8">
        <SendMessageCard />
        </div>
    </div>
  );
}
