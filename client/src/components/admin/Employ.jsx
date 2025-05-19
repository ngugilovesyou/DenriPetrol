/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

function Employ() {
  const [newEmployee, setNewEmployee] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    role: "",
    shift: "",
    sales: 0,
    salary: "",
    date_joined: getFormattedDateTime(),
  });

  function getFormattedDateTime() {
    const now = new Date();
    const year = now.getFullYear(); 
    const month = now.getMonth() + 1; 
    const day = now.getDate(); 
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${year}-${formattedMonth}-${formattedDay} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
   
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleEmployeeInput = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !newEmployee.first_name ||
      !newEmployee.last_name ||
      !newEmployee.email
    ) {
      setSnackbarSeverity("error");
      setSnackbarMessage("All fields are required.");
      setSnackbarOpen(true);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmployee.email)) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Please enter a valid email address.");
      setSnackbarOpen(true);
      return;
    }

    const employeeData = { ...newEmployee };
    if (newEmployee.role !== "Pump Attendant" && !newEmployee.sales) {
      employeeData.sales = 0; 
    }

    // Send request
    fetch("http://127.0.0.1:5000/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    })
      .then(async (r) => {
        console.log("Response Status:", r.status); 
        if (!r.ok) {
          const errorData = await r.json();
          console.error("Error data:", errorData); 
          throw new Error(errorData.error || "Failed to create employee.");
        }
        const responseData = await r.json();
        console.log("Response Data:", responseData); 
        return responseData;
      })
      .then((data) => {
        console.log("Data after .then:", data);
        setNewEmployee({
          first_name: "",
          last_name: "",
          email: "",
          role: "",
          phone_number: "",
          shift: "",
          salary: "",
          sales: 0, 
        });
        setSnackbarSeverity("success");
        setSnackbarMessage("Employee added successfully!");
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        setSnackbarSeverity("error");
        setSnackbarMessage(error.message || "Failed to add employee.");
        setSnackbarOpen(true);
      });
  };



  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div id="employee-form">
      <h3 style={{ color: "black", fontSize: "30px" }}>Add New Employee</h3>

      <form className="max-w-md mx-auto">
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="first_name"
              value={newEmployee.first_name}
              onChange={handleEmployeeInput}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              First name
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="last_name"
              value={newEmployee.last_name}
              onChange={handleEmployeeInput}
              id="floating_last_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_last_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Last name
            </label>
          </div>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            value={newEmployee.email}
            onChange={handleEmployeeInput}
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="phone_number"
              value={newEmployee.phone_number}
              onChange={handleEmployeeInput}
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" " 
              title="Phone number must start with '07' followed by 8 digits" // Validation hint
              required
            />
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone number (+254-712-345-678)
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <select
              name="role"
              value={newEmployee.role}
              onChange={handleEmployeeInput}
              required
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            >
              <option value="">Select role</option>
              <option value="Manager">Manager</option>
              <option value="Security Manager">Security Manager</option>
              <option value="Marketing Manager">Marketing Manager</option>
              <option value="Accountant">Accountant</option>
              <option value="Pump Attendant">Pump Attendant</option>
            </select>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="shift"
              value={newEmployee.shift}
              onChange={handleEmployeeInput}
              id="floating_shift"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_shift"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Shift
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <select
              name="salary"
              value={newEmployee.salary}
              onChange={handleEmployeeInput}
              required
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            >
              <option value="">Salary</option>
              <option value="100,000">ksh.100,000</option>
              <option value="80,000">ksh.80,000</option>
              <option value="60,000">ksh.60,000</option>
              <option value="40,000">ksh.40,000</option>
              <option value="30,000">ksh.30,000</option>
            </select>
          </div>
        </div>

        {/* Conditionally render sales field only for Pump Attendants */}
        {newEmployee.role === "Pump Attendant" && (
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="sales"
              value={newEmployee.sales}
              onChange={handleEmployeeInput}
              id="floating_sales"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_sales"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Sales
            </label>
          </div>
        )}

        <div className="relative z-0 w-full mb-5 group">
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 text-white rounded"
          >
            Add Employee
          </button>
        </div>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Employ;
