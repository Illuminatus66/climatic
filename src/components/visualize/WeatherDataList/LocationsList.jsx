import React, { useState, useRef, useEffect, createRef } from "react";
import { animate, motion, AnimatePresence, inView } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const LocationsList = ({ data, selectedEntries, onSelect, dateRange, setDateRange }) => {
  const [expandedId, setExpandedId] = useState(null);
  const [isAscending, setIsAscending] = useState(true);
  const listRef = useRef(null);
  const itemRefs = useRef(new Map());

  useEffect(() => {
    const newRefs = new Map();
  
    data.forEach((item) => {
      const key = `${item.location.place}-${item.createdAt}`;
      newRefs.set(key, itemRefs.current.get(key) || createRef());
    });

    itemRefs.current = newRefs;

    itemRefs.current.forEach((ref) => {
      if (ref.current) {
        inView(ref.current, {
          root: listRef.current,
          once: false,
          callback: ({ target }) => {
            animate(target, { opacity: 1, y: 0 });
          },
          exitCallback: ({ target }) => {
            animate(target, { opacity: 0, y: -20 });
          }
        });
      }
    });
  }, [data]);
  

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
      style={{ overflowY: "scroll", height: "101vh", backgroundColor: "#e6ccff" }}
      ref={listRef}
    >
      <div 
      style={{ display: "flex", alignItems: "center", marginBottom: "20px"}}
      >
        <div id="datepick" style={{ marginRight: "15px" }}>
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
          {isAscending ? '↓' : '↑'}
        </button>
      </div>
      {sortedData.map((locationData) => (
        <div key={`${locationData.location.place}-${locationData.createdAt}`} className="location-section">
          <h3 onClick={() => toggleExpand(`${locationData.location.place}-${locationData.createdAt}`)}
            style={{
              backgroundColor: '#d9b3ff',
              cursor: 'pointer',
              padding: '10px',
              margin: '10px 0',
              boxShadow: expandedId === `${locationData.location.place}-${locationData.createdAt}` ? 'none' : '0px 4px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '5px',
            }}
            ref={itemRefs.current.get(`${locationData.location.place}-${locationData.createdAt}`)}
          >
            {locationData.location.place}
          </h3>
          <AnimatePresence>
            {expandedId === (`${locationData.location.place}-${locationData.createdAt}`) && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto"}}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="weather-list"
                style={{
                  backgroundColor: '#ffb3b3',
                  padding: '10px',
                  margin: '0 10px',
                  borderRadius: '5px',
                }}
              >
                {locationData.weather.map((weatherEntry) => (
                  <motion.li
                  className="weather-item"
                  onClick={() => handleSelect(weatherEntry._id)}
                  style={{
                    border: selectedEntries.includes(weatherEntry._id) ? '2px solid lightblue' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  <div className="date">
                    {new Date(weatherEntry.startTime).toLocaleDateString()}
                  </div>
                  <div>ID: {weatherEntry._id}</div>
                  <div>Temperature: {weatherEntry.values.temperature}°C</div>
                  <div>
                    Temperature Apparent: {weatherEntry.values.temperatureApparent}°C
                  </div>
                  <div>Cloud Cover: {weatherEntry.values.cloudCover}%</div>
                  <div>Dew Point: {weatherEntry.values.dewPoint}°C</div>
                  <div>Humidity: {weatherEntry.values.humidity}%</div>
                  <div>
                    Precipitation Intensity: {weatherEntry.values.precipitationIntensity}
                    &nbsp;mm/hr
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
                  <div>Weather for Day: {weatherEntry.values.weatherCodeDay}</div>
                  <div>Weather for Night: {weatherEntry.values.weatherCodeNight}</div>
                  <div>Wind Speed: {weatherEntry.values.windSpeed}m/s</div>
                </motion.li>
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
  return prevProps.data === nextProps.data && prevProps.onSelect === nextProps.onSelect;
};

export default React.memo(LocationsList, areEqual);
