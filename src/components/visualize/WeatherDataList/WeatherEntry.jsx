import React from "react";
import { motion } from "framer-motion";

const WeatherEntry = ({ weatherEntry, isSelected, handleSelect }) => {
  const style = {
    margin: "5px",
    padding: "5px",
    borderRadius: "5px",
    border: isSelected ? "2px solid green" : "1px dashed red",
    cursor: "pointer",
  };

  return (
    <motion.div
      className="weather-item"
      onClick={() => handleSelect(weatherEntry._id)}
      style={style}
    >
      <div className="date">
        {new Date(weatherEntry.startTime).toLocaleString()}
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
        Precipitation Intensity: {weatherEntry.values.precipitationIntensity}mm/hr
      </div>
      <div>
        Precipitation Probability:{weatherEntry.values.precipitationProbability}%
      </div>
      <div>PSL: {weatherEntry.values.pressureSeaLevel}&nbsp;hPa</div>
      <div>Sunrise Time: {weatherEntry.values.sunriseTime}</div>
      <div>Sunset Time: {weatherEntry.values.sunsetTime}</div>
      <div>UV Index: {weatherEntry.values.uvIndex}</div>
      <div>Visibility: {weatherEntry.values.visibility}km</div>
      <div>Weather for Day: {weatherEntry.values.weatherCodeDay}</div>
      <div>Weather for Night: {weatherEntry.values.weatherCodeNight}</div>
      <div>Wind Speed: {weatherEntry.values.windSpeed}m/s</div>
    </motion.div>
  );
};

export default WeatherEntry;
