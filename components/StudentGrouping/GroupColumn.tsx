// components/grouping/GroupColumn.tsx
import { Student } from './DraggableStudentCard';
import DraggableStudentCard from './DraggableStudentCard';
import { Trash2 } from 'lucide-react';
import { useDrop } from 'react-dnd';
import { useRef, useEffect } from 'react';

interface Props {
    groupId: number;
    students: Student[];
    onDropStudent: (targetGroupId: number, student: Student) => void;
    onDeleteGroup: () => void;
}

export default function GroupColumn({
    groupId,
    students,
    onDropStudent,
    onDeleteGroup,
}: Props) {
    const ref = useRef<HTMLDivElement>(null);

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: 'STUDENT',
        drop: (item: Student) => {
            onDropStudent(groupId, item);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    useEffect(() => {
        if (ref.current) {
            drop(ref);
        }
    }, [ref, drop]);

    // NEW helper functions
    const handleMoveLeft = (student: Student) => {
        if (groupId > 0) {
            onDropStudent(groupId - 1, student);
        }
    };

    const handleMoveRight = (student: Student) => {
        onDropStudent(groupId + 1, student);
    };

    return (
        <div
            ref={ref}
            className={`bg-gray-100 rounded-md p-4 ${
                isOver && canDrop ? 'ring-2 ring-blue-400' : ''
            }`}
        >
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">Group {groupId + 1}</h2>
                <button
                    onClick={onDeleteGroup}
                    className="ml-auto rounded-md p-2 transition-all hover:bg-red-100 group"
                    aria-label={`Delete Group ${groupId + 1}`}
                >
                    <Trash2 className="h-4 w-4 text-red-500 group-hover:text-red-600" />
                </button>
            </div>

            <div>
                {students.map((student) => (
                    <DraggableStudentCard
                        key={student.id}
                        student={student}
                        onMoveLeft={handleMoveLeft}
                        onMoveRight={handleMoveRight}
                    />
                ))}
            </div>
        </div>
    );
}
