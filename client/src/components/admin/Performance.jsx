/* eslint-disable no-unused-vars */
import { useState } from "react";
import React from 'react'

function Performance() {
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
  return (
    <div>
      <h3>Performance Tracking</h3>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.name} ({employee.role}) - Sales: ${employee.sales}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Performance