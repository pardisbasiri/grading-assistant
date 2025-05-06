// components/grouping/StudentGroupManager.tsx
import { useState } from 'react';
import GroupColumn from './GroupColumn';
import { Student } from './DraggableStudentCard';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const initialGroups: Student[][] = [
  [
    { id: '1', name: 'Hugo Martin', major: 'Computer Science' },
    { id: '2', name: 'Elena Sanchez', major: 'Computer Science' },
    { id: '3', name: 'Daniel Torrez', major: 'Psychology' },
    { id: '4', name: 'Sofia Molina', major: 'HCID' },
    { id: '5', name: 'Andrian Castillo', major: 'HCID' },
  ],
  [
    { id: '6', name: 'Hugo Martin', major: 'Computer Science' },
    { id: '7', name: 'Elena Sanchez', major: 'Computer Science' },
    { id: '8', name: 'Daniel Torrez', major: 'Psychology' },
    { id: '9', name: 'Sofia Molina', major: 'HCID' },
    { id: '10', name: 'Andrian Castillo', major: 'HCID' },
  ],
  [
    { id: '11', name: 'Hugo Martin', major: 'Computer Science' },
    { id: '12', name: 'Elena Sanchez', major: 'Computer Science' },
    { id: '13', name: 'Daniel Torrez', major: 'Psychology' },
    { id: '14', name: 'Sofia Molina', major: 'HCID' },
    { id: '15', name: 'Andrian Castillo', major: 'HCID' },
  ],
  [
    { id: '16', name: 'Hugo Martin', major: 'Computer Science' },
    { id: '17', name: 'Elena Sanchez', major: 'Computer Science' },
    { id: '18', name: 'Daniel Torrez', major: 'Psychology' },
    { id: '19', name: 'Sofia Molina', major: 'HCID' },
    { id: '20', name: 'Andrian Castillo', major: 'HCID' },
  ],
  [
    { id: '21', name: 'Hugo Martin', major: 'Computer Science' },
    { id: '22', name: 'Elena Sanchez', major: 'Computer Science' },
    { id: '23', name: 'Daniel Torrez', major: 'Psychology' },
    { id: '24', name: 'Sofia Molina', major: 'HCID' },
    { id: '25', name: 'Andrian Castillo', major: 'HCID' },
  ],
  [
    { id: '26', name: 'Javier Castillo', major: 'Computer Science' },
    { id: '27', name: 'Elena Castigez', major: 'Computer Science' },
    { id: '28', name: 'Lucia Torrez', major: 'Psychology' },
    { id: '29', name: 'Patricia Vega', major: 'HCID' },
    { id: '30', name: 'Sergio Vargas', major: 'HCID' },
  ],
];

export default function StudentGroupManager() {
  const [groups, setGroups] = useState<Student[][]>(initialGroups);
  const [groupToDelete, setGroupToDelete] = useState<number | null>(null);

  const handleDropStudent = (targetGroupId: number, student: Student) => {
    setGroups((prevGroups) => {
      const updatedGroups = prevGroups.map((group) =>
        group.filter((s) => s.id !== student.id)
      );
      updatedGroups[targetGroupId].push(student);
      return updatedGroups;
    });
  };

  const handleDeleteGroup = (index: number) => {
    setGroupToDelete(index);
  };

  const confirmDeleteGroup = (action: 'move' | 'redistribute') => {
    if (groupToDelete === null) return;

    const studentsToMove = groups[groupToDelete];
    const newGroups = groups.filter((_, i) => i !== groupToDelete);

    if (action === 'move') {
      newGroups[newGroups.length - 1].push(...studentsToMove);
    } else if (action === 'redistribute') {
      studentsToMove.forEach((student, idx) => {
        const targetGroup = idx % newGroups.length;
        newGroups[targetGroup].push(student);
      });
    }

    setGroups(newGroups);
    setGroupToDelete(null);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
        {groups.map((students, idx) => (
          <GroupColumn
            key={idx}
            groupId={idx}
            students={students}
            onDropStudent={handleDropStudent}
            onDeleteGroup={() => handleDeleteGroup(idx)}
          />
        ))}
      </div>

      <AlertDialog open={groupToDelete !== null} onOpenChange={() => setGroupToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this group?</AlertDialogTitle>
            <AlertDialogDescription>
              What should we do with the students in this group?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => confirmDeleteGroup('move')}>
              Move them to the last group
            </AlertDialogAction>
            <AlertDialogAction onClick={() => confirmDeleteGroup('redistribute')}>
              Redistribute randomly
            </AlertDialogAction>
            <AlertDialogCancel>Cancel and reassign manually</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DndProvider>
  );
}
