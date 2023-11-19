import React, { useState, useRef, useEffect, createRef } from "react";
import { animate, motion, AnimatePresence, inView } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import WeatherEntry from "./WeatherEntry";

const LocationsList = ({ data, selectedEntries, onSelect, dateRange, setDateRange }) => {
  const [expandedId, setExpandedId] = useState(null);
  const [isAscending, setIsAscending] = useState(true);
  const listRef = useRef(null);
  const itemRefs = useRef(new Map());

  useEffect(() => {
    data.forEach((item) => {
      const ref = itemRefs.current.get(item.location.place) || createRef();
      itemRefs.current.set(item.location.place, ref);

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
      style={{ overflowY: "scroll", height: "100vh", backgroundColor: "#e6ccff" }}
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
        <div key={locationData.location.place} className="location-section">
          <h3 onClick={() => toggleExpand(locationData.location.place)}
            style={{
              backgroundColor: '#d9b3ff',
              cursor: 'pointer',
              padding: '10px',
              margin: '10px 0',
              boxShadow: expandedId === locationData.location.place ? 'none' : '0px 4px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '5px',
            }}
            ref={itemRefs.current.get(locationData.location.place)}
          >
            {locationData.location.place}
          </h3>
          <AnimatePresence>
            {expandedId === locationData.location.place && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, y: 0 }}
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
                  <WeatherEntry
                    key={weatherEntry._id}
                    weatherEntry={weatherEntry}
                    selectedEntries={selectedEntries}
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

const areEqual = (prevProps, nextProps) => {
  return prevProps.data === nextProps.data && prevProps.onSelect === nextProps.onSelect;
};

export default React.memo(LocationsList, areEqual);
