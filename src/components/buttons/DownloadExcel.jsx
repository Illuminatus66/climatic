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
    const worksheet = workbook.addWorksheet('Sheet 1');
    worksheet.addRows(jsonData);

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.xlsx';

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
