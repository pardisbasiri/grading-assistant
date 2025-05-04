// src/components/CriterionBlock.tsx
"use client";

import * as React from "react";
// Icons from lucide-react
import { Check, ChevronsUpDown, Plus, Trash2 } from "lucide-react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList
} from "@/components/ui/command";
import {
  Popover, PopoverContent, PopoverTrigger
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

// Utility for class names
import { cn } from "@/lib/utils"; // Adjust import path if needed

// Note: We don't strictly need to import the interfaces here if they are only used
// within the props definition, but it can be done for clarity if preferred:
// import { MainCriterionItem, SubCriterionItem } from './DynamicCriteriaBuilder';


// --- Props Interface ---
// Defines the data and functions this component expects to receive from its parent
interface CriterionBlockProps {
  id: string; // Unique ID of this specific criterion/sub-criterion block
  parentId?: string; // ID of the parent main criterion (only present for sub-criteria)
  level: 'main' | 'sub'; // Helps differentiate styling and which buttons to show
  selectedValue: string | null; // The currently selected value in the combobox
  weight: number; // The current weight value from the slider
  availableOptions: { value: string; label: string }[]; // The list of options for the combobox
  // Callbacks to notify the parent (DynamicCriteriaBuilder) of changes/actions
  onChange: (id: string, parentId: string | undefined, field: 'selectedValue' | 'weight', value: string | number | null) => void;
  onAddSubCriterion?: (parentId: string) => void; // Only passed for main criteria blocks
  onDelete?: (id: string, parentId?: string) => void; // Optional delete functionality
  className?: string; // Allows passing additional CSS classes
}
// --- End Props Interface ---


// --- The Reusable Component ---
export function CriterionBlock({
  id,
  parentId,
  level,
  selectedValue,
  weight,
  availableOptions,
  onChange,
  onAddSubCriterion,
  onDelete,
  className,
}: CriterionBlockProps) {
  // State local to this component: whether the combobox popover is open
  const [comboboxOpen, setComboboxOpen] = React.useState(false);

  // --- Internal Handlers ---
  // These handlers call the `onChange` prop to notify the parent component

  // Called when an item is selected in the Combobox
  const handleSelect = (currentValue: string) => {
    // If the same value is selected again, treat it as deselection (set to null)
    const newValue = currentValue === selectedValue ? null : currentValue;
    // Notify the parent about the change in 'selectedValue'
    onChange(id, parentId, 'selectedValue', newValue);

    // Also reset the weight when the selection changes (example logic)
    if (newValue !== selectedValue) {
       onChange(id, parentId, 'weight', newValue ? 50 : 0); // Set to 50 if selected, 0 otherwise
    }
    setComboboxOpen(false); // Close the combobox popover
  };

  // Called when the Slider value changes
  const handleSliderChange = (value: number[]) => {
    // Slider passes an array, we take the first value (or 0 if somehow empty)
    // Notify the parent about the change in 'weight'
    onChange(id, parentId, 'weight', value[0] ?? 0);
  };

  // --- Memoized Display Label ---
  // Calculate the display label for the selected value, only recalculating when needed
  const selectedLabel = React.useMemo(() => {
    return availableOptions.find((opt) => opt.value === selectedValue)?.label;
  }, [selectedValue, availableOptions]); // Dependencies: recalculate if these change

  // --- Unique IDs for ARIA/Labels ---
  // Generate unique IDs for associating labels with form controls for accessibility
  const comboboxTriggerId = React.useId();
  const addSubButtonId = React.useId();
  const weightSliderId = React.useId();

  // --- JSX Rendering ---
  return (
    // Container div for this block, allowing custom styling and spacing
    <div className={cn("space-y-3", className)}>

      {/* --- Top Row: Contains Combobox and Action Buttons --- */}
      <div className="flex items-end space-x-2"> {/* Aligns items vertically at the bottom, adds horizontal space */}

        {/* Combobox Section */}
        <div className="flex-grow space-y-1.5"> {/* Takes up available space */}
          {/* Label associated with the combobox trigger button */}
          <Label htmlFor={comboboxTriggerId} className="text-sm capitalize">
            {level === 'main' ? 'Criteria' : 'Sub-Criteria'}
          </Label>
          {/* Popover component for the combobox dropdown */}
          <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
            {/* The button that triggers the popover */}
            <PopoverTrigger asChild>
              <Button
                id={comboboxTriggerId}
                variant="outline"
                role="combobox" // ARIA role for accessibility
                aria-expanded={comboboxOpen} // ARIA state for accessibility
                className="w-full justify-between bg-white shadow-lg rounded-lg" // Full width, space between text and icon
              >
                {/* Display selected label or placeholder text */}
                {selectedLabel ?? `Select ${level === 'main' ? 'Criteria' : 'Sub-Criteria'}...`}
                {/* Up/down chevron icon */}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            {/* Content of the popover (the dropdown) */}
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0 bg-white shadow-lg rounded-lg"> {/* Matches trigger width, no padding */}
              {/* Command component for search and list */}
              <Command>
                <CommandInput placeholder={`Search ${level}...`} />
                <CommandList> {/* Enables scrolling */}
                  <CommandEmpty>No options found.</CommandEmpty>
                  <CommandGroup>
                    {/* Map over the available options */}
                    {availableOptions.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value} // Value used by Command for filtering/selection
                        onSelect={handleSelect} // Call handler on selection
                      >
                        {/* Checkmark icon for the selected item */}
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedValue === option.value ? "opacity-100" : "opacity-0" // Show only if selected
                          )}
                        />
                        {option.label} {/* Display option text */}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div> {/* End Combobox Section */}


        {/* Add Sub-Criteria Button (Conditionally rendered only for 'main' level) */}
        {level === 'main' && onAddSubCriterion && (
          <div className="space-y-1.5"> {/* Container for label + button */}
            <Label htmlFor={addSubButtonId} className="text-xs whitespace-nowrap">Sub-Criteria</Label>
            <Button
              id={addSubButtonId}
              variant="outline"
              size="icon" // Square button
              // Call the parent's add sub-criterion handler, passing this block's ID as the parent
              onClick={() => onAddSubCriterion(id)}
              disabled={!selectedValue} // Disable if no main criterion is selected yet
              aria-label="Add Sub-Criteria"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}

         {/* Delete Button (Conditionally rendered if onDelete prop is provided) */}
         {onDelete && (
           // Adjust vertical alignment slightly if it's a sub-item (no 'Add Sub' button next to it)
           <div className={`space-y-1.5 ${level === 'sub' ? 'self-end' : ''}`}>
             {/* Hidden label used purely for alignment consistency */}
             <Label className="text-xs opacity-0 pointer-events-none">Delete</Label>
             <Button
                variant="ghost" // Less prominent visual style
                size="icon"
                // Call the parent's delete handler, passing this block's ID and potentially its parentId
                onClick={() => onDelete(id, parentId)}
                aria-label={`Delete ${level}`} // Dynamic ARIA label
                // Destructive styling for visual cue
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
                <Trash2 className="h-4 w-4" />
            </Button>
           </div>
         )}

      </div> {/* End Top Row */}


      {/* --- Bottom Row: Weight Slider --- */}
      <div className="space-y-1.5">
         {/* Label associated with the slider */}
         <Label htmlFor={weightSliderId} className="text-sm">
           Weight <span className="text-muted-foreground">({selectedValue ? weight : '--'} / 100)</span> {/* Show current weight or placeholder */}
         </Label>
         {/* Slider component */}
        <Slider
          id={weightSliderId}
          min={0}
          max={100}
          step={1}
          value={[weight]} // Controlled component: value comes from state
          onValueChange={handleSliderChange} // Call handler on value change
          disabled={!selectedValue} // Disable if no criterion is selected
          // Add some padding for easier interaction and fade if disabled
          
          className={cn("py-1", !selectedValue && "opacity-50",               "w-full",
            "[&_[data-slot=slider-track]]:bg-gray-100",
            "[&_[data-slot=slider-range]]:bg-gray-300", // The filled part
            "[&_[data-slot=slider-thumb]]:bg-white",    // The draggable circle
            "[&_[data-slot=slider-thumb]]:border",
            "[&_[data-slot=slider-thumb]]:border-grey-100" )}
        />
      </div> {/* End Bottom Row */}

    </div> // End container div for the block
  );
}