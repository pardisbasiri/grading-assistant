import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
 
type SliderProps = React.ComponentProps<typeof Slider>
 
export function SliderDemo({ className, ...props }: SliderProps) {
  return (
    <Slider
      defaultValue={[50]}
      max={100}
      step={1}
      className={cn("w-[60%]", className)}
      {...props}
    />
  )
}

import * as React from "react"

export function SliderDemo2() {
  const [value, setValue] = React.useState([50])

  return (
    <div className="flex flex-col gap-2 w-full max-w-md">
      <label htmlFor="my-slider" className="text-sm font-medium">
        Weight
      </label>
      <div className="flex items-center gap-4">
        <Slider
          id="my-slider"
          defaultValue={[50]}
          max={100}
          step={1}
          value={value}
          onValueChange={setValue}
          className="w-full
    [&_[data-slot=slider-track]]:bg-gray-300
    [&_[data-slot=slider-range]]:bg-gray-800
    [&_[data-slot=slider-thumb]]:bg-white
    [&_[data-slot=slider-thumb]]:border
    [&_[data-slot=slider-thumb]]:border-grey-1000"
        />
        <span className="text-sm text-muted-foreground w-10">
          {value[0]+"/100"}
        </span>
      </div>
    </div>
  )
}