"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils" // Adjust path if necessary
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label" // Make sure you've added the label component: npx shadcn-ui@latest add label

// 1. Define the new data source
const documentTypes = [
  { value: "report", label: "Report" },
  { value: "presentation", label: "Presentation" },
  { value: "essay", label: "Essay" },
  { value: "business-plan", label: "Business Plan" },
  { value: "code", label: "Code" },
  { value: "data", label: "Data" },
  { value: "surveys", label: "Surveys" },
]

export function ComboboxWithLabel() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const triggerId = React.useId();

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      {/* 2. Update the Label text */}
      <Label htmlFor={triggerId}>Select Document Type</Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[380px] justify-between"
            id={triggerId}
          >
            {/* 3. Update the Button placeholder text */}
            {value
              ? documentTypes.find((docType) => docType.value === value)?.label
              : "Select document type..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[380px] p-0 bg-white shadow-lg rounded-lg">
          <Command>
             {/* 4. Update the CommandInput placeholder */}
            <CommandInput placeholder="Search document type..." />
            <CommandList>
              {/* 5. Update the CommandEmpty text */}
              <CommandEmpty>No document type found.</CommandEmpty>
              <CommandGroup>
                {/* 6. Map over the new documentTypes array */}
                {documentTypes.map((docType) => (
                  <CommandItem
                    key={docType.value}
                    value={docType.value} // Use the value for Command's internal handling
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === docType.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {docType.label} {/* Display the label */}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}