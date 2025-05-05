// components/grouping/DeleteGroupAlert.tsx
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
  
  interface Props {
    open: boolean;
    onCancel: () => void;
    onMoveToLast: () => void;
    onRedistribute: () => void;
  }
  
  export default function DeleteGroupAlert({
    open,
    onCancel,
    onMoveToLast,
    onRedistribute,
  }: Props) {
    return (
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this group?</AlertDialogTitle>
            <AlertDialogDescription>
              What should we do with the students in this group?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col gap-2">
            <AlertDialogAction onClick={onMoveToLast}>
              Move them to the last group
            </AlertDialogAction>
            <AlertDialogAction onClick={onRedistribute}>
              Redistribute randomly
            </AlertDialogAction>
            <AlertDialogCancel onClick={onCancel}>
              Cancel and reassign manually
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  