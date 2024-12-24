/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from "react";
import { jsPDF } from "jspdf";  // Import jsPDF
import * as XLSX from "xlsx";  // Import XLSX

function SalesOverview() {
  const [sales, setSales] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:3001/sales")
     .then((r) => r.json())
     .then((data) => setSales(data));
  })

  const [selectedFilter, setSelectedFilter] = useState("all");

  // Filter Sales by Type
  const filteredSales =
    selectedFilter === "all"
      ? sales
      : sales.filter((sale) => sale.fuelType === selectedFilter);

  const handleDownload = (format) => {
    if (format === "pdf") {
      // Create a new instance of jsPDF
      const doc = new jsPDF();

      // Add title
      doc.setFontSize(20);
      doc.text("Sales Report", 14, 20);

      // Add table headers
      const headers = [
        "ID", "Fuel Type", "Pump", "Employee", "Date", "Time", "Amount (L)", "Total Cost (KSh)"
      ];

      let y = 30; // Starting y position for the table
      headers.forEach((header, index) => {
        doc.text(header, 14 + (index * 30), y);
      });

      // Add sales data to the table
      filteredSales.forEach((sale, index) => {
        y += 10;
        const row = [
          sale.id, sale.fuelType, sale.pump, sale.employee, sale.date, sale.time, sale.amount, sale.totalCost
        ];
        row.forEach((data, colIndex) => {
          doc.text(data.toString(), 14 + (colIndex * 30), y);
        });
      });

      // Save the PDF
      doc.save("sales_report.pdf");
    } else if (format === "excel") {
      // Create a worksheet from the filtered sales data
      const worksheet = XLSX.utils.json_to_sheet(filteredSales);

      // Create a new workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Report");

      // Generate and download the Excel file
      XLSX.writeFile(workbook, "sales_report.xlsx");
    }
  };

  return (
    <div className="sales-overview">
      <h2 className="text-4xl font-bold">Sales Management</h2>

      {/* Daily Sales Reports */}
      <section>
        <h3>Daily Sales Reports</h3>
        <label>Filter by Fuel Type: </label>
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Kerosene">Kerosene</option>
        </select>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fuel Type</th>
              <th>Pump</th>
              <th>Employee</th>
              <th>Date</th>
              <th>Time</th>
              <th>Amount (L)</th>
              <th>Total Cost (KSh)</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.length === 0 ? (
              <tr>
                <td colSpan="8">No sales data available</td>
              </tr>
            ):(
               filteredSales.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.id}</td>
                <td>{sale.fuelType}</td>
                <td>{sale.pump}</td>
                <td>{sale.employee}</td>
                <td>{sale.date}</td>
                <td>{sale.time}</td>
                <td>{sale.amount}</td>
                <td>{sale.totalCost}</td>
              </tr>
            ))
            )}
           
          </tbody>
        </table>
      </section>

      {/* Transactions Log */}
      <section>
        <h3>Transactions Log</h3>
        <ul>
          {sales.map((sale) => (
            <li key={sale.id}>
              {sale.date} - {sale.time} | {sale.fuelType} sold at {sale.pump} by{" "}
              {sale.employee}: {sale.amount}L - KSh {sale.totalCost}
            </li>
          ))}
        </ul>
      </section>

      {/* Downloadable Reports */}
      <section>
        <h3>Downloadable Reports</h3>
        <button onClick={() => handleDownload("pdf")}>Download PDF</button>
        <button onClick={() => handleDownload("excel")}>Download Excel</button>
      </section>
    </div>
  );
}

export default SalesOverview;
