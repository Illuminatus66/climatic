import React from "react";
import { motion, useInView } from "framer-motion";

const WeatherEntry = ({ weatherEntry, selectedEntries, handleSelect }) => {
    const [ref, inView] = useInView({ triggerOnce: true });
  
    return (
      <motion.li
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
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
    );
  };

  export default WeatherEntry;