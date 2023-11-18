import React from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import AResponsiveBoxPlot from "./AResponsiveBoxPlot";

const DropdownMenuBoxPlot = ({
  selectedParameter,
  selectedGroup,
  handleParameterChange,
  handleGroupChange,
  graphData,
}) => {
  if (graphData.length === 0) {
    return <div style={{ height: "500px" }}>No data available for Box Plot. Try choosing another date range or select some entries.</div>;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: 20,
        }}
      >
        <FormControl style={{ minWidth: 120, marginRight: 20 }}>
          <InputLabel id="parameter-select-label">Weather Parameter</InputLabel>
          <Select
            labelId="parameter-select-label"
            id="parameter-select"
            value={selectedParameter}
            onChange={handleParameterChange}
          >
            <MenuItem value="temperature">Temperature</MenuItem>
            <MenuItem value="humidity">Humidity</MenuItem>
            <MenuItem value="precipitationIntensity">Precipitation Intensity</MenuItem>
            <MenuItem value="pressureSeaLevel">Pressure at Sea Level</MenuItem>
            <MenuItem value="temperatureApparent">Apparent Temperature</MenuItem>
            <MenuItem value="visibility">Visibility</MenuItem>
            <MenuItem value="windSpeed">Wind Speed</MenuItem>
            <MenuItem value="dewPoint">Dew Point</MenuItem>
            <MenuItem value="uvIndex">UV Index</MenuItem>
            <MenuItem value="cloudCover">Cloud Cover</MenuItem>
            <MenuItem value="visibility">Visibility</MenuItem>
          </Select>
        </FormControl>

        <FormControl style={{ minWidth: 120 }}>
          <InputLabel id="group-select-label">Group By</InputLabel>
          <Select
            labelId="group-select-label"
            id="group-select"
            value={selectedGroup}
            onChange={handleGroupChange}
          >
            <MenuItem value="location">Location</MenuItem>
            <MenuItem value="week">Week</MenuItem>
            <MenuItem value="month">Month</MenuItem>
            <MenuItem value="year">Year</MenuItem>
          </Select>
        </FormControl>
      </div>

      <AResponsiveBoxPlot
        data={graphData}
        parameter={selectedParameter}
        group={selectedGroup}
      />
    </>
  );
};

export default DropdownMenuBoxPlot;
