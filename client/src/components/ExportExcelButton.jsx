import React from 'react';
import { useDataContext } from '../context/DataProvider';

function ExportExcelButton() {
  const { specimenData, setSpecimenData } = useDataContext();

  const exportToCSV = () => {
    if (!specimenData || specimenData.length === 0) {
      alert("No data to export.");
      return;
    }

    const headers = Object.keys(specimenData[0]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(",")]
      .concat(specimenData.map(obj => headers.map(header => obj[header])).map(row => row.join(",")))
      .join("\n");

    const csvDataUri = encodeURI(csvContent);

    const link = document.createElement("a");
    link.setAttribute("href", csvDataUri);
    link.setAttribute("download", "exported_data.csv");
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  return (
    <button onClick={exportToCSV}>Export to CSV</button>
  );
}

export default ExportExcelButton;
