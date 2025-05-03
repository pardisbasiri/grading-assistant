import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
 
export function AvatarDemo() {
  return (
    <Avatar className="w-24 h-24 mb-2">
      <AvatarImage src="/prof.jpg" alt="Prof" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}