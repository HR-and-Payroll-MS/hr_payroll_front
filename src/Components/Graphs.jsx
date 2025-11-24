import React from 'react'

import { useMemo } from "react";
import { ResponsiveCalendar } from "@nivo/calendar";
import { ResponsiveBar } from "@nivo/bar";
import { useTheme } from '../Context/ThemeContext';

function BarChart({
  data,
  keys,
  indexBy,
  height = 300,
  margin = { top: 50, right: 130, bottom: 50, left: 60 },
  padding = 0.3,
  legendX = 120,
}) {
  const { theme } = useTheme();

  // If no data provided, avoid rendering errors
  const safeData = data?.length ? data : [];

  // Colors
  const colors =
    theme === "dark"
      ? ["#ffb347", "#ffcc33", "#ff6699", "#66ccff"]
      : ["#66c2a5", "#fc8d62", "#8da0cb", "#ffd92f"];

  // Nivo Theme (dark/light)
  const nivoTheme = {
    textColor: theme === "dark" ? "#f3f4f6" : "#111827",
    axis: {
      domain: {
        line: {
          stroke: theme === "dark" ? "#9ca3af" : "#d1d5db",
        },
      },
      ticks: {
        line: {
          stroke: theme === "dark" ? "#9ca3af" : "#d1d5db",
        },
        text: {
          fill: theme === "dark" ? "#f3f4f6" : "#111827",
        },
      },
      legend: {
        text: {
          fill: theme === "dark" ? "#f9fafb" : "#1f2937",
        },
      },
    },grid: {
      line: {
        stroke: theme === "dark" ? "#4b5563" : "#e5e7eb",
      },
    },
    legends: {
      text: {
        fill: theme === "dark" ? "#f3f4f6" : "#111827",
      },
    },
    tooltip: {
      container: {
        background: theme === "dark" ? "#1f2937" : "#ffffff",
        color: theme === "dark" ? "#f9fafb" : "#111827",
      },
    },
  };

  return (
    <div style={{ height }}>
      <ResponsiveBar
        data={safeData}
        keys={keys}
        indexBy={indexBy}
        margin={margin}
        padding={padding}
        groupMode="grouped"
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={colors}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          legend: indexBy,
          legendPosition: "middle",
          legendOffset: 36,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          legend: "Values",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [[theme === "dark" ? "brighter" : "darker", 2]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            translateX: legendX,
            itemWidth: 100,
            itemHeight: 20,
            itemOpacity: 0.85,
            symbolSize: 20,
          },
        ]}
        theme={nivoTheme}
      />
    </div>
  );
}
/* usage
<BarChart
  data={salesData}
  keys={["revenue", "profit", "loss"]}
  indexBy="month"
  height={500}
/>

*/

function Heatmap({
  data = [],
  startDate,
  endDate,
  lightColors = ["#d1fae5", "#86efac", "#4ade80", "#22c55e", "#15803d"],
  darkColors = ["#1e3a8a", "#1d4ed8", "#2563eb", "#3b82f6", "#60a5fa"],
  showLegend = true,
  theme = "light",
  legendLabels = ["0", "1", "2", "3", "4+"], // labels for each step
}) {
  const colors = theme === "dark" ? darkColors : lightColors;

  const from = startDate || `${new Date().getFullYear()}-01-01`;
  const to = endDate || `${new Date().getFullYear()}-12-31`;

  const legends = useMemo(() => {
    if (!showLegend) return [];
    return [
      {
        anchor: "bottom-left",
        direction: "row",
        translateY: 40,
        itemCount: colors.length,
        itemWidth: 40,
        itemHeight: 20,
        itemsSpacing: 4,
        itemDirection: "top-to-bottom",
        // add custom labels
        data: legendLabels.map((label, index) => ({
          label,
          color: colors[index],
        })),
        textColor: theme === "dark" ? "#f3f4f6" : "#111827",
      },
    ];
  }, [colors, showLegend, legendLabels, theme]);

  return (
    <ResponsiveCalendar
      data={data}
      from={from}
      to={to}
      emptyColor={theme === "dark" ? "#1f2937" : "#f3f4f6"}
      colors={colors}
      margin={{ top: 20, right: 20, bottom: 50, left: 20 }}
      yearSpacing={40}
      monthBorderColor={theme === "dark" ? "#374151" : "#e5e7eb"}
      dayBorderWidth={1}
      dayBorderColor={theme === "dark" ? "#4b5563" : "#e5e7eb"}
      legends={legends}
      theme={{
        textColor: theme === "dark" ? "#e5e7eb" : "#374151",
      }}
    />
  );
}
/* usage
    <Attendance=Heatmap
  data={attendanceData}
  theme="dark"
  showLegend={true}
  legendLabels={["Absent", "Late", "Half-day", "Present", "Extra"]}
  startDate="2025-01-01"
  endDate="2025-12-31"
/>

*/


export { BarChart , Heatmap}