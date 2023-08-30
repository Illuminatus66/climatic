import React, { useState } from 'react';

function DownloadJsonButton({ jsonData }) {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadJson = () => {
    if (isDownloading) {
      // Prevent multiple clicks while download is in progress
      return;
    }

    setIsDownloading(true);

    const jsonBlob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });
    const url = URL.createObjectURL(jsonBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';

    a.addEventListener('click', () => {
      setIsDownloading(false); // Re-enable the button when the download is complete
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
