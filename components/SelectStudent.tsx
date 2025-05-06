// components/SelectStudent.tsx
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

interface SelectScrollableProps {
  onSelect: (selectedValue: string) => void;
  initialValue?: string;
}

export function SelectScrollable({ onSelect, initialValue = "anaMariaGomez" }: SelectScrollableProps) {
  const [selectedValue, setSelectedValue] = React.useState(initialValue);

  const handleChange = (value: string) => {
    setSelectedValue(value); 
    onSelect(value);
  };

  React.useEffect(() => {
    setSelectedValue(initialValue);
  }, [initialValue]);

  return (
    <Select value={selectedValue} onValueChange={handleChange}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a student" />
      </SelectTrigger>
      <SelectContent className="bg-white shadow-lg rounded-lg">
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