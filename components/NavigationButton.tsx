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
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((e.key === "Enter" || e.key === " ") && !disabled) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <button
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={`${label} button`}
      disabled={disabled}
      className={cn(
        "flex items-center h-9 px-4 py-2 rounded-md border text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        disabled
          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
          : "bg-gray-900 text-white hover:bg-gray-800",
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
