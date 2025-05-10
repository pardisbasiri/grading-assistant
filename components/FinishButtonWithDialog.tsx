import { useState } from "react"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface FinishButtonWithDialogProps {
  onConfirm: () => void
  onUndo?: () => void
  buttonLabel?: string
  dialogTitle?: string
  dialogDescription?: string
}

export default function FinishButtonWithDialog({
  onConfirm,
  onUndo,
  buttonLabel = "Publish",    // ✅ Default label updated to "Publish"
  dialogTitle = "Are you sure about publishing?",
  dialogDescription = "This action will publish your work and you cannot edit the details later.",
}: FinishButtonWithDialogProps) {
  const [open, setOpen] = useState(false)

  const handleConfirm = () => {
    setOpen(false)
    onConfirm()
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className="bg-gray-900 text-white hover:bg-gray-800"
          onClick={() => setOpen(true)}
        >
          {buttonLabel}
          <ArrowRight className="ml-2 h-4 w-4" />   {/* ✅ Perfect icon & spacing */}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-500">
  {dialogDescription}
</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border border-gray-300 bg-white text-black hover:bg-gray-100">
  Cancel
</AlertDialogCancel>
          <AlertDialogAction
  className="bg-gray-900 text-white hover:bg-gray-800"
  onClick={() => {
    setOpen(false)
    onConfirm()   
  }}
>
  Publish
</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
