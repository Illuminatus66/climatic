import React, { useState } from 'react';
import ExcelJS from 'exceljs';

function DownloadExcel({ jsonData }) {
  const [isExporting, setIsExporting] = useState(false);

  const downloadExcel = () => {
    if (isExporting) {
      return;
    }

    setIsExporting(true);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Weather Data');

    const columns = [
      'Date',
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

    jsonData.weather.forEach((interval) => {
      const values = [
        interval.startTime.$date,
        interval.values.cloudCover,
        interval.values.dewPoint,
        interval.values.humidity,
        interval.values.precipitationIntensity,
        interval.values.precipitationProbability,
        interval.values.pressureSeaLevel,
        interval.values.sunriseTime.$date,
        interval.values.sunsetTime.$date,
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

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'weather_data.xlsx';

      a.addEventListener('click', () => {
        setIsExporting(false);
        URL.revokeObjectURL(url);
      });

      a.click();
    });
  };

  return (
    <div>
      <h2>Download Excel</h2>
      <button onClick={downloadExcel} disabled={isExporting}>
        {isExporting ? 'Exporting...' : 'Download Excel'}
      </button>
    </div>
  );
}

export default DownloadExcel;
