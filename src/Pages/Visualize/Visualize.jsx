import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import WeatherDataList from "../../components/visualize/weatherDataList";
import WeatherLineChart from '../../components/visualize/LineChart/WeatherLineChart';
import WeatherBarChart from "../../components/visualize/BarChart/WeatherBarChart";
import WeatherParallelCoordinatesChart from "../../components/visualize/ParallelCoodinatesChart/WeatherParallelCoodinatesChart";
import WeatherScatterPlot from "../../components/visualize/ScatterPlot/WeatherScatterPlot";
import WeatherRadarChart from "../../components/visualize/RadarChart/WeatherRadarChart";
import "./Visualize.css";

const transformDataforLineChart = (data, lineParameter) => {
  const groupedByLocationAndTime = {};

  data.forEach((item) => {
    const location = item.location.place;
    item.weather.forEach((weather) => {
      const timeKey = new Date(weather.startTime).toISOString();
      const locationTimeKey = `${location}|${timeKey}`;

      if (!groupedByLocationAndTime[locationTimeKey]) {
        groupedByLocationAndTime[locationTimeKey] = {
          count: 0,
          totalofParameter: 0, // Generalized for any parameter
        };
      }

      groupedByLocationAndTime[locationTimeKey].count += 1;
      groupedByLocationAndTime[locationTimeKey].totalofParameter += weather.values[lineParameter];
    });
  });

  const averagedData = Object.entries(groupedByLocationAndTime).reduce((acc, [key, value]) => {
    const [location, time] = key.split('|');
    const avgofParameter = value.totalofParameter / value.count;

    if (!acc[location]) {
      acc[location] = [];
    }

    acc[location].push({
      x: time,
      y: avgofParameter,
    });

    return acc;
  }, {});

  return Object.entries(averagedData).map(([location, weatherData]) => ({
    id: location,
    data: weatherData.sort((a, b) => new Date(a.x) - new Date(b.x)),
  }));
};

const transformDataforBarChart = (data, barParameter) => {
  const groupedByLocationAndTime = {};

  data.forEach((item) => {
    const location = item.location.place;
    item.weather.forEach((weather) => {
      const timeKey = new Date(weather.startTime).toISOString();
      const locationTimeKey = `${location}-${timeKey}`;

      if (!groupedByLocationAndTime[locationTimeKey]) {
        groupedByLocationAndTime[locationTimeKey] = {
          count: 0,
          totalofParameter: 0,
        };
      }

      groupedByLocationAndTime[locationTimeKey].count += 1;
      groupedByLocationAndTime[locationTimeKey].totalofParameter += weather.values[barParameter];
    });
  });

  return Object.entries(groupedByLocationAndTime).map(([locationTime, value]) => ({
    id: locationTime,
    value: value.totalofParameter / value.count
  }));
};

const transformDataforParallelChart = (data, parallelParameters) => {
  const groupedByLocationAndTime = {};

  data.forEach((item) => {
    const location = item.location.place;
    item.weather.forEach((weather) => {
      const timeKey = new Date(weather.startTime).toISOString();
      const locationTimeKey = `${location}-${timeKey}`;

      if (!groupedByLocationAndTime[locationTimeKey]) {
        groupedByLocationAndTime[locationTimeKey] = {
          count: 0,
          parameters: parallelParameters.reduce((obj, param) => {
            obj[param] = 0;
            return obj;
          }, {}),
        };
      }

      parallelParameters.forEach((param) => {
        if (weather.values[param] !== undefined) {
          groupedByLocationAndTime[locationTimeKey].parameters[param] += weather.values[param];
        }
      });

      groupedByLocationAndTime[locationTimeKey].count += 1;
    });
  });

  return Object.entries(groupedByLocationAndTime).map(([locationTime, value]) => {
    const averagedParameters = {};

    parallelParameters.forEach((param) => {
      averagedParameters[param] = value.parameters[param] / value.count;
    });

    return {
      id: locationTime,
      ...averagedParameters,
    };
  });
};

const transformDataforScatterPlot = (data, [param1, param2]) => {
  const groupedByLocationAndTime = {};

  data.forEach((item) => {
    const location = item.location.place;
    item.weather.forEach((weather) => {
      const timeKey = new Date(weather.startTime).toISOString();
      const locationTimeKey = `${location}-${timeKey}`;

      if (!groupedByLocationAndTime[locationTimeKey]) {
        groupedByLocationAndTime[locationTimeKey] = {
          count: 0,
          totalParam1: 0,
          totalParam2: 0,
        };
      }

      groupedByLocationAndTime[locationTimeKey].count += 1;
      groupedByLocationAndTime[locationTimeKey].totalParam1 += weather.values[param1];
      groupedByLocationAndTime[locationTimeKey].totalParam2 += weather.values[param2];
    });
  });

  return Object.entries(groupedByLocationAndTime).map(([locationTime, value]) => ({
    id: locationTime,
    data: [{
      x: value.totalParam1 / value.count,
      y: value.totalParam2 / value.count
    }]
  }));
};

const transformDataforRadarChart = (data, parameters) => {
  const groupedByLocationAndTime = {};

  data.forEach((item) => {
    const location = item.location.place;
    item.weather.forEach((weather) => {
      const timeKey = new Date(weather.startTime).toISOString();
      const locationTimeKey = `${location}-${timeKey}`;

      if (!groupedByLocationAndTime[locationTimeKey]) {
        groupedByLocationAndTime[locationTimeKey] = { count: 0 };
        parameters.forEach(param => {
          groupedByLocationAndTime[locationTimeKey][param] = 0;
        });
      }

      parameters.forEach((param) => {
        if (weather.values[param] !== undefined) {
          groupedByLocationAndTime[locationTimeKey][param] += weather.values[param];
        }
      });

      groupedByLocationAndTime[locationTimeKey].count += 1;
    });
  });

  return Object.entries(groupedByLocationAndTime).map(([locationTime, value]) => {
    const averagedParameters = { locationTimeKey: locationTime };
    parameters.forEach((param) => {
      averagedParameters[param] = value[param] / value.count;
    });
    return averagedParameters;
  });
};

const Visualize = () => {
  const history = useHistory();
  const currentUser = useSelector((state) => state.user.data);
  const weatherdata = useSelector((state) => state.visualization.data);
  const [dateRange, setDateRange] = useState([null, null]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedEntries, setSelectedEntries] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [parallelData, setParallelData] = useState([]);
  const [scatterData, setScatterData] = useState([]);
  const [radarData, setRadarData] = useState([]);
  const [selectedLineParameter, setSelectedLineParameter] = useState('temperature');
  const [selectedBarParameter, setSelectedBarParameter] = useState('temperature');
  const [selectedParallelParameters, setSelectedParallelParameters] = useState(['temperature', 'humidity', 'visibility']);
  const [selectedScatterParameter1, setSelectedScatterParameter1] = useState('temperature');
  const [selectedScatterParameter2, setSelectedScatterParameter2] = useState('humidity');
  const [selectedRadarParameters, setSelectedRadarParameters] = useState(['temperature', 'humidity', 'visibility']);

  const handleDateChange = useCallback((dates) => {
    const [start, end] = dates;
    if (start && end) {
      const filtered = weatherdata.filter((data) => {
        const date = new Date(data.createdAt);
        return date >= start && date <= end;
      });
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  }, [weatherdata]);

  useEffect(() => {
    if (!currentUser) {
      history.push('/Auth');
    } else {
      handleDateChange(dateRange);
    }
  }, [currentUser, dateRange, handleDateChange, history]);

  const handleSelect = useCallback((newSelectedEntries) => {
    setSelectedEntries(newSelectedEntries);
  }, []);

  useEffect(() => {
    const lineChartData = transformDataforLineChart(selectedEntries, selectedLineParameter);
    setLineData(lineChartData);
  }, [selectedEntries, selectedLineParameter]);

  const handleLineParameterChange = (event) => {
    setSelectedLineParameter(event.target.value);
  };

  useEffect(() => {
    const barChartData = transformDataforBarChart(selectedEntries, selectedBarParameter);
    setBarData(barChartData);
  }, [selectedEntries, selectedBarParameter]);

  const handleBarParameterChange = (event) => {
    setSelectedBarParameter(event.target.value);
  };

  useEffect(() => {
    const parallelChartData = transformDataforParallelChart(selectedEntries, selectedParallelParameters);
    setParallelData(parallelChartData);
  }, [selectedEntries, selectedParallelParameters]);

  const handleParallelParameterChange = (event) => {
    setSelectedParallelParameters(event.target.value);
  };

  useEffect(() => {
    const scatterPlotData = transformDataforScatterPlot(selectedEntries, [selectedScatterParameter1, selectedScatterParameter2 ]);
    setScatterData(scatterPlotData);
  }, [selectedEntries, selectedScatterParameter1, selectedScatterParameter2]);

  const handleScatterParameter1Change = (event) => {
    setSelectedScatterParameter1(event.target.value);
  };
  const handleScatterParameter2Change = (event) => {
    setSelectedScatterParameter2(event.target.value);
  };

  useEffect(() => {
    const radarChartData = transformDataforRadarChart(selectedEntries, selectedRadarParameters);
    setRadarData(radarChartData);
  }, [selectedEntries, selectedRadarParameters]);

  const handleRadarParameterChange = (event) => {
    setSelectedRadarParameters(event.target.value);
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div style={{ width: "20%" }}>
        <div id="datepick">
          <DatePicker
            selectsRange={true}
            startDate={dateRange[0]}
            endDate={dateRange[1]}
            onChange={(update) => {
              setDateRange(update);
            }}
            isClearable={true}
            placeholderText="Select Date Range"
          />
        </div>
        <WeatherDataList 
        data={filteredData} 
        onSelect={handleSelect} 
        selectedEntries={selectedEntries} 
        />
      </div>
      <div style={{ width: "80%" }}>
        <WeatherLineChart 
        selectedParameter={selectedLineParameter} 
        handleParameterChange={handleLineParameterChange} 
        graphData={lineData} 
        />
        <WeatherBarChart
        selectedParameter={selectedBarParameter}
        handleParameterChange={handleBarParameterChange}
        graphData={barData}
        />
        <WeatherParallelCoordinatesChart
        selectedParameters={selectedParallelParameters}
        handleParameterChange={handleParallelParameterChange}
        graphData={parallelData}
        />
        <WeatherScatterPlot
        selectedParameters={[selectedScatterParameter1, selectedScatterParameter2]}
        handleParam1Change={handleScatterParameter1Change}
        handleParam2Change={handleScatterParameter2Change}
        graphData={scatterData}
        />
        <WeatherRadarChart
        selectedParameters={selectedRadarParameters}
        handleParameterChange={handleRadarParameterChange}
        graphData={radarData}
        />
      </div>
    </div>
  );
};

export default Visualize;