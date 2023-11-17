import React from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import ResponsiveBarChart from "./ResponsiveBarChart";

const DropdownMenuBarChart = ({
  selectedParameter,
  handleParameterChange,
  graphData,
}) => {
  return (
    <>
      <FormControl style={{ minWidth: 120, marginBottom: 20 }}>
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
      <ResponsiveBarChart data={graphData} parameter={selectedParameter} />
    </>
  );
};

export default DropdownMenuBarChart;
