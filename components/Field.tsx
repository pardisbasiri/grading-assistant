import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type FieldOutlineProps ={
  fieldname: string;
  placeholder: string;
}

export function InputDemo() {
  return <Input type="email" placeholder="Email" />
}

export function InputWithLabel({ fieldname, placeholder}: FieldOutlineProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={fieldname}>{fieldname}</Label>
      <Input type={fieldname} id={fieldname} placeholder={placeholder} />
    </div>
  )
}

export function InputDisabled() {
  return <Input disabled type="email" placeholder="Email" />
}
