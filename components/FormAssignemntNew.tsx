import { CalendarDemo, DateOfBirthField } from "./Calendar";
import { CheckboxDemo } from "./Checkbox";
import { InputWithLabel } from "./Field";


export function FormsAssignmentNew() {
  return (
    <>
    <InputWithLabel fieldname="Name of the assignment" placeholder="Use of..." />
    <div className="h-4" />  {/* This is your "extra white line" */}
    <InputWithLabel fieldname="Description of the assignment" placeholder="This assignment is about..." />
    <div className="h-4" />  {/* This is your "extra white line" */}
    <DateOfBirthField />
    </>
  )
}