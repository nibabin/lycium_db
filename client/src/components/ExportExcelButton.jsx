import React from 'react';
import { useDataContext } from '../context/DataProvider';

function ExportExcelButton() {
  const { specimenData, setSpecimenData } = useDataContext();

const exportToCSV = () => {
      if (!specimenData || specimenData.length === 0) {
        alert("No data to export.");
        return;
      }
    
      // Get all unique property names from all specimens
      const allHeaders = Array.from(
        new Set(specimenData.flatMap((obj) => Object.keys(obj)))
      );
    
      // Function to escape and wrap a value in double quotes if it contains a comma
      const escapeAndWrap = (value) => {
        if (typeof value === 'string') {
          return `"${value.replace(/"/g, '""')}"`; // Replace double quotes with two double quotes
        }
        return value;
      };
    
      const csvContent =
        "data:text/csv;charset=utf-8," +
        [allHeaders.join(",")]
          .concat(
            specimenData.map((obj) =>
              allHeaders.map((header) => escapeAndWrap(obj[header] ?? "")).join(",")
            )
          )
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