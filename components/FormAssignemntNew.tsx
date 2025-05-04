import { CalendarDemo, CalenderField } from "./Calendar";
import { CheckboxDemo } from "./Checkbox";
import { ComboboxDemo } from "./Comobox";
import { ComboboxWithLabel } from "./Comobox2";
import { InputWithLabel } from "./Field";
import { SliderDemo, SliderDemo2 } from "./Slider";


export function FormsAssignmentNew() {
  return (
    <>
    <InputWithLabel fieldname="Name of the assignment" placeholder="Use of..." />
    <div className="h-6" />  {/* This is your "extra white line" */}
    <InputWithLabel fieldname="Description of the assignment" placeholder="This assignment is about..." />
    <div className="h-6" />  {/* This is your "extra white line" */}
    <CalenderField />
    <div className="h-6" />  {/* This is your "extra white line" */}
    <ComboboxWithLabel />
    <div className="h-6" />  {/* This is your "extra white line" */}
    <SliderDemo2 />
    </>
  )
}