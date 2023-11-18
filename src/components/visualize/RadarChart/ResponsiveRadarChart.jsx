import React from "react";
import { ResponsiveRadar } from "@nivo/radar";

const ResponsiveRadarChart = ({ data, parameters }) => (
  <div style={{ height: 500, width: "80%"}}>
    <ResponsiveRadar
      data={data}
      keys={parameters}
      indexBy="locationTimeKey"
      valueFormat=" >-.2f"
      margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
      gridShape="linear"
      gridLabelOffset={20}
      dotSize={10}
      dotColor={{ theme: "background" }}
      dotBorderWidth={2}
      dotBorderColor={{ from: "color" }}
      colors={{ scheme: "nivo" }}
      fillOpacity={0.25}
      blendMode="multiply"
      motionConfig="slow"
      legends={[
        {
          anchor: "top-left",
          direction: "column",
          translateX: -50,
          translateY: -40,
          itemWidth: 80,
          itemHeight: 20,
          itemTextColor: "#999",
          symbolSize: 12,
          symbolShape: "circle",
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

export default ResponsiveRadarChart;
