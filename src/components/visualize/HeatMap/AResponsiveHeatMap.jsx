import { ResponsiveHeatMap } from "@nivo/heatmap";

const AResponsiveHeatMap = ({ data, parameter }) => {
  return (
    <div style={{ height: 400 }}>
      <ResponsiveHeatMap
        data={data}
        margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -90,
          legend: "",
          legendOffset: 46,
        }}
        axisRight={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "location",
          legendPosition: "middle",
          legendOffset: 70,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "location",
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
