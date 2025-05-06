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
  Cell,
  ResponsiveContainer
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

// --- Data ---
const chartAnaPresenceData = [
  { status: "Present", n_days: 18, fill: "var(--color-present)" },
  { status: "Absent", n_days: 5, fill: "var(--color-absent)" },
]

const chartAnaGradeData = [
  { assignment: "Finding users needs", grade: 5.8, weight: 20, fill: "var(--color-assignment1)" },
  { assignment: "Low fidelity prototype", grade: 6.5, weight: 20, fill: "var(--color-assignment2)" },
  { assignment: "User testing", grade: 7.0, weight: 15, fill: "var(--color-assignment3)" },
];

const chartSummaryData = [
  { title: "User testing", type: "Report", weight: "15/100", grade: "7.0", Feedback: "In the peer evaluation made by her group mates it was written that Ana worked only on one paragraph of the report" },
  { title: "Low fidelity prototype", type: "Report", weight: "20/100", grade: "6.5", Feedback: "The group delivered the work one day late" },
  { title: "Finding users needs", type: "Report", weight: "20/100", grade: "5.8", Feedback: "My feedback on her work was “focus more on the user needs instead of generalised needs" },
] 


// --- Config ---
const chartConfig = {
  n_days: {
    label: "Days",
  },
  grade: {
    label: "Grade",
  },

  Present: {
    label: "Present",
    color: "hsl(var(--chart-1))",
  },
  Absent: {
    label: "Absent",
    color: "hsl(var(--chart-2))",
  },
  "Finding users needs": {
    label: "Finding users needs",
    color: "hsl(var(--chart-1))",
  },
  "Low fidelity prototype": {
    label: "Low fidelity prototype",
    color: "hsl(var(--chart-2))",
  },
  "User testing": {
    label: "User testing",
    color: "hsl(var(--chart-3))",
  },

  present: { color: "hsl(var(--chart-1))" },
  absent: { color: "hsl(var(--chart-2))" },
  assignment1: { color: "hsl(var(--chart-1))" },
  assignment2: { color: "hsl(var(--chart-2))" },
  assignment3: { color: "hsl(var(--chart-3))" },

} satisfies ChartConfig

interface ChartsSideBySideProps {
  studentId: string;
}

export function ChartsSideBySide({ studentId }: ChartsSideBySideProps) {
  console.log("ChartsSideBySide rendered for studentId:", studentId);

  return (
    <div className="space-y-4">
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <ChartAnaPresence />
        </div>
        <div className="flex-1">
          <ChartAnaGradeScore />
        </div>
      </div>

      <div className="flex w-full flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <ChartSummaryFeedback />
        </div>
      </div>
    </div>
  );
}

const commonCardStyles = "flex h-full flex-col";

export function ChartAnaPresence() {
  const totalDays = React.useMemo(() => {
    return chartAnaPresenceData.reduce((acc, curr) => acc + curr.n_days, 0)
  }, [])

  return (

    <Card className={commonCardStyles}>
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-base md:text-lg">Attendance</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">Second Semester 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto h-[230px] w-full sm:h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="status" className="bg-white shadow-lg rounded-lg" />}
            />
            <Pie
              data={chartAnaPresenceData}
              dataKey="n_days"
              nameKey="status"
              innerRadius={60}
              outerRadius={85}
              strokeWidth={2}
              paddingAngle={2}
            >
              {chartAnaPresenceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}

              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalDays}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 20}
                          className="fill-muted-foreground text-xs"
                        >
                          Classes
                        </tspan>
                      </text>
                    )
                  }
                  return null
                }}
              />
            </Pie>
             <ChartLegend
               content={<ChartLegendContent nameKey="status" />}
               className="-mt-4"
             />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-1 text-xs pt-2 border-t"> 
         <div className="leading-none text-muted-foreground">
           {((chartAnaPresenceData.find(d => d.status === 'Present')?.n_days ?? 0) / totalDays * 100).toFixed(0)}% Presence Rate
         </div>
          <div className="flex items-center gap-1 font-medium leading-none">
            {chartAnaPresenceData.find(d => d.status === 'Absent')?.n_days ?? 0} Absences Recorded
          </div>
      </CardFooter>
    </Card>
  )
}

export function ChartAnaGradeScore() {
  const { weightedAverageGrade, totalWeight } = React.useMemo(() => {
    const totalW = chartAnaGradeData.reduce((acc, curr) => acc + curr.weight, 0);
    if (totalW === 0) return { weightedAverageGrade: 0, totalWeight: 0 };
    const weightedSum = chartAnaGradeData.reduce((acc, curr) => acc + (curr.grade * curr.weight), 0);
    return { weightedAverageGrade: weightedSum / totalW, totalWeight: totalW };
  }, []);

  return (
    
    <Card className={commonCardStyles}>
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-base md:text-lg">Assignment Grades</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">Weighted Average</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto h-[230px] w-full sm:h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}

              content={<ChartTooltipContent
                          nameKey="assignment"
                          className="bg-white shadow-lg rounded-lg"
                          formatter={(value, name, props) => `${props.payload.grade.toFixed(1)} (${props.payload.weight}%)`}
                       />}
            />
            <Pie
              data={chartAnaGradeData}
              dataKey="weight"
              nameKey="assignment"
              innerRadius={60}
              outerRadius={85}
              strokeWidth={2}
              paddingAngle={2}
            >
               {chartAnaGradeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}

              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 5}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {weightedAverageGrade.toFixed(1)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 15}
                          className="fill-muted-foreground text-xs"
                        >
                          Avg. Grade
                        </tspan>
                      </text>
                    )
                  }
                   return null
                }}
              />
            </Pie>
             <ChartLegend
               content={<ChartLegendContent nameKey="assignment" />}
               className="-mt-4"
             />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-1 text-xs pt-2 border-t">
        <div className="leading-none text-muted-foreground">
          Based on {chartAnaGradeData.length} assignments ({totalWeight}% of total grade)
        </div>
        <div className="flex items-center gap-1 font-medium leading-none">
           Highest: {Math.max(...chartAnaGradeData.map(a => a.grade)).toFixed(1)} ({chartAnaGradeData.find(a => a.grade === Math.max(...chartAnaGradeData.map(a => a.grade)))?.assignment})
        </div>
      </CardFooter>
    </Card>
  )
}

export function ChartSummaryFeedback() {
  return (
    
    <Card className={commonCardStyles}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base md:text-lg">Assignment Feedback Summary</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Qualitative feedback and details per assignment
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-3 overflow-y-auto pt-2 pb-2">
        {chartSummaryData.length > 0 ? (
          chartSummaryData.map((item, index) => (
            <div key={index} className="p-3 bg-muted/50 rounded-md border text-sm">
              <p className="font-semibold mb-1">{item.title}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mb-2">
                <span>Type: {item.type}</span>
                <span>Weight: {item.weight}</span>
                <span>Grade: {item.grade}</span>
              </div>
              <p className="text-xs leading-relaxed">{item.Feedback}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground italic text-center pt-4">
            No summary feedback available.
          </p>
        )}
      </CardContent>
      <CardFooter className="pt-2 border-t">
        <p className="text-xs text-muted-foreground">
          Showing feedback for {chartSummaryData.length} assignments.
        </p>
      </CardFooter>
    </Card>
  );
}