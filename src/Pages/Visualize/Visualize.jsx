import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import WeatherDataList from "../../components/visualize/weatherDataList";
import WeatherLineChart from '../../components/visualize/LineChart/WeatherLineChart';
import WeatherBarChart from "../../components/visualize/BarChart/WeatherBarChart";
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
    locationTime: locationTime,
    value: value.totalofParameter / value.count
  }));
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
  const [selectedLineParameter, setSelectedLineParameter] = useState('temperature');
  const [selectedBarParameter, setSelectedBarParameter] = useState('temperature');

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

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div style={{ width: "30%" }}>
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
      <div style={{ width: "70%" }}>
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
      </div>
    </div>
  );
};

export default Visualize;
