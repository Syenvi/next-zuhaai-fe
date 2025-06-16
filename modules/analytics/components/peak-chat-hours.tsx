import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

const PeakChatHours = () => {
  const chartData = [
    { month: "00:00", desktop: 186 },
    { month: "02:00", desktop: 305 },
    { month: "04:00", desktop: 237 },
    { month: "06:00", desktop: 73 },
    { month: "08:00", desktop: 209 },
    { month: "10:00", desktop: 50 },
    { month: "12:00", desktop: 21 },
    { month: "14:00", desktop: 20 },
    { month: "16:00", desktop: 134 },
    { month: "18:00", desktop: 225 },
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
        Peak Chat Hours
      </h3>
      <section className="flex items-center gap-2">
        <p>Peak Time at</p>
        <span className="text-2xl font-bold">00:00</span>
      </section>
      <ChartContainer config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 20,
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Line
            dataKey="desktop"
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={{
              fill: "var(--color-desktop)",
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
    </section>
  );
};

export default PeakChatHours;
