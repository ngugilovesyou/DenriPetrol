/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf"; // Import jsPDF
import * as XLSX from "xlsx"; // Import XLSX
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";

function SalesOverview() {
  const [sales, setSales] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [open, setOpen] = React.useState(false);
  const [employees, setEmployees] = useState([]);
  const [newSales, setNewSales] = useState({
    fuel_type: "",
    pump: "",
    employee_id: "",
    date: "",
    time: "",
    litres: "",
    total_cost: "",
  });

  useEffect(() => {
    fetch("http://127.0.0.1:5000/sales", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSales(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [setSales]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/employees", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((data) => setEmployees(data));
  }, [setEmployees]);

  // Filter Sales by Type
  const filteredSales =
    selectedFilter === "all"
      ? sales
      : sales.filter((sale) => sale.fuel_type === selectedFilter);

  const handleDownload = (format) => {
    if (format === "pdf") {
      const doc = new jsPDF();

      // Add title
      doc.setFontSize(20);
      doc.text("Sales Report", 14, 20);

      // Add table headers
      const headers = [
        "ID",
        "Fuel Type",
        "Pump",
        "Employee",
        "Date",
        "Time",
        "Litres (L)",
        "Total Cost (KSh)",
      ];

      let y = 30; // Starting y position for the table
      const cellWidth = 30; // Set a fixed width for each column
      const headerHeight = 10;

      // Draw headers with background and borders
      doc.setFontSize(10);
      headers.forEach((header, index) => {
        doc.setFillColor(200, 220, 255); 
        doc.rect(14 + index * cellWidth, y, cellWidth, headerHeight, "FD"); 
        doc.text(header, 14 + index * cellWidth + 5, y + 7); 
      });

      // Add sales data to the table
      y += headerHeight;
      filteredSales.forEach((sale, index) => {
        const row = [
          sale.id,
          sale.fuel_type,
          sale.pump,
          sale.employee_id,
          sale.date,
          sale.time,
          sale.litres,
          sale.total_cost,
        ];

        row.forEach((data, colIndex) => {
          doc.rect(14 + colIndex * cellWidth, y, cellWidth, 10); 
          doc.text(data.toString(), 14 + colIndex * cellWidth + 5, y + 7); 
        });

        y += 10; 
      });

      
      doc.save("sales_report.pdf");
    } else if (format === "excel") {
      // Column headers
      const headers = [
        "ID",
        "Fuel Type",
        "Pump",
        "Employee",
        "Date",
        "Time",
        "Litres (L)",
        "Total Cost (KSh)",
      ];

      // Map sales data to a suitable format for Excel
      const data = filteredSales.map((sale) => [
        sale.id,
        sale.fuel_type,
        sale.pump,
        sale.employee_id,
        sale.date,
        sale.time,
        sale.litres,
        sale.total_cost,
      ]);

      // Create a worksheet with data and headers
      const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);

      // Create a new workbook and append the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Report");

      // Generate and download the Excel file
      XLSX.writeFile(workbook, "sales_report.xlsx");
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSales((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddSales = () => {
    // Add sales code here
    fetch("http://127.0.0.1:5000/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSales),
    })
      .then((response) => response.json())
      .then((data) => {
        setNewSales(data)
        setNewSales({
          fuel_type: "",
          pump: "",
          employee_id: "",
          date: "",
          time: "",
          litres: "",
          total_cost: "",
        });
        setOpen(false);
      });
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
        <Button variant="outlined" onClick={handleClickOpen}>
          Add New Sales
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <div>
            <form className="max-w-md mx-auto">
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <h3>Add New Sale</h3>
                  <select
                    name="fuel_type"
                    value={newSales.fuel_type}
                    onChange={handleInputChange}
                    required
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  >
                    <option value="">Select Fuel Type</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Kerosene">Kerosene</option>
                  </select>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <select
                    name="pump"
                    value={newSales.pump}
                    onChange={handleInputChange}
                    required
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  >
                    <option value="">Select Pump</option>
                    <option value="Pump 1">Pump 1</option>
                    <option value="Pump 2">Pump 2</option>
                    <option value="Pump 3">Pump 3</option>
                    <option value="Pump 4">Pump 4</option>
                    <option value="Pump 5">Pump 5</option>
                    <option value="Pump 6">Pump 6</option>
                  </select>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <select
                    name="employee_id"
                    value={newSales.employee_id}
                    onChange={handleInputChange}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  >
                    <option value="">Select Employee</option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <label className="block">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={newSales.date}
                    onChange={handleInputChange}
                    required
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  />
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <label className="block">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={newSales.time}
                    onChange={handleInputChange}
                    required
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  />
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <label className="block">Litres</label>
                  <input
                    type="number"
                    name="litres"
                    value={newSales.litres}
                    onChange={handleInputChange}
                    required
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  />
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <label className="block">Total Cost</label>
                  <input
                    type="number"
                    name="total_cost"
                    value={newSales.total_cost}
                    onChange={handleInputChange}
                    required
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  />
                </div>
              </div>
            </form>
            <Button onClick={handleAddSales}>Submit</Button>
          </div>
        </Dialog>
        <div>
          <Button onClick={() => handleDownload("pdf")}>Download PDF</Button>
          <Button onClick={() => handleDownload("excel")}>
            Download Excel
          </Button>
        </div>
        <table className="table-auto">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fuel Type</th>
              <th>Pump</th>
              <th>Employee</th>
              <th>Date</th>
              <th>Time</th>
              <th>Litres (L)</th>
              <th>Total Cost (KSh)</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.id}</td>
                <td>{sale.fuel_type}</td>
                <td>{sale.pump}</td>
                <td>{sale.employee_name}</td>
                <td>{sale.date}</td>
                <td>{sale.time}</td>
                <td>{sale.litres}</td>
                <td>{sale.total_cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default SalesOverview;
