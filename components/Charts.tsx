"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, Line, LineChart } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"

import { TrendingUp } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const chartData = [
  { grade: "1", n_student: 0 },
  { grade: "2", n_student: 0 },
  { grade: "3", n_student: 2 },
  { grade: "4", n_student: 3 },
  { grade: "5", n_student: 1 },
  { grade: "6", n_student: 6 },
  { grade: "7", n_student: 12 },
  { grade: "8", n_student: 8 },
  { grade: "9", n_student: 7 },
  { grade: "10", n_student: 2 },
]

const chart2Data = [
  { day: "7.04", students_inclass: 28 },
  { day: "14.04", students_inclass: 25 },
  { day: "21.04", students_inclass: 29 },
  { day: "28.04", students_inclass: 24 },
]

const chartConfig = {
  n_student: {
    label: "Number of students ",
    color: "hsl(var(--chart-1))",
  },
  students_inclass: {
    label: "Students in class",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function ChartsSideBySide() {
  return (
    <div className="flex w-full space-x-4">
      {/* First chart (Left side) */}
      <div className="w-1/2">
        <ChartWeightedAverage />
      </div>

      {/* Second chart (Right side) */}
      <div className="w-1/2">
        <ChartAverageAttendence />
      </div>
    </div>
  );
}

export function ChartWeightedAverage() {
  return (
    <Card className="p-2 text-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Class grade distribution</CardTitle>
        <CardDescription>Grade: 1 - 10</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            width={320}
            height={220}
            data={chartData}
            margin={{ top: 20 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="grade"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="n_student" fill="var(--color-n_student)" radius={6}>
              <LabelList
                position="top"
                offset={8}
                className="fill-foreground"
                fontSize={11}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1 text-xs">
        <div className="flex gap-1 font-medium leading-none">
          Trending up by 5.2% <TrendingUp className="h-3 w-3" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors (last 6 months)
        </div>
      </CardFooter>
    </Card>
  );
}

export function ChartAverageAttendence() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Average attendance over time</CardTitle>
        <CardDescription>April 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chart2Data}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 5)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="students_inclass"
              type="natural"
              stroke="var(--color-students_inclass)"
              strokeWidth={3}
              dot={{
                fill: "var(--color-students_inclass)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}



