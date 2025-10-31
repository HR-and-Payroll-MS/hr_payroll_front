// BarChartExample.jsx
import { ResponsiveBar } from '@nivo/bar';

export default function BarChartExample({ theme = 'light' }) {
  const data = [
    { country: 'AD', apples: 80, bananas: 120, cherries: 40, Bluetooth: 33 },
    { country: 'AE', apples: 50, bananas: 90, cherries: 60, Bluetooth: 33 },
    { country: 'AF', apples: 70, bananas: 100, cherries: 90, Bluetooth: 33 },
    { country: 'A', apples: 70, bananas: 100, cherries: 90, Bluetooth: 33 },
    { country: 'F', apples: 70, bananas: 100, cherries: 90, Bluetooth: 33 },
    { country: 'A7F', apples: 70, bananas: 100, cherries: 90, Bluetooth: 33 },
  ];

  // Colors for bars
  const colors =
    theme === 'dark'
      ? ['#ffb347', '#ffcc33', '#ff6699', '#66ccff']
      : ['#66c2a5', '#fc8d62', '#8da0cb', '#ffd92f'];

  // Define Nivo theme (controls text, ticks, grid, legend)
  const nivoTheme = {
    textColor: theme === 'dark' ? '#f3f4f6' : '#111827', // general text
    axis: {
      domain: {
        line: {
          stroke: theme === 'dark' ? '#9ca3af' : '#d1d5db',
          strokeWidth: 1,
        },
      },
      ticks: {
        line: {
          stroke: theme === 'dark' ? '#9ca3af' : '#d1d5db',
          strokeWidth: 1,
        },
        text: {
          fill: theme === 'dark' ? '#f3f4f6' : '#111827',
        },
      },
      legend: {
        text: {
          fill: theme === 'dark' ? '#f9fafb' : '#1f2937',
        },
      },
    },
    grid: {
      line: {
        stroke: theme === 'dark' ? '#4b5563' : '#e5e7eb',
        strokeWidth: 1,
      },
    },
    legends: {
      text: {
        fill: theme === 'dark' ? '#f3f4f6' : '#111827',
      },
    },
    tooltip: {
      container: {
        background: theme === 'dark' ? '#1f2937' : '#ffffff',
        color: theme === 'dark' ? '#f9fafb' : '#111827',
        fontSize: 12,
      },
    },
  };

  return (
    <div style={{ height: 400 }}>
      <ResponsiveBar
        data={data}
        keys={['apples', 'bananas', 'cherries', 'Bluetooth']}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={colors}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          legend: 'Country',
          legendPosition: 'middle',
          legendOffset: 36,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          legend: 'Fruits',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: 'color',
          modifiers: [[theme === 'dark' ? 'brighter' : 'darker', 2]],
        }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            translateX: 120,
            itemWidth: 100,
            itemHeight: 20,
            itemOpacity: 0.85,
            symbolSize: 20,
          },
        ]}
        theme={nivoTheme} // ✅ this controls all text & grid colors
      />
    </div>
  );
}
