// PieChartExample.jsx
import { ResponsivePie } from '@nivo/pie';

export default function PieChartExample({ theme = 'light' }) {
  const data = [
    { id: "javascript", label: "JavaScript", value: 45 },
    { id: "python", label: "Python", value: 30 },
    { id: "java", label: "Java", value: 25 },
  ];
  const colors = theme === 'dark'
    ? ['#ffb347', '#ffcc33', '#ff6699','#ffffff'] 
    : ['#66c2a5', '#fc8d62', '#8da0cb','#ffffff']; 


  return (
    <div style={{ height: 400 }}>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={2}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={colors}
        borderWidth={0}
        borderColor={{ from: 'color', modifiers: [[theme==="dark"?'brighter':'darker', 100]]  }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor= {theme === 'dark' ? '#fff' : '#000'}
        arcLinkLabelsThickness={1}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [[theme==="dark"?'brighter':'darker', 100]] }}
      />
    </div>
  );
}
