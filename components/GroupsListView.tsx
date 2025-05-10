import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Student {
  id: string;
  name: string;
  major: string;
}

interface Group {
  id: string;
  name: string;
  students: Student[];
}

export function GroupsListView({ onGroup5Click }: { onGroup5Click: () => void }) {
  const groups: Group[] = [
    {
      id: "group-1",
      name: "Group 1",
      students: [
        { id: "1", name: "Hugo Martin", major: "Computer Science" },
        { id: "2", name: "Elena Sanchez", major: "Computer Science" },
        { id: "3", name: "Daniel Torrez", major: "Psychology" },
        { id: "4", name: "Sofia Molina", major: "HCID" },
        { id: "5", name: "Andrian Castillo", major: "HCID" },
      ],
    },
    {
      id: "group-2",
      name: "Group 2",
      students: [
        { id: "6", name: "Erik Johansson", major: "Computer Science" },
        { id: "7", name: "Yuki Tanaka", major: "Computer Science" },
        { id: "8", name: "Elena Sanchez", major: "Psychology" },
        { id: "9", name: "Luca Moretti", major: "HCID" },
        { id: "10", name: "Aisha Khan", major: "HCID" },
      ],
    },
    {
      id: "group-3",
      name: "Group 3",
      students: [
        { id: "11", name: "Maria Hernandez", major: "Computer Science" },
        { id: "12", name: "Mia Nilsson", major: "Computer Science" },
        { id: "13", name: "Fatima El-Sayed", major: "Psychology" },
        { id: "14", name: "David Johnson", major: "HCID" },
        { id: "15", name: "Chen Wei", major: "HCID" },
      ],
    },
    {
      id: "group-4",
      name: "Group 4",
      students: [
        { id: "16", name: "Tomasz Kowalski", major: "Computer Science" },
        { id: "17", name: "Anna Nowak", major: "Computer Science" },
        { id: "18", name: "Marco Rossi", major: "Psychology" },
        { id: "19", name: "Sofia Ivanov", major: "HCID" },
        { id: "20", name: "Kai Yamamoto", major: "HCID" },
      ],
    },
    {
      id: "group-5",
      name: "Group 5",
      students: [
        { id: "21", name: "Alejandro Fernandez", major: "Computer Science" },
        { id: "22", name: "Ana Maria Gomez", major: "Computer Science" },
        { id: "23", name: "Gabriel López", major: "Psychology" },
        { id: "24", name: "Elena Martinez", major: "HCID" },
        { id: "25", name: "Beatriz Torres", major: "HCID" },
      ],
    },
    {
      id: "group-6",
      name: "Group 6",
      students: [
        { id: "26", name: "Javier Castillo", major: "Computer Science" },
        { id: "27", name: "Elena Castillez", major: "Computer Science" },
        { id: "28", name: "Lucia Torrez", major: "Psychology" },
        { id: "29", name: "Patricia Vega", major: "HCID" },
        { id: "30", name: "Sergio Vargas", major: "HCID" },
      ],
    },
  ];

  return (
    <>
      <p className="text-muted-foreground mb-4">Select the group: </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <Card
            key={group.id}
            className="cursor-pointer hover:ring-2 ring-primary hover:bg-muted transition"
            onClick={() => group.name === "Group 5" && onGroup5Click()}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">{group.name}</CardTitle>
              <div className="border-b border-muted mt-2" />
            </CardHeader>
            <CardContent className="space-y-2">
              {group.students.map((stu) => (
                <div key={stu.id} className="flex items-center">
                  <div className="ml-2">
                    <p className="font-medium">{stu.name}</p>
                    <p className="text-xs text-muted-foreground">{stu.major}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
