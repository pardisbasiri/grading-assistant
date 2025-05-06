"use client"
import React from "react";

import Link from "next/link";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  Line,
  LineChart,
  Area,
  AreaChart,
  Label,
  Pie,
  PieChart,
  Cell
 } from "recharts"

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
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <ChartWeightedAverage />
        </div>
        <div className="flex-1">
          <ChartAverageAttendance />
        </div>
      </div>
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <ChartGroupWarnings />
        </div>
        <div className="flex-1"> 
          <ChartStudentWarnings />
        </div>
      </div>
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <AssignmentOverview />
        </div>
      </div>
    </div>
  );
}

const commonCardStyles = "flex h-full flex-col";

export function ChartWeightedAverage() {
  return (
    <Card className={commonCardStyles}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base md:text-lg">Class Grade Distribution</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">Grades 1–10</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="h-[220px] w-full sm:h-[250px]">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
            accessibilityLayer
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="grade"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              fontSize={11}
            />
            
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel className="bg-white shadow-lg rounded-lg"/>}
            />
            <Bar dataKey="n_student" fill="var(--color-n_student)" radius={5}>
              <LabelList
                position="top"
                offset={6}
                className="fill-foreground"
                fontSize={10}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1 pt-2 text-xs">
        <div className="flex gap-1 font-medium leading-none">
          Average Grade: <span className="text-muted-foreground">7.1</span>
        </div>
        <div className="leading-none text-muted-foreground">
          Distribution across 41 students
        </div>
      </CardFooter>
    </Card>
  );
}

export function ChartAverageAttendance() {
  return (
    <Card className={commonCardStyles}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base md:text-lg">Average Attendance</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">April 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pt-0 pb-0">
        <ChartContainer config={chartConfig} className="h-[220px] w-full sm:h-[250px]">
          <AreaChart
            data={chart2Data}
            margin={{ top: 15, right: 10, left: 0, bottom: 0 }}
            accessibilityLayer
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={11}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" className="bg-white shadow-lg rounded-lg"/>} />
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
               dot={{ r: 3 }}
               activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1 pt-2 text-xs">
        <div className="flex items-center gap-1 font-medium leading-none">
          Trending slightly down <TrendingUp className="h-3 w-3 text-destructive rotate-180" />
        </div>
         <div className="leading-none text-muted-foreground">Compared to last period</div>
      </CardFooter>
    </Card>
  );
}

export function ChartGroupWarnings() {
  return (
    <Card className={commonCardStyles}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base md:text-lg">Group Alerts</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">Active Issues - April 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-2 overflow-y-auto pt-2 pb-2">
        {chart3Data.length > 0 ? (
          chart3Data.map((data) => (
            <div key={data.group} className="p-2 bg-muted/50 rounded-md border">
              <p className="text-sm font-medium">{data.group}</p>
              <p className="text-xs text-muted-foreground">{data.message}</p>
            </div>
          ))
         ) : (
           <p className="text-sm text-muted-foreground italic text-center pt-4">No active group alerts.</p>
         )}
      </CardContent>
       <CardFooter className="pt-2 border-t">
         <p className="text-xs text-muted-foreground">{chart3Data.length} Active Alerts</p>
       </CardFooter>
    </Card>
  );
}

export function ChartStudentWarnings() {
  return (
    <Link href="/dashboard2" className="block w-full h-full">
      <Card className={`${commonCardStyles} hover:shadow-lg hover:border-primary/50 transition`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-base md:text-lg">Student Alerts</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Needs Attention - April 2025
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 space-y-2 overflow-y-auto pt-2 pb-2">
          {chart4Data.length > 0 ? (
            chart4Data.map((data) => (
              <div key={data.student} className="p-2 bg-muted/50 rounded-md border">
                <p className="text-sm font-medium">{data.student}</p>
                <p className="text-xs text-muted-foreground">{data.message}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground italic text-center pt-4">No active student alerts.</p>
          )}
        </CardContent>
        <CardFooter className="pt-2 border-t">
          <p className="text-xs text-muted-foreground">{chart4Data.length} Active Alerts</p>
        </CardFooter>
      </Card>
    </Link>
  );
}

export function AssignmentOverview() {
  return (
    <Card className={commonCardStyles}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base md:text-lg">Assignment Scores</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">Comparison across 5 groups</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="h-[220px] w-full sm:h-[250px]">
          <BarChart
            data={chart5Data}
            margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
            accessibilityLayer
            barGap={4} 
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="Assignment"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              fontSize={11}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" className="bg-white shadow-lg rounded-lg"/>}
            />
             <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="group1" fill="var(--color-group1)" radius={4} /> 
            <Bar dataKey="group2" fill="var(--color-group2)" radius={4} />
            <Bar dataKey="group3" fill="var(--color-group3)" radius={4} />
            <Bar dataKey="group4" fill="var(--color-group4)" radius={4} />
            <Bar dataKey="group5" fill="var(--color-group5)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1 pt-2 text-xs">
        <div className="flex gap-1 font-medium leading-none">
          Group 2 consistently high <TrendingUp className="h-3 w-3 text-success" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing group performance across 3 assignments
        </div>
      </CardFooter>
    </Card>
  );
}