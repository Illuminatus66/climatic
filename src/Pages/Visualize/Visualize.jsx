import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import WeatherDataList from "../../components/visualize/weatherDataList";
import TemperatureLineChart from './TemperatureLineChart';

import "./Visualize.css";

const clubWeatherByLocation = (data) => {
  const groupedByLocation = {};

  data.forEach((item) => {
    const location = item.location.place;
    if (!groupedByLocation[location]) {
      groupedByLocation[location] = [];
    }
    groupedByLocation[location] = groupedByLocation[location].concat(item.weather);
  });

  return Object.entries(groupedByLocation).map(([location, weather]) => ({
    id: location,
    data: weather.map((weatherData) => ({
      x: new Date(weatherData.startTime).toLocaleDateString('en-US'),
      y: weatherData.values.temperature,
    })),
  }));
};

const Visualize = () => {
  const history = useHistory();
  const currentUser = useSelector((state) => state.user.data);
  const weatherdata = useSelector((state) => state.visualization.data);
  const [dateRange, setDateRange] = useState([null, null]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedEntries, setSelectedEntries] = useState([]);
  const [graphData, setGraphData] = useState([]);

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
    const temperatureData = clubWeatherByLocation(selectedEntries);
    setGraphData(temperatureData);
  }, [selectedEntries]);

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
        <WeatherDataList data={filteredData} onSelect={handleSelect} selectedEntries={selectedEntries} />
      </div>
      <div style={{ width: "70%" }}>
        <TemperatureLineChart data={graphData} />
      </div>
    </div>
  );
};

export default Visualize;
