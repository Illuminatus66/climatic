import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function DownloadJson() {
  const [isDownloading, setIsDownloading] = useState(false);
  const weatherdata = useSelector((state) => state.weather.data);

  const downloadJson = () => {
    if (isDownloading || !weatherdata) {
      return;
    }

    setIsDownloading(true);

    const jsonData = JSON.stringify(weatherdata, null, 2);
    const dataUrl = `data:application/json;charset=utf-8,${encodeURIComponent(jsonData)}`;

    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'data.json';

    a.addEventListener('click', () => {
      setIsDownloading(false);
      URL.revokeObjectURL(a.href);
    });

    a.click();
  };

  return (
    <div>
      <h2 onClick={isDownloading ? null : downloadJson} style={{ cursor: isDownloading ? 'not-allowed' : 'pointer' }}>
        Download JSON File
      </h2>
      {isDownloading ? 'Downloading...' : null}
    </div>
  );
}

export default DownloadJson;
