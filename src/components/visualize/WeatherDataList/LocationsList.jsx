import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import WeatherEntry from "./WeatherEntry";

const LocationsList = ({ data, selectedEntries, onSelect, dateRange, setDateRange }) => {
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
      style={{ overflowY: "scroll", height: "101vh", backgroundColor: "#e6ccff" }}
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
          {isAscending ? <FontAwesomeIcon icon={faArrowDown}/> : <FontAwesomeIcon icon={faArrowUp}/> }
        </button>
      </div>
      {sortedData.map((locationData) => (
        <div key={`${locationData.location.place}-${locationData.createdAt}`} className="location-section">
          <h3 onClick={() => toggleExpand(`${locationData.location.place}-${locationData.createdAt}`)}
            style={{
              backgroundColor: '#d9b3ff',
              cursor: 'pointer',
              padding: '10px',
              margin: '10px 0 0 0',
              boxShadow: expandedId === `${locationData.location.place}-${locationData.createdAt}` ? 'none' : '0px 4px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '5px',
            }}
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
                  padding: '5px',
                  borderRadius: '5px',
                }}
              >
                {locationData.weather.map((weatherEntry) => (
                  <WeatherEntry
                  key={weatherEntry._id}
                  weatherEntry={weatherEntry}
                  isSelected={selectedEntries.includes(weatherEntry._id)}
                  handleSelect={handleSelect}
                />
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default LocationsList;
