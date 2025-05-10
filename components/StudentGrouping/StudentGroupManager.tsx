// components/grouping/StudentGroupManager.tsx
import { useState, useEffect } from 'react';
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
  // Group 1
  [
    { id: '1', name: 'Hugo Martin', major: 'Computer Science' },
    { id: '2', name: 'Elena Sanchez', major: 'Computer Science' },
    { id: '3', name: 'Daniel Torrez', major: 'Psychology' },
    { id: '4', name: 'Sofia Molina', major: 'HCID' },
    { id: '5', name: 'Andrian Castillo', major: 'HCID' },
  ],
  // Group 2
  [
    { id: '6', name: 'Erik Johansson', major: 'Computer Science' },
    { id: '7', name: 'Yuki Tanaka', major: 'Computer Science' },
    { id: '8', name: 'Elena Sanchez', major: 'Psychology' },
    { id: '9', name: 'Luca Moretti', major: 'HCID' },
    { id: '10', name: 'Aisha Khan', major: 'HCID' },
  ],
  // Group 3
  [
    { id: '11', name: 'Maria Hernandez', major: 'Computer Science' },
    { id: '12', name: 'Mia Nilsson', major: 'Computer Science' },
    { id: '13', name: 'Fatima El-Sayed', major: 'Psychology' },
    { id: '14', name: 'David Johnson', major: 'HCID' },
    { id: '15', name: 'Chen Wei', major: 'HCID' },
  ],
  // Group 4
  [
    { id: '16', name: 'Tomasz Kowalski', major: 'Computer Science' },
    { id: '17', name: 'Anna Nowak', major: 'Computer Science' },
    { id: '18', name: 'Marco Rossi', major: 'Psychology' },
    { id: '19', name: 'Sofia Ivanov', major: 'HCID' },
    { id: '20', name: 'Kai Yamamoto', major: 'HCID' },
  ],
  // Group 5
  [
    { id: '21', name: 'Alejandro Fernandez', major: 'Computer Science' },
    { id: '22', name: 'Ana Maria Gomez', major: 'Computer Science' },
    { id: '23', name: 'Gabriel López', major: 'Psychology' },
    { id: '24', name: 'Elena Martinez', major: 'HCID' },
    { id: '25', name: 'Beatriz Torres', major: 'HCID' },
  ],
  // Group 6
  [
    { id: '26', name: 'Javier Castillo', major: 'Computer Science' },
    { id: '27', name: 'Elena Castillez', major: 'Computer Science' },
    { id: '28', name: 'Lucia Torrez', major: 'Psychology' },
    { id: '29', name: 'Patricia Vega', major: 'HCID' },
    { id: '30', name: 'Sergio Vargas', major: 'HCID' },
  ],
];

export default function StudentGroupManager() {
  const [groups, setGroups] = useState<Student[][]>(initialGroups);
  const [groupToDelete, setGroupToDelete] = useState<number | null>(null);

  useEffect(() => {
    const addGroupHandler = () => {
      setGroups((prev) => [[], ...prev]);
    };

    const shuffleHandler = () => {
      const allStudents = groups.flat();
      const shuffled = [...allStudents].sort(() => Math.random() - 0.5);
      const groupCount = groups.length;
      const newGroups: Student[][] = Array.from({ length: groupCount }, () => []);

      shuffled.forEach((student, i) => {
        newGroups[i % groupCount].push(student);
      });

      setGroups(newGroups);
    };

    window.addEventListener("add-group", addGroupHandler);
    window.addEventListener("shuffle-students", shuffleHandler);

    return () => {
      window.removeEventListener("add-group", addGroupHandler);
      window.removeEventListener("shuffle-students", shuffleHandler);
    };
  }, [groups]);

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
      <AlertDialogContent className="!max-w-4xl w-full bg-white rounded-lg shadow-xl p-6 z-50">
  <AlertDialogHeader>
    <AlertDialogTitle className="text-lg font-semibold">
      Delete this group?
    </AlertDialogTitle>
    <AlertDialogDescription className="text-sm text-gray-600 mt-2">
      What should we do with the students in this group?
    </AlertDialogDescription>
  </AlertDialogHeader>
  <AlertDialogFooter className="flex flex-wrap sm:flex-nowrap gap-4 mt-4 justify-start">
  <AlertDialogAction
  onClick={() => confirmDeleteGroup('move')}
  className="text-red-600 border border-input shadow-sm hover:bg-transparent"
>
  Move them to the last group
</AlertDialogAction>

<AlertDialogAction
  onClick={() => confirmDeleteGroup('redistribute')}
  className="text-red-600 border border-input shadow-sm hover:bg-transparent"
>
  Redistribute randomly
</AlertDialogAction>

  <AlertDialogCancel>
    Cancel and reassign manually
  </AlertDialogCancel>
</AlertDialogFooter>
</AlertDialogContent>

</AlertDialog>

    </DndProvider>
  );
}
