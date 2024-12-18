import React, { useState } from "react";

function EmployeeManagement() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Kyle Peters",
      role: "Pump Attendant",
      sales: 500,
      shift: "Morning",
      avatar: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "mk",
      role: "Cashier",
      sales: 700,
      shift: "Afternoon",
      avatar: "https://via.placeholder.com/50",
    },
  ]);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    role: "",
    shift: "",
    avatar: "",
  });

  // Handle New Employee Image Upload
  const handleImageUpload = (e, employeeId = null) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (employeeId) {
          // Update the avatar for existing employees
          const updatedEmployees = employees.map((employee) =>
            employee.id === employeeId
              ? { ...employee, avatar: reader.result }
              : employee
          );
          setEmployees(updatedEmployees);
        } else {
          // Add avatar to new employee
          setNewEmployee({ ...newEmployee, avatar: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Add New Employee
  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.role && newEmployee.shift) {
      setEmployees([
        ...employees,
        {
          id: employees.length + 1,
          ...newEmployee,
          sales: 0,
          avatar: newEmployee.avatar || "https://via.placeholder.com/50",
        },
      ]);
      setNewEmployee({ name: "", role: "", shift: "", avatar: "" });
    }
  };

  // Handle Remove Employee
  const handleRemoveEmployee = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  return (
    <div className="employee-management">
      <h2>Employee Management</h2>

      {/* Employee Roster */}
      <section>
        <h3>Employee Roster</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Avatar</th>
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
                <td>
                  {/* Avatar with click-to-upload functionality */}
                  <label htmlFor={`avatar-upload-${employee.id}`}>
                    <img
                      src={employee.avatar}
                      alt="avatar"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                      title="Click to change avatar"
                    />
                  </label>
                  <input
                    id={`avatar-upload-${employee.id}`}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => handleImageUpload(e, employee.id)}
                  />
                </td>
                <td>{employee.name}</td>
                <td>{employee.role}</td>
                <td>{employee.shift}</td>
                <td>${employee.sales}</td>
                <td>
                  <button onClick={() => handleRemoveEmployee(employee.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Add New Employee */}
      <section>
        <h3>Add New Employee</h3>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={newEmployee.name}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Role"
            value={newEmployee.role}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, role: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Shift (Morning/Afternoon)"
            value={newEmployee.shift}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, shift: e.target.value })
            }
          />
          <label htmlFor="new-employee-avatar" style={{ cursor: "pointer" }}>
            📷 Upload Avatar
          </label>
          <input
            id="new-employee-avatar"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          {newEmployee.avatar && (
            <img
              src={newEmployee.avatar}
              alt="preview"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                marginLeft: "10px",
              }}
            />
          )}
          <button onClick={handleAddEmployee}>Add Employee</button>
        </div>
      </section>
    </div>
  );
}

export default EmployeeManagement;
