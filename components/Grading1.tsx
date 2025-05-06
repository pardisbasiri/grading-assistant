import { DynamicOverviewTable } from "./DynamicOverviewTable";
import { InputWithLabel } from "./Field";
import { StaticOverviewTable } from "./StaticOverviewTable";
import { TextareaDemo, TextareaWithLabel } from "./TextArea";

// shadcn/ui and icon imports
import { Button } from "@/components/ui/button"; // Adjust path if your shadcn components are elsewhere
import { FileText } from "lucide-react";

// Helper component for each information line
interface InfoLineProps {
  label: string;
  text: string;
  iconAriaLabel?: string;
}

const InfoLine: React.FC<InfoLineProps> = ({ label, text, iconAriaLabel = "View document" }) => {
  return (
    <div className="flex items-center space-x-2 py-1">
      {/* Adjust min-w as needed for your longest label to ensure alignment */}
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[160px] sm:min-w-[180px]"> 
        {label}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex-shrink-0"
        aria-label={iconAriaLabel}
        // onClick={() => console.log(`${label} icon clicked`)} // Optional: add functionality later
      >
        <FileText className="h-4 w-4" />
      </Button>
      <span className="text-sm italic text-gray-600 dark:text-gray-400">{text}</span>
    </div>
  );
};

export function GradingOne() {
  return (
    <>
      <h6 className="text-l font-bold mb-4">Overview:</h6>

      {/* --- Submission Details Section from the image --- */}
      <div className="mb-6 space-y-1"> {/* Container for the new info lines with spacing */}
        <InfoLine
          label="Assignment handed in:"
          text="09/10/2024 - 12 days early"
          iconAriaLabel="View submitted assignment"
        />
        <InfoLine
          label="Peer-to-peer review:"
          text="The P2P report shows that Ana worked only on one paragraph of the report"
          iconAriaLabel="View peer-to-peer review report"
        />
      </div>
      {/* --- End of Submission Details Section --- */}

      {/* Removed <div className="h-12" /> as mb-6 above should suffice */}
      
      <h6 className="text-l font-bold mb-4">Rubric:</h6>
      {/* <StaticOverviewTable/> */}
      <DynamicOverviewTable/>
      <div className="h-8" />

      <h6 className="text-l font-bold mb-4">General feedback:</h6>
      <TextareaDemo/>
    </>
  );
}




