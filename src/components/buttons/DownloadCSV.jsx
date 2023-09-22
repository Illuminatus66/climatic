import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Papa from 'papaparse';

function DownloadCSV() {
  const [isDownloading, setIsDownloading] = useState(false);
  const mongodata = useSelector((state) => state.mongo.data);

  const downloadCSV = async () => {
    if (isDownloading || !mongodata) {
      return;
    }

    setIsDownloading(true);

    try {
      const rows = mongodata.reduce((acc, location) => {
        location.weather.forEach((interval) => {
          const row = {
            'Place': location.location.place,
            'Latitude': location.location.lat,
            'Longitude': location.location.lng,
            'Weather Start Time': interval.startTime,
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

      const csvData = Papa.unparse(rows);

      const base64Data = btoa(csvData);

      const dataUri = `data:text/csv;base64,${base64Data}`;
      const a = document.createElement('a');
      a.href = dataUri;
      a.download = 'weather_data.csv';

      a.addEventListener('click', () => {
        setIsDownloading(false);
      });

      a.click();
    } catch (error) {
      console.error('Error generating CSV:', error);
      setIsDownloading(false);
    }
  };

  return (
    <div>
      <h2 onClick={isDownloading ? null : downloadCSV} style={{ cursor: isDownloading ? 'not-allowed' : 'pointer' }}>
        Download CSV file&nbsp;
      </h2>
      {isDownloading ? 'Downloading...' : null}
    </div>
  );
}

export default DownloadCSV;
