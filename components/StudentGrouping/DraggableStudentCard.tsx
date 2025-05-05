// components/grouping/DraggableStudentCard.tsx
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
      className="bg-white border rounded px-3 py-2 mb-2 shadow-sm flex justify-between items-center"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <User className="w-4 h-4 text-gray-500" />
        </div>
        <div className="text-left">
          <p className="font-semibold leading-4">{student.name}</p>
          <p className="text-sm text-gray-500 leading-4">{student.major}</p>
        </div>
      </div>
  
      {/* Drag Handle */}
      <div className="grid grid-cols-2 gap-x-1 gap-y-1 pr-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="w-1 h-1 bg-gray-500 rounded-full"
          />
        ))}
      </div>
    </div>
  );
  
  
}


