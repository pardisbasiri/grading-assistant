import { toast } from "sonner"

export function showCustomToast(message: string, onUndo?: () => void) {
  const toastId = toast(message, {
    description: "Operation completed successfully.",
    action: onUndo ? (
      <button
        onClick={() => {
          onUndo()
          toast.dismiss(toastId)    
        }}
        className="ml-10 text-sm font-medium text-primary border border-gray-300 bg-white hover:bg-gray-100 rounded-md px-3 py-1"
      >
        Undo
      </button>
    ) : undefined,
  })
}


