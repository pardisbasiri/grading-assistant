"use client"
//this is general

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label"; 

export function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow"
    />
  )
}



export function CalenderField() {
  const [date, setDate] = useState<Date | undefined>();
  // 1. Add state to control Popover visibility
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  // Optional: Add an ID for label association (good practice)
  const triggerId = React.useId();

  // 3. Define a handler for date selection
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setIsPopoverOpen(false); // <-- Close the popover here
  };

  return (
    // Use grid layout similar to the Combobox example for consistency
    <div className="grid w-full max-w-sm items-center gap-1.5">
      {/* Use Shadcn Label for consistency */}
      <Label htmlFor={triggerId}>Due date of the assignment:</Label>

      {/* 2. Control the Popover's open state */}
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            id={triggerId} // Add id for label
            variant="outline"
            className={cn(
              "w-[240px] justify-start text-left font-normal", // Use justify-start for better alignment
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" /> {/* Add margin-right */}
            {date ? format(date, "PPP") : <span>Pick a date</span>}
            {/* No need for the second CalendarIcon here */}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white shadow-lg rounded-lg" align="start"> {/* Removed redundant styling */}
          <Calendar
            mode="single"
            selected={date}
            // 3. Use the new handler for onSelect
            onSelect={handleDateSelect}
            // Optional: Disable past dates if needed (example)
            // disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}



