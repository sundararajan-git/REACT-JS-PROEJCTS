"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description = "Employee performance bar chart";

export const EmployeePerformance = () => {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = React.useMemo(() => {
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") daysToSubtract = 30;
    if (timeRange === "7d") daysToSubtract = 7;

    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);

    return chartData.filter((item) => {
      const date = new Date(item.date);
      return date >= startDate && date <= referenceDate;
    });
  }, [timeRange]);

  return (
    <Card className="@container/card w-full">
      <CardHeader>
        <CardTitle>Employee Performance</CardTitle>
        <CardDescription>Overall Tasks Completed</CardDescription>
        <CardAction>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart data={filteredData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                />
              }
            />
            <Bar
              dataKey="tasksCompleted"
              fill="var(--color-tasks)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

const chartData = [
  { date: "2024-04-01", tasksCompleted: 10 },
  { date: "2024-04-10", tasksCompleted: 14 },
  { date: "2024-04-20", tasksCompleted: 18 },
  { date: "2024-05-01", tasksCompleted: 22 },
  { date: "2024-05-10", tasksCompleted: 19 },
  { date: "2024-05-20", tasksCompleted: 25 },
  { date: "2024-06-01", tasksCompleted: 12 },
  { date: "2024-06-10", tasksCompleted: 18 },
  { date: "2024-06-20", tasksCompleted: 16 },
  { date: "2024-06-30", tasksCompleted: 20 },
];

const chartConfig = {
  tasksCompleted: {
    label: "Tasks Completed",
    color: "hsl(var(--chart-1))",
  },
};
