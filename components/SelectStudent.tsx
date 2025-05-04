import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectScrollable() {
  // Predefine "Ana Maria Gomez" as the selected value
  const [selectedStudent, setSelectedStudent] = React.useState("anaMariaGomez");

  const handleChange = (value: string) => {
    setSelectedStudent(value);
  };

  return (
    <Select value={selectedStudent} onValueChange={handleChange}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a student" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Students</SelectLabel>
          <SelectItem value="anaMariaGomez">Ana Maria Gomez</SelectItem>
          <SelectItem value="luciaGarces">Lucia Garces</SelectItem>
          <SelectItem value="tomStephensen">Tom Stephensen</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}