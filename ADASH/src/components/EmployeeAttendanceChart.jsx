"use client";

import { TrendingUp } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const description = "Employee Attendance Pie Chart";

const chartData = [
  { status: "Present", count: 120, color: "hsl(var(--chart-1))" },
  { status: "Absent", count: 15, color: "hsl(var(--chart-2))" },
  { status: "On Leave", count: 8, color: "hsl(var(--chart-3))" },
  { status: "Holiday", count: 5, color: "hsl(var(--chart-4))" },
];

export function EmployeeAttendanceChart() {
  const totalEmployees = chartData.reduce((acc, item) => acc + item.count, 0);

  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Employee Attendance</CardTitle>
        <CardDescription>Overview for Today</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <div className="relative h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={2}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} Employees`} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-3xl font-bold">{totalEmployees}</div>
            <div className="text-sm text-muted-foreground">Total Employees</div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Attendance stable this week <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
