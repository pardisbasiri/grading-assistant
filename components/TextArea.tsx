import { Textarea } from "@/components/ui/textarea"
import { Label } from "@radix-ui/react-label"
import { Button } from "@/components/ui/button"

export function TextareaDemo() {
  return <Textarea placeholder="Type your general feedback here." />
}

export function TextareaDisabled() {
  return <Textarea placeholder="Type your message here." disabled />
}

export function TextareaWithLabel() {
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">General feedback</Label>
      <Textarea placeholder="Type your general feedback here." id="message" />
    </div>
  )
}

export function TextareaWithText() {
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message-2">Your Message</Label>
      <Textarea placeholder="Type your message here." id="message-2" />
      <p className="text-sm text-muted-foreground">
        Your message will be copied to the support team.
      </p>
    </div>
  )
}
 
export function TextareaWithButton() {
  return (
    <div className="grid w-full gap-2">
      <Textarea placeholder="Type your message here." />
      <Button>Send message</Button>
    </div>
  )
}