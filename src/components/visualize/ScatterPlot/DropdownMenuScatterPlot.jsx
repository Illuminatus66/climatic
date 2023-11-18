import React from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import AResponsiveScatterPlot from "./AResponsiveScatterPlot";

const DropdownMenuScatterPlot = ({
  selectedParameters: [param1, param2],
  handleParam1Change,
  handleParam2Change,
  graphData,
}) => {

  const weatherParameters = {
    temperature: "Temperature",
    humidity: "Humidity",
    precipitationIntensity: "Precipitation Intensity",
    pressureSeaLevel: "Pressure at Sea Level",
    temperatureApparent: "Apparent Temperature",
    visibility: "Visibility",
    windSpeed: "Wind Speed",
    dewPoint: "Dew Point",
    uvIndex: "UV Index",
    cloudCover: "Cloud Cover",
  };

  if (graphData.length === 0) {
    return <div style={{ height: "500px" }}>No data available for Scatter Plot. Try choosing another date range or select some entries.</div>;
  }
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        <FormControl style={{ minWidth: 120, maxWidth: 300 }}>
          <InputLabel id="param1-select-label">X-Axis</InputLabel>
          <Select
            labelId="param1-select-label"
            id="param1-select"
            value={param1}
            onChange={handleParam1Change}
          >
            {Object.entries(weatherParameters).map(([param, label]) => (
              <MenuItem key={param} value={param} disabled={param === param2}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl style={{ minWidth: 120, maxWidth: 300 }}>
          <InputLabel id="param2-select-label">Y-Axis</InputLabel>
          <Select
            labelId="param2-select-label"
            id="param2-select"
            value={param2}
            onChange={handleParam2Change}
          >
            {Object.entries(weatherParameters).map(([param, label]) => (
              <MenuItem key={param} value={param} disabled={param === param1}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      
      <AResponsiveScatterPlot data={graphData} parameters={[param1, param2]} />
    </div>
  );
};

export default DropdownMenuScatterPlot;
