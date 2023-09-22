import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function DownloadTxt() {
  const [isExporting, setIsExporting] = useState(false);
  const mongodata = useSelector((state) => state.mongo.data);

  const downloadText = () => {
    if (isExporting || !mongodata) {
      return;
    }

    setIsExporting(true);

    const textData = mongodata.map((data) => {
      const locationInfo = `Location: ${data.location.place}, Latitude: ${data.location.lat}, Longitude: ${data.location.lng}`;
      const weatherInfo = data.weather.map((interval) => {
        return `Date: ${interval.startTime}, Cloud Cover: ${interval.values.cloudCover}, Dew Point: ${interval.values.dewPoint}, Humidity: ${interval.values.humidity}, Precipitation Intensity: ${interval.values.precipitationIntensity}, Precipitation Probability: ${interval.values.precipitationProbability}, Pressure Sea Level: ${interval.values.pressureSeaLevel}, Sunrise Time: ${interval.values.sunriseTime}, Sunset Time: ${interval.values.sunsetTime}, Temperature: ${interval.values.temperature}, Temperature Apparent: ${interval.values.temperatureApparent}, UV Index: ${interval.values.uvIndex}, Visibility: ${interval.values.visibility}, Weather Code Day: ${interval.values.weatherCodeDay}, Weather Code Night: ${interval.values.weatherCodeNight}, Wind Speed: ${interval.values.windSpeed}`;
      });

      return `${locationInfo}\n${weatherInfo.join('\n')}\n`;
    }).join('\n\n');

    const dataUri = 'data:text/plain;charset=utf-8,' + encodeURIComponent(textData);
    const a = document.createElement('a');
    a.href = dataUri;
    a.download = 'weather_data.txt';
    a.style.display = 'none';

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    setIsExporting(false);
  };

  return (
    <div>
      <h2>Download Text</h2>
      <button onClick={downloadText} disabled={isExporting}>
        {isExporting ? 'Exporting...' : 'Download Text'}
      </button>
    </div>
  );
}

export default DownloadTxt;
