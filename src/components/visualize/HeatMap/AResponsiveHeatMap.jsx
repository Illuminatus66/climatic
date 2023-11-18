import { ResponsiveHeatMap } from "@nivo/heatmap";

const AResponsiveHeatMap = ({ data, parameter }) => {
  return (
    <div style={{ height: 600 }}>
      <ResponsiveHeatMap
        data={data}
        margin={{ top: 25, right: 30, bottom: 150, left: 200 }}
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -10,
          legend: "",
          legendOffset: 46,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -65,
          legend: "",
          legendPosition: "middle",
          legendOffset: -72,
        }}
        colors={{
          type: "diverging",
          scheme: "warm",
          divergeAt: 0.5,
        }}
        emptyColor="#ffffff"
        inactiveOpacity={0.25}
        borderWidth={2}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.8]],
        }}
        label="value"
        labelTextColor="#000000"
        legends={[
          {
            anchor: "bottom",
            translateX: 0,
            translateY: 30,
            length: 400,
            thickness: 8,
            direction: "row",
            tickPosition: "after",
            tickSize: 3,
            tickSpacing: 4,
            tickOverlap: false,
            title: `${parameter}→`,
            titleAlign: "start",
            titleOffset: 4,
          },
        ]}
        motionConfig="molasses"
      />
      ;
    </div>
  );
};

export default AResponsiveHeatMap;
