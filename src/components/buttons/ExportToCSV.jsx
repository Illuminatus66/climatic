import React, { useState } from 'react';
import Papa from 'papaparse';

function ExportToCSV({ mongodata }) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    if (isExporting) {
      return;
    }

    setIsExporting(true);

    const csv = Papa.unparse(mongodata, {
      header: true,
    });

    const csvBlob = new Blob([csv], { type: 'text/csv' });
    const csvUrl = URL.createObjectURL(csvBlob);

    const a = document.createElement('a');
    a.href = csvUrl;
    a.download = 'data.csv';

    a.addEventListener('click', () => {
      setIsExporting(false);
      URL.revokeObjectURL(csvUrl);
    });

    a.click();
  };

  return (
    <div>
      <h2>Export to CSV</h2>
      <button onClick={handleExport} disabled={isExporting}>
        {isExporting ? 'Downloading...' : 'Download CSV'}
      </button>
    </div>
  );
}

export default ExportToCSV;
