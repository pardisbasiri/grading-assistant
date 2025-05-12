import { useDrag, DragSourceMonitor } from 'react-dnd';
import { useRef, useEffect } from 'react';
import { User } from "lucide-react";

export type Student = {
  id: string;
  name: string;
  major: string;
};

interface Props {
  student: Student;
  index: number;
  total: number;
  onMoveLeft: (student: Student) => void;
  onMoveRight: (student: Student) => void;
}

export default function DraggableStudentCard({
  student,
  index,
  total,
  onMoveLeft,
  onMoveRight
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'STUDENT',
    item: { ...student },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    if (ref.current) {
      drag(ref);
    }
  }, [ref, drag]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      onMoveLeft(student);
      e.preventDefault();
    }
    if (e.key === 'ArrowRight') {
      onMoveRight(student);
      e.preventDefault();
    }
    if (e.key === 'ArrowUp' && index > 0) {
      const prev = document.querySelector<HTMLDivElement>(
        `[data-student-index='${index - 1}']`
      );
      prev?.focus();
      e.preventDefault();
    }
    if (e.key === 'ArrowDown' && index < total - 1) {
      const next = document.querySelector<HTMLDivElement>(
        `[data-student-index='${index + 1}']`
      );
      next?.focus();
      e.preventDefault();
    }
  };

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      data-student-index={index}
      onKeyDown={handleKeyDown}
      className="bg-white border border-muted rounded-xl px-4 py-3 mb-2 shadow-sm flex justify-between items-center hover:ring-2 ring-primary hover:bg-muted/80 transition focus:outline-none focus:ring-2 focus:ring-primary"
      style={{ opacity: isDragging ? 0.5 : 1 }}
      aria-label={`Student ${student.name}, ${student.major}`}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <User className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="text-left">
          <p className="font-medium text-sm">{student.name}</p>
          <p className="text-xs text-muted-foreground">{student.major}</p>
        </div>
      </div>

      {/* Drag Handle (dots) */}
      <div className="grid grid-cols-2 gap-x-1 gap-y-1 pr-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="w-1 h-1 bg-muted-foreground rounded-full"
          />
        ))}
      </div>
    </div>
  );
}
