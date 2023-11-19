import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LocationsList from "../../components/visualize/WeatherDataList/LocationsList";
import ResponsiveCalendar from '../../components/visualize/Calendar/ResponsiveCalendar';
import DropdownMenuLineChart from '../../components/visualize/LineChart/DropdownMenuLineChart';
import DropdownMenuBarChart from "../../components/visualize/BarChart/DropdownMenuBarChart";
import DropdownMenuParallelCoordinatesChart from "../../components/visualize/ParallelCoordinatesChart/DropdownMenuParallelCoordinatesChart";
import DropdownMenuScatterPlot from "../../components/visualize/ScatterPlot/DropdownMenuScatterPlot";
import DropdownMenuRadarChart from "../../components/visualize/RadarChart/DropdownMenuRadarChart";
import DropdownMenuBoxPlot from "../../components/visualize/BoxPlot/DropdownMenuBoxPlot";
import DropdownMenuHeatMap from "../../components/visualize/HeatMap/DropdownMenuHeatMap";
import "./Visualize.css";

const truncateAddress = (address) => {
  const parts = address.split(',');
  if (parts.length > 3) {
    return parts.slice(0, 3).join(',');
  }
  return address;
};

const transformDataForCalendar = (filteredData, selectedEntries) => {
  const dateCounts = {};

  selectedEntries.forEach((entryId) => {
    filteredData.forEach((item) => {
      item.weather.forEach((weather) => {
        if (weather._id === entryId) {
          const day = new Date(weather.startTime).toISOString().split('T')[0];
          if (!dateCounts[day]) {
            dateCounts[day] = 0;
          }
          dateCounts[day]++;
        }
      });
    });
  });

  return Object.entries(dateCounts).map(([day, value]) => ({ day, value }));
};

const transformDataforLineChart = (filteredData, selectedEntries, lineParameter) => {
  const groupedByLocationAndTime = {};

  selectedEntries.forEach((entryId) => {
    filteredData.forEach((item) =>{
      item.weather.forEach((weather)=> {
        if (weather._id === entryId) {
          const location = truncateAddress(item.location.place);
          const timeKey = new Date(weather.startTime).toISOString().split('T')[0];;
          const locationTimeKey = `${location}|${timeKey}`;

          if (!groupedByLocationAndTime[locationTimeKey]) {
            groupedByLocationAndTime[locationTimeKey] = {
              count: 0,
              totalofParameter: 0, // Generalized for any parameter
            };
          }

          groupedByLocationAndTime[locationTimeKey].count += 1;
          groupedByLocationAndTime[locationTimeKey].totalofParameter += weather.values[lineParameter];
        }
      });
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

const transformDataforBarChart = (filteredData, selectedEntries, barParameter) => {
  const groupedByLocationAndTime = {};
  
  selectedEntries.forEach((entryId) => {
    filteredData.forEach((item) => {
      item.weather.forEach((weather)=> {
        if (weather._id === entryId) {
          const location = truncateAddress(item.location.place);
          const timeKey = new Date(weather.startTime).toISOString().split('T')[0];;
          const locationTimeKey = `${location}-${timeKey}`;

          if (!groupedByLocationAndTime[locationTimeKey]) {
            groupedByLocationAndTime[locationTimeKey] = {
              count: 0,
              totalofParameter: 0,
            };
          }

          groupedByLocationAndTime[locationTimeKey].count += 1;
          groupedByLocationAndTime[locationTimeKey].totalofParameter += weather.values[barParameter];
        }
      });
    });
  });

  return Object.entries(groupedByLocationAndTime).map(([locationTime, value]) => ({
    id: locationTime,
    value: value.totalofParameter / value.count
  }));
};

const transformDataforParallelChart = (filteredData, selectedEntries, parallelParameters) => {
  const groupedByLocationAndTime = {};

  selectedEntries.forEach((entryId) => {
    filteredData.forEach((item) => {
      item.weather.forEach((weather) => {
        if (weather._id === entryId) {
          const location = truncateAddress(item.location.place);
          const timeKey = new Date(weather.startTime).toISOString().split('T')[0];;
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
        }
      });
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

const transformDataforScatterPlot = (filteredData, selectedEntries, [param1, param2]) => {
  const groupedByLocationAndTime = {};

  selectedEntries.forEach((entryId) => {
    filteredData.forEach((item) => {
      item.weather.forEach((weather) => {
        if (weather._id === entryId) {
          const location = truncateAddress(item.location.place);
          const timeKey = new Date(weather.startTime).toISOString().split('T')[0];;
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
        }
      });
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

const transformDataforRadarChart = (filteredData, selectedEntries, radarParameters) => {
  const groupedByLocationAndTime = {};

  selectedEntries.forEach((entryId) => {
    filteredData.forEach((item) => {
      item.weather.forEach((weather) => {
        if (weather._id === entryId) {
          const location = truncateAddress(item.location.place);
          const timeKey = new Date(weather.startTime).toISOString().split('T')[0];;
          const locationTimeKey = `${location}-${timeKey}`;

          if (!groupedByLocationAndTime[locationTimeKey]) {
            groupedByLocationAndTime[locationTimeKey] = { count: 0 };
            radarParameters.forEach(param => {
              groupedByLocationAndTime[locationTimeKey][param] = 0;
            });
          }

          radarParameters.forEach((param) => {
            if (weather.values[param] !== undefined) {
              groupedByLocationAndTime[locationTimeKey][param] += weather.values[param];
            }
          });

          groupedByLocationAndTime[locationTimeKey].count += 1;
        }
      });
    });
  });

  return Object.entries(groupedByLocationAndTime).map(([locationTime, value]) => {
    const averagedParameters = { locationTimeKey: locationTime };
    radarParameters.forEach((param) => {
      averagedParameters[param] = value[param] / value.count;
    });
    return averagedParameters;
  });
};

const getWeekDateRange = (date) => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);

  const format = (d) => `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;

  return `${format(startOfWeek)} to ${format(endOfWeek)}`;
};

const getGroupKey = (date, groupBy) => {
  switch (groupBy) {
    case 'year':
      return `${date.getFullYear()}`;
    case 'month':
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    case 'week':
      return getWeekDateRange(date);
    default:
      throw new Error('Invalid time scale');
  }
};

const transformDataforBoxPlot = (filteredData, selectedEntries, boxParameter, groupBy) => {
  const groupedData = {};

  selectedEntries.forEach((entryId) => {
    filteredData.forEach((item) => {
      item.weather.forEach((weather) => {
        if (weather._id === entryId) {
          let groupKey;
          if (groupBy === 'location') {
            groupKey = truncateAddress(item.location.place);
          } else if (groupBy === 'year' || groupBy === 'month' || groupBy === 'week') {
            const date = new Date(weather.startTime);
            groupKey = getGroupKey(date, groupBy);
          }

          if (!groupedData[groupKey]) {
            groupedData[groupKey] = { count: 0, values: [] };
          }

          groupedData[groupKey].count += 1;
          groupedData[groupKey].values.push(weather.values[boxParameter]);
        }
      });
    });
  });

  const transformedData = [];

  Object.entries(groupedData).forEach(([groupKey, groupData]) => {
    groupData.values.forEach(value => {
      transformedData.push({
        group: groupKey,
        value: value,
        n: groupData.count,
      });
    });
  });

  return transformedData;
};

const transformDataforHeatMap = (filteredData, selectedEntries, heatmapParameter) => {
  const groupedByLocation = {};

  selectedEntries.forEach((entryId) => {
    filteredData.forEach((item) => {
      item.weather.forEach((weather) => {
        if (weather._id === entryId && weather.values[heatmapParameter] !== undefined) {
          const location = truncateAddress(item.location.place);
          const date = new Date(weather.startTime).toISOString().split('T')[0];

          if (!groupedByLocation[location]) {
            groupedByLocation[location] = {};
          }
          if (!groupedByLocation[location][date]) {
            groupedByLocation[location][date] = { total: 0, count: 0 };
          }

          groupedByLocation[location][date].total += weather.values[heatmapParameter];
          groupedByLocation[location][date].count += 1;
        }
      });
    });
  });

  return Object.entries(groupedByLocation).map(([location, dates]) => ({
    id: location,
    data: Object.entries(dates).map(([date, value]) => ({
      x: date,
      y: value.total / value.count
    }))
  }));
};

const Visualize = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.data);
  const weatherdata = useSelector((state) => state.visualization.data);
  const [dateRange, setDateRange] = useState([null, null]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedEntries, setSelectedEntries] = useState([]);
  const [calendarData, setCalendarData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [parallelData, setParallelData] = useState([]);
  const [scatterData, setScatterData] = useState([]);
  const [radarData, setRadarData] = useState([]);
  const [boxData, setBoxData] = useState([]);
  const [heatData, setHeatData] = useState([]);
  const [selectedLineParameter, setSelectedLineParameter] = useState('temperature');
  const [selectedBarParameter, setSelectedBarParameter] = useState('temperature');
  const [selectedParallelParameters, setSelectedParallelParameters] = useState(['temperature', 'humidity', 'visibility']);
  const [selectedScatterParameter1, setSelectedScatterParameter1] = useState('temperature');
  const [selectedScatterParameter2, setSelectedScatterParameter2] = useState('humidity');
  const [selectedRadarParameters, setSelectedRadarParameters] = useState(['temperature', 'humidity', 'visibility']);
  const [selectedBoxParameter, setSelectedBoxParameter] = useState('temperature');
  const [groupByBox, setGroupByBox] = useState('location');
  const [selectedHeatParameter, setSelectedHeatParameter] = useState('temperature');

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
      navigate("/Auth");
    } else {
      handleDateChange(dateRange);
    }
  }, [currentUser, dateRange, handleDateChange, navigate]);

  const handleSelect = useCallback((newSelectedEntries) => {
    setSelectedEntries(newSelectedEntries);
  }, []);

  useEffect(() => {
    const calendarData = transformDataForCalendar(filteredData, selectedEntries);
    setCalendarData(calendarData);
    console.log(calendarData);
  }, [filteredData, selectedEntries]);

  useEffect(() => {
    const lineChartData = transformDataforLineChart(filteredData, selectedEntries, selectedLineParameter);
    setLineData(lineChartData);
  }, [filteredData, selectedEntries, selectedLineParameter]);

  const handleLineParameterChange = (event) => {
    setSelectedLineParameter(event.target.value);
  };

  useEffect(() => {
    const barChartData = transformDataforBarChart(filteredData, selectedEntries, selectedBarParameter);
    setBarData(barChartData);
  }, [filteredData, selectedEntries, selectedBarParameter]);

  const handleBarParameterChange = (event) => {
    setSelectedBarParameter(event.target.value);
  };

  useEffect(() => {
    const parallelChartData = transformDataforParallelChart(filteredData, selectedEntries, selectedParallelParameters);
    setParallelData(parallelChartData);
  }, [filteredData, selectedEntries, selectedParallelParameters]);

  const handleParallelParameterChange = (event) => {
    setSelectedParallelParameters(event.target.value);
  };

  useEffect(() => {
    const scatterPlotData = transformDataforScatterPlot(filteredData, selectedEntries, [selectedScatterParameter1, selectedScatterParameter2 ]);
    setScatterData(scatterPlotData);
  }, [filteredData, selectedEntries, selectedScatterParameter1, selectedScatterParameter2]);

  const handleScatterParameter1Change = (event) => {
    setSelectedScatterParameter1(event.target.value);
  };
  const handleScatterParameter2Change = (event) => {
    setSelectedScatterParameter2(event.target.value);
  };

  useEffect(() => {
    const radarChartData = transformDataforRadarChart(filteredData, selectedEntries, selectedRadarParameters);
    setRadarData(radarChartData);
  }, [filteredData, selectedEntries, selectedRadarParameters]);

  const handleRadarParameterChange = (event) => {
    setSelectedRadarParameters(event.target.value);
  };

  useEffect(() => {
    const boxPlotData = transformDataforBoxPlot(filteredData, selectedEntries, selectedBoxParameter, groupByBox);
    setBoxData(boxPlotData);
  }, [filteredData, selectedEntries, selectedBoxParameter, groupByBox]);

  const handleBoxParameterChange = (event) => {
    setSelectedBoxParameter(event.target.value);
  };

  const handleGroupbyBoxChange = (event) => {
    setGroupByBox(event.target.value);
  };

  useEffect(() => {
    const heatMapData = transformDataforHeatMap(filteredData, selectedEntries, selectedHeatParameter);
    setHeatData(heatMapData);
  }, [filteredData, selectedEntries, selectedHeatParameter]);

  const handleHeatParameterChange = (event) => {
    setSelectedHeatParameter(event.target.value);
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div style={{ width: "20%", height: "100vh", position: "sticky", top: 2, paddingRight: 5  }}>
        <LocationsList 
        data={filteredData}
        onSelect={handleSelect}
        selectedEntries={selectedEntries}
        dateRange={dateRange}
        setDateRange={setDateRange}
        />
      </div>
      <div style={{ width: "80%" }}>
        <ResponsiveCalendar 
        data={calendarData} 
        />
        <DropdownMenuLineChart 
        selectedParameter={selectedLineParameter} 
        handleParameterChange={handleLineParameterChange} 
        graphData={lineData} 
        />
        <DropdownMenuBarChart
        selectedParameter={selectedBarParameter}
        handleParameterChange={handleBarParameterChange}
        graphData={barData}
        />
        <DropdownMenuParallelCoordinatesChart
        selectedParameters={selectedParallelParameters}
        handleParameterChange={handleParallelParameterChange}
        graphData={parallelData}
        />
        <DropdownMenuScatterPlot
        selectedParameters={[selectedScatterParameter1, selectedScatterParameter2]}
        handleParam1Change={handleScatterParameter1Change}
        handleParam2Change={handleScatterParameter2Change}
        graphData={scatterData}
        />
        <DropdownMenuRadarChart
        selectedParameters={selectedRadarParameters}
        handleParameterChange={handleRadarParameterChange}
        graphData={radarData}
        />
        <DropdownMenuBoxPlot
        selectedParameter={selectedBoxParameter}
        selectedGroup={groupByBox}
        handleParameterChange={handleBoxParameterChange}
        handleGroupChange={handleGroupbyBoxChange}
        graphData={boxData}
        />
        <DropdownMenuHeatMap
        selectedParameter={selectedHeatParameter}
        handleParameterChange={handleHeatParameterChange}
        graphData={heatData}
        />
      </div>
    </div>
  );
};

export default Visualize;