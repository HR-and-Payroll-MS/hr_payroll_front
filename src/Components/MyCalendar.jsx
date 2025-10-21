import { ResponsiveCalendar } from '@nivo/calendar';
import React from 'react';

function MyCalendar() {
  const data = [
    { "day": "2025-09-17", "value": 72 },
    { "day": "2025-09-18", "value": 122 },
    { "day": "2025-09-19", "value": 95 },
    { "day": "2025-09-20", "value": 180 },
    { "day": "2025-09-21", "value": 65 },
    { "day": "2025-09-22", "value": 210 },
    { "day": "2025-09-23", "value": 134 },
    { "day": "2025-09-24", "value": 87 },
    { "day": "2025-09-25", "value": 150 },
    { "day": "2025-09-26", "value": 190 },
    { "day": "2025-09-27", "value": 220 },
    { "day": "2025-09-28", "value": 175 },
    { "day": "2025-09-29", "value": 95 },
    { "day": "2025-09-30", "value": 105 },
    { "day": "2025-10-01", "value": 140 },
    { "day": "2025-10-02", "value": 200 },
    { "day": "2025-10-03", "value": 160 },
    { "day": "2025-10-04", "value": 130 },
    { "day": "2025-10-05", "value": 115 },
    { "day": "2025-10-06", "value": 180 },
    { "day": "2025-10-07", "value": 190 },
    { "day": "2025-10-08", "value": 210 },
    { "day": "2025-10-09", "value": 170 },
    { "day": "2025-10-10", "value": 200 },
    { "day": "2025-10-11", "value": 195 },
    { "day": "2025-10-12", "value": 185 },
    { "day": "2025-10-13", "value": 140 },
    { "day": "2025-10-14", "value": 125 },
    { "day": "2025-10-15", "value": 150 },
    { "day": "2025-10-16", "value": 170 }
  ];

  return (
    <div className='h-3/12'> 
      <ResponsiveCalendar
        data={data}
        from="2025-09-17"
        to="2025-10-16"
        emptyColor="#eeeeee"
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="white"
        dayBorderWidth={2}
        dayBorderColor="white"
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'row',
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: 'right-to-left'
          }
        ]}
      />
    </div>
  );
}

export default MyCalendar;
