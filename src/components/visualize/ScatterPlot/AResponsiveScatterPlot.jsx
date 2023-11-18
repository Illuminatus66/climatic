import React from "react";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";

const AResponsiveScatterPlot = ({ data, parameters }) => {
  const [param1, param2] = parameters;

  return (
    <div style={{ height: 500 }}>
      <ResponsiveScatterPlot
        data={data}
        margin={{ top: 10, right: 250, bottom: 70, left: 70 }}
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
          legendOffset: -40,
        }}
        motionConfig="molasses"
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 110,
            translateY: 0,
            itemsSpacing: 5,
            itemDirection: "left-to-right",
            itemWidth: 98,
            itemHeight: 14,
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
