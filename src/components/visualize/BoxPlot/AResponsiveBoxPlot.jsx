import { ResponsiveBoxPlot } from "@nivo/boxplot";

const AResponsiveBoxPlot = ({ data, parameter, group }) => {
  return (
    <div style={{ height: 500 }}>
      <ResponsiveBoxPlot
        data={data}
        margin={{ top: 60, right: 190, bottom: 60, left: 60 }}
        groupBy="group"
        padding={0.12}
        axisTop={null}
        axisRight={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendOffset: 0,
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: group,
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: parameter,
          legendPosition: "middle",
          legendOffset: -40,
        }}
        colors={{ scheme: "nivo" }}
        colorBy="group"
        borderRadius={2}
        borderWidth={2}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.3]],
        }}
        medianWidth={2}
        medianColor={{
          from: "color",
          modifiers: [["darker", 0.3]],
        }}
        whiskerWidth={2}
        whiskerEndSize={0.6}
        whiskerColor={{
          from: "color",
          modifiers: [["darker", 0.4]],
        }}
        enableGridX={true}
        motionConfig="wobbly"
        legends={[
          {
            anchor: "right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemWidth: 60,
            itemHeight: 20,
            itemsSpacing: 3,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            symbolSize: 20,
            symbolShape: "square",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default AResponsiveBoxPlot;
