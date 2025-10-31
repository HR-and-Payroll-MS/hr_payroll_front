import { ResponsiveLine } from '@nivo/line';

export default function LineChartExample({ theme = "light" }) {
  const data = [
    {
      id: 'sales',
      data: [
        { x: 'Jan', y: 100 },
        { x: 'Feb', y: 120 },
        { x: 'Mar', y: 80 },
        { x: 'Apr', y: 150 },
        { x: 'May', y: 150 },
        { x: 'June', y: 50 },
        { x: 'July', y: 10 },
        { x: 'August', y: 185 },
        { x: 'September', y: 180 },
      ],
    },
    {
      id: 'cells',
      data: [
        { x: 'Jan', y: 10 },
        { x: 'Feb', y: 12 },
        { x: 'Mar', y: 80 },
        { x: 'Apr', y: 10 },
        { x: 'May', y: 10 },
        { x: 'June', y: 50 },
        { x: 'July', y: 10 },
        { x: 'August', y: 18 },
        { x: 'September', y: 80 },
      ],
    },
  ];

  const isDark = theme === "dark";

  const nivoTheme = {
    textColor: isDark ? "#e5e7eb" : "#374151", // tick + legend color
    axis: {
      domain: {
        line: { stroke: isDark ? "#9ca3af" : "#d1d5db", strokeWidth: 1 },
      },
      ticks: {
        line: { stroke: isDark ? "#9ca3af" : "#d1d5db", strokeWidth: 1 },
        text: { fill: isDark ? "#e5e7eb" : "#374151" },
      },
      legend: {
        text: { fill: isDark ? "#f9fafb" : "#111827" },
      },
    },
    grid: {
      line: { stroke: isDark ? "#4b5563" : "#e5e7eb", strokeWidth: 1 },
    },
  };

  return (
    <div style={{ height: 400 }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: "auto", max: "auto", stacked: true }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          legend: "Months",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          legend: "Sales / Cells Count",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        colors={{ scheme: "nivo" }}
        pointSize={8}
        curve="monotoneX"
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        theme={nivoTheme} // ✅ key line
        useMesh={true}
      />
    </div>
  );
}
