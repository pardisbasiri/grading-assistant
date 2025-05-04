"use client"

import Link from "next/link";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, Line, LineChart, Area, AreaChart } from "recharts"

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
  { day: "Apr 07", students_inclass: 28 },
  { day: "Apr 10", students_inclass: 25 },
  { day: "Apr 14", students_inclass: 30 },
  { day: "Apr 17", students_inclass: 29 },
  { day: "Apr 21", students_inclass: 26 },
  { day: "Apr 24", students_inclass: 30 },
  { day: "Apr 28", students_inclass: 27 },
]

const chart3Data = [
  { group: "Group 1", message: "Low attendance in April" },
  { group: "Group 3", message: "Project deadline missed" },
  { group: "Group 5", message: "Peer review conflicts" },
]

const chart4Data = [
  { student: "Ana Maria Gomez", message: "Absent 3 times this week" },
  { student: "Luia Garces", message: "Low grade score average" },
  { student: "Tom Stephensen", message: "Frequently late to class" },
]

const chart5Data = [
  { Assignment: "Assignment 1", group1: 7, group2: 9, group3: 7, group4: 8, group5: 6 },
  { Assignment: "Assignment 2", group1: 8, group2: 8, group3: 7, group4: 8, group5: 7 },
  { Assignment: "Assignment 3", group1: 6, group2: 10, group3: 8, group4: 7, group5: 6 },
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
  group1: { label: "Group 1", color: "hsl(var(--chart-1))" },
  group2: { label: "Group 2", color: "hsl(var(--chart-2))" },
  group3: { label: "Group 3", color: "hsl(var(--chart-3))" },
  group4: { label: "Group 4", color: "hsl(var(--chart-4))" },
  group5: { label: "Group 5", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig

export function ChartsSideBySide() {
  return (
    <div className="space-y-4">
      <div className="flex w-full flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <ChartWeightedAverage />
        <ChartAverageAttendance />
      </div>
      <div className="flex w-full flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <ChartGroupWarnings />
        <ChartStudentWarnings />
      </div>
      <div className="flex w-full flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <AssignmentOverview />
      </div>
    </div>
  );
}


const commonCardStyles = "w-full md:w-1/2 p-4 text-sm"

export function ChartWeightedAverage() {
  return (
    <Card className={commonCardStyles}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Class grade distribution</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">Grades 1–10</CardDescription>
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

export function ChartAverageAttendance() {
  return (
    <Card className={commonCardStyles}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Average attendance over time</CardTitle>
        <CardDescription>April 2025</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={chart2Data}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            width={undefined}
            height={200}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(4)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillAttendance" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-students_inclass)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-students_inclass)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="students_inclass"
              type="natural"
              fill="url(#fillAttendance)"
              stroke="var(--color-students_inclass)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex w-full flex-col gap-1 text-sm">
          <div className="flex items-center gap-2 font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground">Showing total visitors (last 6 days)</div>
        </div>
      </CardFooter>
    </Card>
  );
}


export function ChartGroupWarnings() {
  return (
    <Card className={commonCardStyles}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Group Alerts</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">April 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {chart3Data.map((data) => (
            <div key={data.group} className="p-3 bg-gray-100 rounded-md">
              <p className="text-sm font-semibold">{data.group}</p>
              <p className="text-xs text-muted-foreground">{data.message}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function ChartStudentWarnings() {
  return (
    <Card className={`${commonCardStyles} hover:cursor-pointer`}>
      <Link href="/dashboard2" className="block w-full h-full">
        <div className="w-full h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Student Alerts</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              April 2025
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {chart4Data.map((data) => (
                <div key={data.student} className="p-3 bg-gray-100 rounded-md">
                  <p className="text-sm font-semibold">{data.student}</p>
                  <p className="text-xs text-muted-foreground">{data.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </div>
      </Link>
    </Card>
  );
}

export function AssignmentOverview() {
  return (
    <Card className={commonCardStyles}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Assignment Scores</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">Comparison across 5 groups</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chart5Data}
            width={320}
            height={220}
            margin={{ top: 20 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="Assignment"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="group1" fill="var(--color-group1)" radius={6} />
            <Bar dataKey="group2" fill="var(--color-group2)" radius={6} />
            <Bar dataKey="group3" fill="var(--color-group3)" radius={6} />
            <Bar dataKey="group4" fill="var(--color-group4)" radius={6} />
            <Bar dataKey="group5" fill="var(--color-group5)" radius={6} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1 text-xs">
        <div className="flex gap-1 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-3 w-3" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing group performance across assignments
        </div>
      </CardFooter>
    </Card>
  );
}
