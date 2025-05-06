// components/button.tsx
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { MailOpen } from "lucide-react"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"


type ButtonOutlineProps ={
  buttonname: string;
  onClick?: () => void;  // Add this to accept onClick as a prop
}
 
export function ButtonOutline({ buttonname, onClick}: ButtonOutlineProps) {
  return (
  <Button 
  onClick={onClick} variant="outline">{buttonname}</Button>
  )
}

export function ButtonOutlineBig({ buttonname, onClick}: ButtonOutlineProps) {
  return (
  <Button 
  onClick={onClick} 
  variant="outline"
  className={cn("border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:border-slate-400 w-[400px] h-[200px]")}>
    {buttonname}
  </Button>
  )
}

export function ButtonDestructive() {
  return <Button variant="destructive">Destructive</Button>
}

export function ButtonGhost() {
  return <Button variant="ghost">Ghost</Button>
}

export function ButtonLink({ buttonname}: ButtonOutlineProps) {
  return <Button variant="link">{buttonname}</Button>
}

export function ButtonIcon() {
  return (
    <Button variant="outline" size="icon">
      <ChevronRight />
    </Button>
  )
}

export function ButtonWithIcon() {
  return (
    <Button>
      <MailOpen /> Login with Email
    </Button>
  )
}

export function ButtonLoading() {
  return (
    <Button disabled>
      <Loader2 className="animate-spin" />
      Please wait
    </Button>
  )
}

export function ButtonAsChild() {
  return (
    <Button asChild>
      <Link href="/login">Login</Link>
    </Button>
  )
}