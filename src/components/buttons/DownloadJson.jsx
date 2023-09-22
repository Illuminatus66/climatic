import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function DownloadJsonButton() {
  const [isDownloading, setIsDownloading] = useState(false);
  const mongodata = useSelector((state) => state.mongo.data);

  const downloadJson = () => {
    if (isDownloading || !mongodata) {
      return;
    }

    setIsDownloading(true);

    const jsonData = JSON.stringify(mongodata, null, 2);
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
      <h2>Download JSON</h2>
      <button onClick={downloadJson} disabled={isDownloading}>
        {isDownloading ? 'Downloading...' : 'Download JSON'}
      </button>
    </div>
  );
}

export default DownloadJsonButton;
