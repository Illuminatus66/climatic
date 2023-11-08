import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import arrowUpImage from "./path-to-your-arrow-up-image.svg";
import arrowDownImage from "./path-to-your-arrow-down-image.svg";

const WeatherDataList = ({ data, selectedEntries, onSelect }) => {
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
      style={{ overflowY: "scroll", maxHeight: "80vh" }}
    >
      <button onClick={toggleSortOrder} className="sort-button">
        <img src={isAscending ? arrowDownImage : arrowUpImage} alt="Sort" />
      </button>
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
                    <div>Temperature: {weatherEntry.values.temperature}%</div>
                    <div>
                      Temperature Apparent:{" "}
                      {weatherEntry.values.temperatureApparent}%
                    </div>
                    <div>Cloud Cover: {weatherEntry.values.cloudCover}%</div>
                    <div>Dew Point: {weatherEntry.values.dewPoint}°</div>
                    <div>Humidity: {weatherEntry.values.humidity}%</div>
                    <div>
                      Precipitation Intensity:{" "}
                      {weatherEntry.values.precipitationIntensity}%
                    </div>
                    <div>
                      Precipitation Probability:{" "}
                      {weatherEntry.values.precipitationProbability}%
                    </div>
                    <div>PSL: {weatherEntry.values.pressureSeaLevel}%</div>
                    <div>Sunrise Time: {weatherEntry.values.sunriseTime}%</div>
                    <div>Sunset Time: {weatherEntry.values.sunsetTime}%</div>
                    <div>UV Index: {weatherEntry.values.uvIndex}%</div>
                    <div>Visibility: {weatherEntry.values.visibility}%</div>
                    <div>
                      Weather for Day: {weatherEntry.values.weatherCodeDay}%
                    </div>
                    <div>
                      Weather for Night: {weatherEntry.values.weatherCodeNight}%
                    </div>
                    <div>Wind Speed: {weatherEntry.values.windSpeed}%</div>
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
