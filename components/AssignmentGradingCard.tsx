import React, { useRef } from 'react';
import { cn } from "@/lib/utils";
import { ChevronRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AssignmentGradingCardProps {
  id: string;
  name: string;
  dueDate: string;
  deliveryStatus: string;
  gradingStatus: string;
  onClick: (assignmentId: string) => void;
  className?: string;
}

export function AssignmentGradingCard({
  id,
  name,
  dueDate,
  deliveryStatus,
  gradingStatus,
  onClick,
  className
}: AssignmentGradingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    onClick(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const previous = cardRef.current?.previousElementSibling as HTMLElement;
      previous?.focus();
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = cardRef.current?.nextElementSibling as HTMLElement;
      next?.focus();
    }
  };

  return (
    <Card
      ref={cardRef}
      className={cn(
        "w-full cursor-pointer hover:ring-2 ring-primary hover:bg-muted transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Open assignment ${name}`}
    >
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-lg">{name}</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 flex justify-between items-start">
        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">Due date: {dueDate}</p>
          <p className="text-sm text-muted-foreground">{deliveryStatus}</p>
        </div>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-sm font-medium text-muted-foreground">{gradingStatus}</span>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );
}
