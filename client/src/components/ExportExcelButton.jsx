import React from 'react';

function ExportExcelButton({ data }) {
  const exportToCSV = () => {
    if (!data || data.length === 0) {
      alert("No data to export.");
      return;
    }

    // Extract the headers from the first object in the array
    const headers = Object.keys(data[0]);

    // Create a CSV content string with headers
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(",")]
      .concat(data.map(obj => headers.map(header => obj[header])).map(row => row.join(",")))
      .join("\n");

    // Create a data URI for the CSV content
    const csvDataUri = encodeURI(csvContent);

    // Create an anchor element to trigger the download
    const link = document.createElement("a");
    link.setAttribute("href", csvDataUri);
    link.setAttribute("download", "exported_data.csv");
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Remove the link element
    document.body.removeChild(link);
  };

  return (
    <button onClick={exportToCSV}>Export to CSV</button>
  );
}

export default ExportExcelButton;
