"use client" //its a directive, has to be the first line

import { zodResolver } from "@hookform/resolvers/zod" //to create a form
import { useForm } from "react-hook-form" //to create a form
import { z } from "zod" //for the shape

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({ //for the shape, e.g. username must be at least 2 characters, has to be defined
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  username2: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      username2: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username 1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username2</FormLabel>
              <FormControl>
                <Input placeholder="username 2" {...field} />
              </FormControl>
              <FormDescription>
                This is uyour second name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="outline" type="submit">Submit</Button>
      </form>
    </Form>
  )
}
