import { useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import React from "react";
import useStore from "./Store";

function Performance() {
  const { employees, setEmployees } = useStore();

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

  return (
    <div>
      <h3 className="text-4xl font-bold">Performance Tracking</h3>
      <ul>
        {employees.length === 0 ? (
          <li>No employee data available</li>
        ) : (
          employees.map((employee) => (
            <li key={employee.id}>
              {employee.name} ({employee.role})
              {employee.role === "Pump Attendant" &&
                employee.sales !== undefined && (
                  <> - Sales: ${employee.sales}</>
                )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Performance;
