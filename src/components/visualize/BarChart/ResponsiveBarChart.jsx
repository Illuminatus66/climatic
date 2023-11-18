import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const ResponsiveBarChart = ({ data, parameter }) => {
  return (
    <div style={{ height: 500 }}>
      <ResponsiveBar
        data={data}
        keys={["value"]}
        indexBy="id"
        margin={{ top: 50, right: 50, bottom: 100, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisRight={null}
        axisTop={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -10,
          legend: "",
          legendOffset: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: parameter,
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        motionConfig="gentle"
        enableGridX={true}
        tooltip={({ value, indexValue }) => {
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
                <strong>Location-Time</strong>: {indexValue}
              </div>
              <div>
                <strong>{parameter}</strong>: {value}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default ResponsiveBarChart;
