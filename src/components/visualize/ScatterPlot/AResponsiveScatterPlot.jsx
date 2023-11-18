import React from "react";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";

const AResponsiveScatterPlot = ({ data, parameters }) => {
  const [param1, param2] = parameters;

  return (
    <div style={{ height: 500, width:"80%" }}>
      <ResponsiveScatterPlot
        data={data}
        margin={{ top: 60, right: 170, bottom: 60, left: 60 }}
        xScale={{ type: "linear", min: "auto", max: "auto" }}
        xFormat=" >-.2f"
        yScale={{ type: "linear", min: "auto", max: "auto" }}
        yFormat=" >-.2f"
        blendMode="multiply"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: param1,
          legendPosition: "middle",
          legendOffset: 46,
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: param2,
          legendPosition: "middle",
          legendOffset: -60,
        }}
        motionConfig="molasses"
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 130,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 12,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default AResponsiveScatterPlot;
