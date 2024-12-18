/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

function EmployeeRoster() {
    const [employees, setEmployees] = useState([
      {
        id: 1,
        name: "John Doe",
        role: "Pump Attendant",
        sales: 500,
        shift: "Morning",
      },
      {
        id: 2,
        name: "Jane Smith",
        role: "Cashier",
        sales: 700,
        shift: "Afternoon",
      },
    ]);
    const [newEmployee, setNewEmployee] = useState({
      name: "",
      role: "",
      shift: "",
    });
    const [salesInput, setSalesInput] = useState({
      employeeId: "",
      salesAmount: "",
    });

    // Add New Employee
    const handleAddEmployee = () => {
      if (newEmployee.name && newEmployee.role && newEmployee.shift) {
        setEmployees([
          ...employees,
          {
            id: employees.length + 1,
            ...newEmployee,
            sales: 0, // Start with 0 sales
          },
        ]);
        setNewEmployee({ name: "", role: "", shift: "" });
      }
    };

    // Remove Employee
    const handleRemoveEmployee = (id) => {
      setEmployees(employees.filter((employee) => employee.id !== id));
    };

    // Handle Sales Input
    const handleSalesInput = (employeeId, amount) => {
      setSalesInput({
        employeeId: employeeId,
        salesAmount: amount,
      });
    };

    // Update Employee Sales
    const handleAddSales = () => {
      const updatedEmployees = employees.map((employee) => {
        if (employee.id === salesInput.employeeId) {
          return {
            ...employee,
            sales: employee.sales + parseFloat(salesInput.salesAmount), // Add sales amount to existing sales
          };
        }
        return employee;
      });
      setEmployees(updatedEmployees);
      setSalesInput({ employeeId: "", salesAmount: "" }); // Reset sales input
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
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.role}</td>
              <td>{employee.shift}</td>
              <td>${employee.sales}</td>
              <td>
                <button onClick={() => handleRemoveEmployee(employee.id)}>
                  Remove
                </button>
                {/* Sales Input Form */}
                <div>
                  <input
                    type="number"
                    placeholder="Sales Amount"
                    value={
                      salesInput.employeeId === employee.id
                        ? salesInput.salesAmount
                        : ""
                    }
                    onChange={(e) =>
                      handleSalesInput(employee.id, e.target.value)
                    }
                  />
                  <button onClick={handleAddSales}>Add Sales</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeRoster