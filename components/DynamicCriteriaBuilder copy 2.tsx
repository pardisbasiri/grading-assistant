// src/components/DynamicCriteriaBuilder.tsx
"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react"; // Icon for the add button

// Shadcn UI Components
import { Button } from "@/components/ui/button";

// Child Component - Renders individual criteria blocks
import { CriterionBlock } from "./CriterionBlock";
// Utility for class names
import { cn } from "@/lib/utils"; // Adjust import path if needed

// ==========================================================
// === INTERFACE DEFINITIONS (Defined & Exported Here) ===
// ==========================================================

// Represents a single sub-criterion item
export interface SubCriterionItem {
  id: string; // Unique ID for this sub-criterion instance
  selectedValue: string | null; // Value selected in its combobox (e.g., "thesis", "flow")
  weight: number; // Weight percentage (0-100) specific to this sub-criterion
}

// Represents a single main criterion item, including its sub-criteria
export interface MainCriterionItem {
  id: string; // Unique ID for this main criterion instance
  selectedValue: string | null; // Value selected in its combobox (e.g., "clarity", "structure")
  weight: number; // Weight percentage (0-100) specific to this main criterion
  subCriteria: SubCriterionItem[]; // List of its children sub-criteria
}
// ==========================================================
// === END INTERFACE DEFINITIONS                          ===
// ==========================================================


// --- Example Options for Comboboxes ---
// In a real app, these might come from props or an API
const MAIN_CRITERIA_OPTIONS = [
  { value: "clarity", label: "Clarity" },
  { value: "quality of work", label: "Quality of work" },
  { value: "relevance", label: "Relevance" },
  { value: "structure", label: "Structure" },
  { value: "class participation", label: "Class participation" },
  { value: "teamwork contribution", label: "Teamwork contribution" },
  { value: "originality", label: "Originality" },
  { value: "grammar", label: "Grammar & Spelling" },
  { value: "completeness", label: "Completeness"},
];
const SUB_CRITERIA_OPTIONS = [ // Example, could be dynamic based on main criteria selected
  { value: "thesis", label: "Thesis Statement" },
  { value: "flow", label: "Logical Flow" },
  { value: "content", label: "Content" },
  { value: "formatting", label: "Formatting" },
  { value: "submission deadline", label: "Submission Deadline" },
  { value: "evidence", label: "Supporting Evidence" },
  { value: "examples", label: "Relevant Examples"},
  { value: "spelling", label: "Spelling Accuracy" },
  { value: "punctuation", label: "Punctuation" },
  { value: "syntax", label: "Sentence Structure"},
  { value: "conclusion", label: "Effective Conclusion"},
];
// --- End Example Options ---


// --- The Main Builder Component ---
export function DynamicCriteriaBuilder() {
  // State holding the entire list of criteria and their sub-criteria
  const [criteriaList, setCriteriaList] = useState<MainCriterionItem[]>([]);

  // --- Handler Functions ---

  // Adds a new, empty top-level criterion block to the list
  const handleAddMainCriterion = () => {
    const newItem: MainCriterionItem = {
      id: crypto.randomUUID(), // Generate a unique ID using browser's built-in crypto
      selectedValue: null,     // Start with nothing selected
      weight: 0,               // Start with 0 weight
      subCriteria: [],         // Start with an empty list of sub-criteria
    };
    // Use functional update with spread operator to add the new item immutably
    setCriteriaList((prevList) => [...prevList, newItem]);
  };

  // Adds a new, empty sub-criterion block under a specific parent criterion
  const handleAddSubCriterion = (parentId: string) => {
    const newSubItem: SubCriterionItem = {
      id: crypto.randomUUID(),
      selectedValue: null,
      weight: 0,
    };

    // Update the state immutably:
    setCriteriaList((prevList) =>
      prevList.map((mainItem) => { // Iterate through main criteria
        if (mainItem.id === parentId) { // Find the parent
          // Return a *new* object for the parent criterion...
          return {
            ...mainItem, // ...copying its existing properties...
            // ...and creating a *new* subCriteria array with the new item appended
            subCriteria: [...mainItem.subCriteria, newSubItem],
          };
        }
        return mainItem; // Return other main items unchanged
      })
    );
  };

  // Generic handler called when a value (selectedValue or weight) changes in *any* block
  const handleItemChange = (
    id: string,                     // ID of the block that changed
    parentId: string | undefined,   // ID of the parent (if it's a sub-criterion)
    field: 'selectedValue' | 'weight', // Which property changed
    value: string | number | null   // The new value
  ) => {
    setCriteriaList((prevList) =>
      prevList.map((mainItem) => { // Iterate through main criteria
        // Check if the change is for the main item itself (no parentId provided)
        if (mainItem.id === id && !parentId) {
          // Return a new main item object with the specific field updated
          return { ...mainItem, [field]: value };
        }
        // Check if the change is for a sub-item belonging to *this* main item
        if (mainItem.id === parentId) {
          // Return a new main item object...
          return {
            ...mainItem,
            // ...with an updated subCriteria array:
            subCriteria: mainItem.subCriteria.map((subItem) =>
              // Find the specific sub-item by its ID and update its field
              subItem.id === id ? { ...subItem, [field]: value } : subItem
            ),
          };
        }
        // If neither condition matched, return the main item unchanged
        return mainItem;
      })
    );
  };

   // Optional: Handler for deleting items (main or sub)
   const handleDeleteItem = (id: string, parentId?: string) => {
        setCriteriaList(prevList => {
            // If parentId exists, we are deleting a sub-criterion
            if (parentId) {
                // Map over main items
                return prevList.map(mainItem => {
                    if (mainItem.id === parentId) {
                        // Return a new main item object with the specific sub-criterion filtered out
                        return {
                            ...mainItem,
                            subCriteria: mainItem.subCriteria.filter(sub => sub.id !== id)
                        };
                    }
                    return mainItem; // Return other main items unchanged
                });
            }
            // Otherwise (no parentId), we are deleting a main criterion
            else {
                // Filter out the main criterion directly from the top-level list
                return prevList.filter(mainItem => mainItem.id !== id);
            }
        });
        // Optional: Log deletion for debugging
        // console.log(`Deleted item: ${id}, Parent: ${parentId}`);
   };


  // --- JSX Rendering ---
  return (
    <div className="space-y-6"> {/* Adds vertical space between elements */}

      {/* Render the list of main criteria blocks */}
      <div className="space-y-6"> {/* Adds vertical space between each main criterion group */}
        {/* Display a message if the list is empty */}
        {criteriaList.length === 0 && (
             <p className="text-muted-foreground py-4">
                 Click "Add Criteria" to start building your rubric.
             </p>
        )}

        {/* Map over the criteriaList state array */}
        {criteriaList.map((mainItem) => (
          // Each main criterion gets its own container div
          <div key={mainItem.id} className="space-y-4"> {/* Adds space below main block before subs */}

            {/* Render the CriterionBlock for the main criterion */}
            <CriterionBlock
              // Key is crucial for React list updates
              id={mainItem.id}
              level="main" // Indicate this is a main criterion
              selectedValue={mainItem.selectedValue}
              weight={mainItem.weight}
              availableOptions={MAIN_CRITERIA_OPTIONS} // Pass the appropriate options
              onChange={handleItemChange} // Pass the generic change handler
              onAddSubCriterion={handleAddSubCriterion} // Pass the sub-criterion add handler
              onDelete={handleDeleteItem} // Pass the delete handler
            />

            {/* Conditionally render the sub-criteria section if any exist */}
            {mainItem.subCriteria.length > 0 && (
              // Indent sub-criteria and add a visual separator (left border)
              <div className="ml-8 space-y-4 border-l-2 pl-4 border-border/40">
                {/* Map over the subCriteria array for this main item */}
                {mainItem.subCriteria.map((subItem) => (
                  // Render a CriterionBlock for each sub-criterion
                  <CriterionBlock
                    key={subItem.id} // Unique key for the sub-item
                    id={subItem.id}
                    parentId={mainItem.id} // IMPORTANT: Pass the main item's ID as parentId
                    level="sub" // Indicate this is a sub-criterion
                    selectedValue={subItem.selectedValue}
                    weight={subItem.weight}
                    availableOptions={SUB_CRITERIA_OPTIONS} // Pass sub-criterion options
                    onChange={handleItemChange} // Reuse the generic change handler
                    onDelete={handleDeleteItem} // Reuse the delete handler
                    // Note: onAddSubCriterion is typically not passed to sub-items
                  />
                ))}
              </div>
            )}
          </div> // End container for main criterion + subs
        ))}
      </div>

      {/* Button to add a new top-level criterion block */}
      <div className="pt-4 flex justify-start"> {/* Aligns button to the left */}
        <Button variant="outline" onClick={handleAddMainCriterion}> {/* Standard Shadcn button */}
          <Plus className="mr-2 h-4 w-4" /> Add Criteria
        </Button>
      </div>

    </div> // End main container div
  );
}