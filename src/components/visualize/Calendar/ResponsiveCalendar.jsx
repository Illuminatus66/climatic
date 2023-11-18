import React from "react";
import { ResponsiveCalendar } from "@nivo/calendar";

const CalendarChart = ({ data }) => {
  const sortedData = data.sort((a, b) => new Date(a.day) - new Date(b.day));

  console.log(sortedData);

  if (sortedData.length === 0) {
    return <div style={{ height: "300px" }}>No data available. Try choosing another date range</div>;
  }

  return (
    <div style={{ height: "300px" }}>
      <ResponsiveCalendar
        data={sortedData}
        from={sortedData[0].day}
        to={sortedData[sortedData.length - 1].day}
        emptyColor="#000000"
        colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
        margin={{ top: 60, right: 60, bottom: 60, left: 70 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: "bottom-right",
            direction: "row",
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: "right-to-left",
          },
        ]}
      />
    </div>
  );
};

export default CalendarChart;
