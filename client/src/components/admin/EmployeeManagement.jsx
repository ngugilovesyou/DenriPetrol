/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Employ from "./Employ";
import EmployeeRoster from "./EmployeeRoster";
import Performance from "./Performance";

function EmployeeManagement() {
  const [currentSection, setCurrentSection] = useState("EmployeeRoster");
  const renderSection = () => {
    switch (currentSection) {
      case "AddEmployee":
        return <Employ />;
      case "PerformanceTracking":
        return <Performance />;
      default:
        return <EmployeeRoster/>;
    }
  };
  return (
    <div id="employee-management">
      <h2 className="text-4xl font-bold">Employee Management</h2>
      <div className="main-content">
        <div className="tracking-cont">
          <div
            className="tracking"
            onClick={() => setCurrentSection("EmployeeRoster")}
          >
            Employee Roster
          </div>
          <div
            className="tracking"
            onClick={() => setCurrentSection("AddEmployee")}
          >
            Add New Employee
          </div>
          <div
            className="tracking"
            onClick={() => setCurrentSection("PerformanceTracking")}
          >
            Performance Tracking
          </div>
        </div>
        <div id="content-container">{renderSection()}</div>
      </div>
    </div>
  );
}

export default EmployeeManagement;
