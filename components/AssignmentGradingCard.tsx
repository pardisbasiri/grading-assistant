// components/AssignmentGradingCard.tsx
import React from 'react';
import { cn } from "@/lib/utils";
import { ChevronRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
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

  const handleClick = () => {
    onClick(id);
  };

  return (
    <Card
      className={cn(
        "w-full hover:bg-muted/80 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      onClick={handleClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }} // For keyboard accessibility
      role="button"
      tabIndex={0}
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