// BarChartExample.jsx
import { ResponsiveBar } from '@nivo/bar';

export default function BarChartExample() {
  const data = [
    { country: 'AD', apples: 80, bananas: 120, cherries: 40 },
    { country: 'AE', apples: 50, bananas: 90, cherries: 60 },
    { country: 'AF', apples: 70, bananas: 100, cherries: 90 },
  ];

  return (
    <div style={{ height: 400 }}>
      <ResponsiveBar
        data={data}
        keys={['apples', 'bananas', 'cherries']}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'set2' }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          legend: 'Country',
          legendPosition: 'middle',
          legendOffset: 32,
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
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemOpacity: 0.85,
          },
        ]}
      />
    </div>
  );
}
