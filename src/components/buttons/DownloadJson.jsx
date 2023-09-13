import React, { useState } from 'react';

function DownloadJsonButton({ jsonData }) {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadJson = () => {
    if (isDownloading) {
      return;
    }

    setIsDownloading(true);

    const jsonBlob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });
    const url = URL.createObjectURL(jsonBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';

    a.addEventListener('click', () => {
      setIsDownloading(false);
      URL.revokeObjectURL(url);
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
