// src/components/Alert.tsx

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
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AlertDialogSave() {
  const handleConfirmSave = () => {
    console.log("Save Confirmed!");
    // Add your real save logic here
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Save</Button>
      </AlertDialogTrigger>
      {/* Add background, padding, shadow, rounded corners back */}
      <AlertDialogContent className="bg-white shadow-lg rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will save your work.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {/* Revert footer to default layout */}
        <AlertDialogFooter>
          {/* Use asChild and provide an explicit Button for Cancel styling */}
          <AlertDialogCancel asChild>
          <Button className="text-red-400">Cancel</Button>
          </AlertDialogCancel>
          {/* Continue button uses outline variant */}
          <AlertDialogAction
            onClick={handleConfirmSave}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function AlertDialogPublish() {
   const handleConfirmPublish = () => {
    console.log("Publish Confirmed!");
    // Add your real publish logic here
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Publish</Button>
      </AlertDialogTrigger>
       {/* Add background, padding, shadow, rounded corners back */}
      <AlertDialogContent className="bg-white shadow-lg rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will publish your work.
          </AlertDialogDescription>
        </AlertDialogHeader>
         {/* Revert footer to default layout */}
        <AlertDialogFooter>
           {/* Use asChild and provide an explicit Button for Cancel styling */}
           <AlertDialogCancel asChild>
           <Button className="text-red-400">Cancel</Button>
           </AlertDialogCancel>
           {/* Continue button uses outline variant */}
          <AlertDialogAction
            onClick={handleConfirmPublish}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}