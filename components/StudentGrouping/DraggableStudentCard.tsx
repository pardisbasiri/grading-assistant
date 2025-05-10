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
}

export default function DraggableStudentCard({ student }: Props) {
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

  return (
    <div
      ref={ref}
      className="bg-white border border-muted rounded-xl px-4 py-3 mb-2 shadow-sm flex justify-between items-center hover:ring-2 ring-primary hover:bg-muted/80 transition"
      style={{ opacity: isDragging ? 0.5 : 1 }}
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

      {/* Drag Handle */}
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
