/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import FuelManagement from './FuelManagement';
import SalesOverview from './SalesOverview';
import EmployeeManagement from './EmployeeManagement';
import Orders from './Orders';
import './Dashboard.css';

function Dashboard() {
  // State to manage which section to display
  const [currentSection, setCurrentSection] = useState('FuelManagement');

  // Function to render the selected component dynamically
  const renderSection = () => {
    switch (currentSection) {
      case 'FuelManagement':
        return <FuelManagement />;
      case 'SalesOverview':
        return <SalesOverview />;
      case 'EmployeeManagement':
        return <EmployeeManagement />;
      case 'Orders':
        return <Orders />;
      default:
        return <FuelManagement />;
    }
  };

  return (
    // div.container mx-auto
    // <div className="container mx-auto">

    // </div>
    <div className="dashboard md:container md:mx-auto">
      <Navbar />
      <div className="dashboard-content">
        {/* Sidebar to set which section to display */}
        <Sidebar setSection={setCurrentSection} />

        {/* Main content dynamically rendering the active section */}
        <main className="main-content">{renderSection()}</main>
      </div>
    </div>
  );
}

export default Dashboard;
