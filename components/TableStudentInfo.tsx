import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StudentData {
  id: string;
  name: string;
  group?: string;
  grade?: string | number;
  engagement?: string;
  warnings?: string;
}

interface TableStudentInfoProps {
  studentData: StudentData | null;
}

export function TableStudentInfo({ studentData }: TableStudentInfoProps) {

  if (!studentData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No student data available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Information: {studentData.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Field</TableHead> 
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Name</TableCell>
              <TableCell>{studentData.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">ID</TableCell>
              <TableCell>{studentData.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Group</TableCell>
              <TableCell>5</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Grade</TableCell>
              <TableCell>6.4</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Engagement</TableCell>
              <TableCell>Low</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Warnings</TableCell>
              <TableCell>Ana has missed multiple classes and has low particpation in team discussions</TableCell>
            </TableRow>

            {studentData.group && (
              <TableRow>
                <TableCell className="font-medium">Group</TableCell>
                <TableCell>{studentData.group}</TableCell>
              </TableRow>
            )}
            {studentData.grade !== undefined && (
              <TableRow>
                <TableCell className="font-medium">Grade</TableCell>
                <TableCell>{studentData.grade}</TableCell>
              </TableRow>
            )}
            {studentData.engagement && (
              <TableRow>
                <TableCell className="font-medium">Engagement</TableCell>
                <TableCell>{studentData.engagement}</TableCell>
              </TableRow>
            )}
            {studentData.warnings && (
              <TableRow>
                <TableCell className="font-medium">Warnings</TableCell>
                <TableCell className="whitespace-normal">{studentData.warnings}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}