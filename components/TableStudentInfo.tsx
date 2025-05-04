import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const studentInfo = [
  {
    name: "Ana Maria Gomez",
    group: "5",
    grade: "6.5",
    engagement: "Low",
    warnings: "Ana has missed multiple classes and has low participation in team discussions.",
  }
];

export function TableStudentInfo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
        <TableCell className="font-bold">Field</TableCell>
        <TableCell className="font-bold">Details</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {studentInfo.map((student, index) => (
          <React.Fragment key={index}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{student.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Group</TableCell>
              <TableCell>{student.group}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Grade</TableCell>
              <TableCell>{student.grade}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Engagement</TableCell>
              <TableCell>{student.engagement}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Warnings</TableCell>
              <TableCell>{student.warnings}</TableCell>
            </TableRow>
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
}
