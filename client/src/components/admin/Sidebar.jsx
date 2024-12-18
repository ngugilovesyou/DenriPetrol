import React from "react";


function Sidebar({ setSection }) {
  return (
    <div className="sidebar">
      <h2>Admin Menu</h2>
      <ul>
        <li onClick={() => setSection("FuelManagement")}>Fuel Management</li>
        <li onClick={() => setSection("SalesOverview")}>Sales Overview</li>
        <li onClick={() => setSection("EmployeeManagement")}>Employee Management</li>
        <li onClick={() => setSection("Orders")}>Orders</li>
      </ul>
    </div>
  );
}

export default Sidebar;
