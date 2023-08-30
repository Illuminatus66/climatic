import React, { useState } from 'react';
import { CSVLink } from 'react-csv';

function ExportToCSV({ jsonData }) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    if (isExporting) {
      // Prevent multiple clicks while export is in progress
      return;
    }

    setIsExporting(true);
  };

  return (
    <div>
      <h2>Export to CSV</h2>
      <button onClick={handleExport} disabled={isExporting}>
        {isExporting ? 'Downloading...' : 'Download CSV'}
      </button>
      {isExporting && (
        <CSVLink
          data={jsonData}
          filename="data.csv"
          onClick={() => setIsExporting(false)} // Re-enable the button when the download is complete
        >
          Hidden CSVLink
        </CSVLink>
      )}
    </div>
  );
}

export default ExportToCSV;
