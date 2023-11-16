import React from "react";
import { MenuItem, Select, FormControl, InputLabel, Chip } from "@material-ui/core";
import ResponsiveParallelCoordinatesChart from "./ResponsiveParallelCoordinatesChart";

const DropdownMenuParallelCoordinatesChart = ({
  selectedParameters,
  handleParameterChange,
  graphData,
}) => {
  return (
    <>
      <FormControl style={{ minWidth: 120, marginBottom: 20, maxWidth: 300 }}>
        <InputLabel id="parameter-select-label">Multiple Parameters</InputLabel>
        <Select
          labelId="parameter-select-label"
          id="parameter-select"
          multiple
          value={selectedParameters}
          onChange={handleParameterChange}
          renderValue={(selected) => (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {selected.map((value) => (
                <Chip key={value} label={value} style={{ margin: 2 }} />
              ))}
            </div>
          )}
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
        </Select>
      </FormControl>
      <ResponsiveParallelCoordinatesChart data={graphData} parameters={selectedParameters} />
    </>
  );
};

export default DropdownMenuParallelCoordinatesChart;
