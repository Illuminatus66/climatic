import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import arrowUpImage from "../../assets/up-arrow.png";
import arrowDownImage from "../../assets/down-arrow.png";

const WeatherDataList = ({ data, selectedEntries, onSelect, dateRange, setDateRange }) => {
  const [expandedId, setExpandedId] = useState(null);
  const [isAscending, setIsAscending] = useState(true);

  const handleSelect = (entryId) => {
    onSelect((prevSelectedEntries) => {
      if (prevSelectedEntries.includes(entryId)) {
        return prevSelectedEntries.filter((id) => id !== entryId);
      } else {
        return [...prevSelectedEntries, entryId];
      }
    });
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleSortOrder = () => {
    setIsAscending(!isAscending);
  };

  const sortedData = [...data].sort((a, b) => {
    return isAscending
      ? new Date(a.createdAt) - new Date(b.createdAt)
      : new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div
      className="weather-data-list"
      style={{ overflowY: "scroll", height: "100vh" }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px", height:"30px"}}
      >
        <div id="datepick" style={{ marginRight: "10px" }}>
          <DatePicker
            selectsRange={true}
            startDate={dateRange[0]}
            endDate={dateRange[1]}
            onChange={(update) => setDateRange(update)}
            isClearable={true}
            placeholderText="Select Date Range"
          />
        </div>
        <button onClick={toggleSortOrder} className="sort-button">
          <img src={isAscending ? arrowDownImage : arrowUpImage} alt="Sort"/>
        </button>
      </div>
      {sortedData.map((locationData) => (
        <div key={locationData.location.place} className="location-section">
          <h3 onClick={() => toggleExpand(locationData.location.place)}>
            {locationData.location.place}
          </h3>
          <AnimatePresence>
            {expandedId === locationData.location.place && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="weather-list"
              >
                {locationData.weather.map((weatherEntry) => (
                  <li key={weatherEntry._id} className="weather-item">
                    <input
                      type="checkbox"
                      checked={selectedEntries.includes(weatherEntry._id)}
                      onChange={() => handleSelect(weatherEntry._id)}
                    />
                    <div className="date">
                      {new Date(weatherEntry.startTime).toLocaleDateString()}
                    </div>
                    <div>ID: {weatherEntry._id}</div>
                    <div>Temperature: {weatherEntry.values.temperature}°C</div>
                    <div>
                      Temperature Apparent:{" "}
                      {weatherEntry.values.temperatureApparent}°C
                    </div>
                    <div>Cloud Cover: {weatherEntry.values.cloudCover}%</div>
                    <div>Dew Point: {weatherEntry.values.dewPoint}°C</div>
                    <div>Humidity: {weatherEntry.values.humidity}%</div>
                    <div>
                      Precipitation Intensity:{" "}
                      {weatherEntry.values.precipitationIntensity}&nbsp;mm/hr
                    </div>
                    <div>
                      Precipitation Probability:{" "}
                      {weatherEntry.values.precipitationProbability}%
                    </div>
                    <div>PSL: {weatherEntry.values.pressureSeaLevel}&nbsp;hPa</div>
                    <div>Sunrise Time: {weatherEntry.values.sunriseTime}</div>
                    <div>Sunset Time: {weatherEntry.values.sunsetTime}</div>
                    <div>UV Index: {weatherEntry.values.uvIndex}</div>
                    <div>Visibility: {weatherEntry.values.visibility}km</div>
                    <div>
                      Weather for Day: {weatherEntry.values.weatherCodeDay}
                    </div>
                    <div>
                      Weather for Night: {weatherEntry.values.weatherCodeNight}
                    </div>
                    <div>Wind Speed: {weatherEntry.values.windSpeed}m/s</div>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.data === nextProps.data &&
    prevProps.onSelect === nextProps.onSelect
  );
};

export default React.memo(WeatherDataList, areEqual);
