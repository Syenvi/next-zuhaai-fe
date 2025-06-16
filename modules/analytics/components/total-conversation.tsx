import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

const TotalConversation = () => {
  const chartData = [
    { month: "1/6", desktop: 0 },
    { month: "2/6", desktop: 305 },
    { month: "3/6", desktop: 237 },
    { month: "4/6", desktop: 73 },
    { month: "5/6", desktop: 209 },
    { month: "6/6", desktop: 214 },
    { month: "7/6", desktop: 214 },
    { month: "8/6", desktop: 214 },
    { month: "9/6", desktop: 214 },
    { month: "10/6", desktop: 214 },
  ];
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <section className="border p-3 lg:p-5 rounded-lg border-neutral-300 space-y-3">
      <h3 className="text-neutral-700 lg:text-lg font-medium">
        Total Conversation
      </h3>
      <section className="flex justify-between">
        <div className="flex items-center gap-2">
          <p className="text-2xl font-bold">0</p>
          <p className="text-sm">Total Conversation</p>
        </div>
        <div className="flex gap-5 items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-sky-300 rounded-full" />
            <p className="text-sm">First Time</p>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-sky-700 rounded-full" />
            <p className="text-sm">Returning</p>
            <p className="text-2xl font-bold">0</p>
          </div>
        </div>
      </section>
      <ChartContainer config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 20,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 5)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </section>
  );
};

export default TotalConversation;
