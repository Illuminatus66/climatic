import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ExcelJS from 'exceljs';

function DownloadExcel() {
  const [isDownloading, setIsDownloading] = useState(false);
  const mongodata = useSelector((state) => state.mongo.data);

  const downloadExcel = async () => {
    if (isDownloading || !mongodata) {
      return;
    }

    setIsDownloading(true);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Weather Data');

    const columns = [
      'Date',
      'Location',
      'Latitude',
      'Longitude',
      'Cloud Cover',
      'Dew Point',
      'Humidity',
      'Precipitation Intensity',
      'Precipitation Probability',
      'Pressure Sea Level',
      'Sunrise Time',
      'Sunset Time',
      'Temperature',
      'Temperature Apparent',
      'UV Index',
      'Visibility',
      'Weather Code Day',
      'Weather Code Night',
      'Wind Speed',
    ];

    worksheet.addRow(columns);

    if (Array.isArray(mongodata)) {
      mongodata.forEach((data) => {
        if (data.weather && Array.isArray(data.weather)) {
          data.weather.forEach((interval) => {
            const values = [
              interval.startTime,
              data.location.place,
              data.location.lat,
              data.location.lng,
              interval.values.cloudCover,
              interval.values.dewPoint,
              interval.values.humidity,
              interval.values.precipitationIntensity,
              interval.values.precipitationProbability,
              interval.values.pressureSeaLevel,
              interval.values.sunriseTime,
              interval.values.sunsetTime,
              interval.values.temperature,
              interval.values.temperatureApparent,
              interval.values.uvIndex,
              interval.values.visibility,
              interval.values.weatherCodeDay,
              interval.values.weatherCodeNight,
              interval.values.windSpeed,
            ];
            worksheet.addRow(values);
          });
        }
      });
    }

    const buffer = await workbook.xlsx.writeBuffer();

    const dataUri = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + buffer.toString('base64');
    const a = document.createElement('a');
    a.href = dataUri;
    a.download = 'weather_data.xlsx';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setIsDownloading(false);
  };

  return (
    <div>
      <h2 onClick={isDownloading ? null : downloadExcel} style={{ cursor: isDownloading ? 'not-allowed' : 'pointer' }}>
        Download Excel File
      </h2>
      {isDownloading ? 'Downloading...' : null}
    </div>
  );
}

export default DownloadExcel;
