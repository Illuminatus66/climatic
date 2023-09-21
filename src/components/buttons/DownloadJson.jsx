import React, { useState } from 'react';

function DownloadJsonButton({ mongodata }) {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadJson = () => {
    if (isDownloading) {
      return;
    }

    setIsDownloading(true);

    const jsonData = JSON.stringify(mongodata);
    const dataUrl = `data:application/json;charset=utf-8,${encodeURIComponent(jsonData)}`;

    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'data.json';

    a.click();

    setIsDownloading(false);
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
