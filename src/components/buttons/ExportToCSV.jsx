import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Papa from 'papaparse';

function ExportToCSV() {
  const [isExporting, setIsExporting] = useState(false);
  const mongodata = useSelector((state) => state.mongo.data);

  const downloadCSV = () => {
    if (isExporting || !mongodata) {
      return;
    }

    setIsExporting(true);

    const rows = mongodata.reduce((acc, location) => {
      location.weather.forEach((interval) => {
        const row = {
          'Date': interval.startTime,
          'Cloud Cover': interval.values.cloudCover,
          'Dew Point': interval.values.dewPoint,
          'Humidity': interval.values.humidity,
          'Precipitation Intensity': interval.values.precipitationIntensity,
          'Precipitation Probability': interval.values.precipitationProbability,
          'Pressure Sea Level': interval.values.pressureSeaLevel,
          'Sunrise Time': interval.values.sunriseTime,
          'Sunset Time': interval.values.sunsetTime,
          'Temperature': interval.values.temperature,
          'Temperature Apparent': interval.values.temperatureApparent,
          'UV Index': interval.values.uvIndex,
          'Visibility': interval.values.visibility,
          'Weather Code Day': interval.values.weatherCodeDay,
          'Weather Code Night': interval.values.weatherCodeNight,
          'Wind Speed': interval.values.windSpeed,
        };
        acc.push(row);
      });
      return acc;
    }, []);

    const csv = Papa.unparse(rows);

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'weather_data.csv';

    a.addEventListener('click', () => {
      setIsExporting(false);
      URL.revokeObjectURL(url);
    });

    a.click();
  };

  return (
    <div>
      <h2>Export to CSV</h2>
      <button onClick={downloadCSV} disabled={isExporting}>
        {isExporting ? 'Downloading...' : 'Download CSV'}
      </button>
    </div>
  );
}

export default ExportToCSV;
