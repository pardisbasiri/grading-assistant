import React from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface NavigationButtonProps {
  direction?: "left" | "right";
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  direction = "right",
  label,
  onClick,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex items-center px-4 py-2 rounded-md border text-sm font-medium transition-colors",
        disabled
          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
          : "bg-gray-800 text-white hover:bg-gray-700",
        className
      )}
    >
      {direction === "left" && <ArrowLeft className="w-4 h-4 mr-2" />}
      <span>{label}</span>
      {direction === "right" && <ArrowRight className="w-4 h-4 ml-2" />}
    </button>
  );
};

export default NavigationButton;
