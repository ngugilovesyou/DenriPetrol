/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";


function AlertDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Confirm Action"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to continue with this action?.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function EmployeeRoster() {
  const [ employees, setEmployees ] = useState([]);
  const [salesInput, setSalesInput] = useState({
    employeeId: "",
    salesAmount: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false); 
  const [employeeToRemove, setEmployeeToRemove] = useState(null); 

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

  // Remove Employee
  const handleRemoveEmployee = (employeeId) => {
    setEmployeeToRemove(employeeId); 
    setDialogOpen(true); 
  };

  const confirmRemoveEmployee = () => {
    if (employeeToRemove) {
      fetch(`http://127.0.0.1:5000/employees/${employeeToRemove}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((r) => r.json())
        .then(() =>
          setEmployees((prev) =>
            prev.filter((employee) => employee.id !== employeeToRemove)
          )
        )
        .catch((error) => console.error("Error removing employee:", error));
    }
    setDialogOpen(false); 
  };

  // Update Employee Sales
  const handleAddSales = (employeeId) => {
    if (!salesInput.salesAmount || salesInput.employeeId !== employeeId) return;

    fetch(`http://127.0.0.1:5000/employees/${employeeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sales: salesInput.salesAmount }),
    })
      .then((r) => r.json())
      .then((updatedEmployee) => {
        setEmployees((prev) =>
          prev.map((employee) =>
            employee.id === updatedEmployee.id
              ? { ...employee, sales: updatedEmployee.sales }
              : employee
          )
        );
        setSalesInput({ employeeId: "", salesAmount: "" });
      })
      .catch((error) => console.error("Error updating sales:", error));
  };

  return (
    <div>
      <h3>Employee Roster</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Shift</th>
            <th>Sales</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="6">No employee data available</td>
            </tr>
          ) : (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>
                  {employee.name}
                </td>
                <td>{employee.role}</td>
                <td>{employee.shift}</td>
                <td>${employee.sales}</td>
                <td>
                  <button
                    onClick={() => handleRemoveEmployee(employee.id)}
                    style={{
                      backgroundColor: "#2c3e50",
                      padding: "5px",
                      borderRadius: "5px",
                      marginLeft: "15em",
                      color: "white",
                    }}
                  >
                    Remove
                  </button>
                  <div style={{ marginTop: "10px" }}>
                    <input
                      type="number"
                      placeholder="Sales Amount"
                      value={
                        salesInput.employeeId === employee.id
                          ? salesInput.salesAmount
                          : ""
                      }
                      onChange={(e) =>
                        setSalesInput({
                          employeeId: employee.id,
                          salesAmount: e.target.value,
                        })
                      }
                      style={{ marginRight: "5px" }}
                    />
                    <button
                      onClick={() => handleAddSales(employee.id)}
                      style={{
                        padding: "5px",
                        backgroundColor: "#2c3e50",
                        color: "white",
                        borderRadius: "5px",
                      }}
                    >
                      Add Sales
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Add the dialog component */}
      <AlertDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)} // Close dialog without action
        onConfirm={confirmRemoveEmployee} // Confirm action to remove employee
      />
    </div>
  );
}

export default EmployeeRoster;
