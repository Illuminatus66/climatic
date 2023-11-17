import React from "react";
import { ResponsiveLine } from "@nivo/line";

const ResponsiveLineChart = ({ data, parameter }) => {
  return (
    <div style={{ height: 400 }}>
      {data.map((locationData) => (
        <div key={locationData.id} style={{ height: "300px" }}>
          <h2>{locationData.id}</h2>
          <ResponsiveLine
            data={[locationData]}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: true,
              reverse: false,
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: -18,
              legend: "Date",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: parameter,
              legendOffset: -40,
              legendPosition: "middle",
            }}
            colors={{ scheme: "nivo" }}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            crosshairType="cross"
            motionConfig="gentle"
            tooltip={({ point }) => {
              return (
                <div
                  style={{
                    background: "white",
                    padding: "9px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
                  }}
                >
                  <div>
                    <strong>Date</strong>:{point.data.xFormatted}
                  </div>
                  <div>
                    <strong>{parameter}</strong>:{point.data.yFormatted}
                  </div>
                </div>
              );
            }}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
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
      ))}
    </div>
  );
};

export default ResponsiveLineChart;
