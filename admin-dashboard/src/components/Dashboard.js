import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import FuelManagement from './FuelManagement';
import SalesOverview from './SalesOverview';
import EmployeeManagement from './EmployeeManagement';
import Orders from './Orders';

const Dashboard = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        <Navbar />
        <div style={{ padding: '20px' }}>
          <h2>Welcome to the Admin Dashboard</h2>
          <FuelManagement />
          <SalesOverview />
          <EmployeeManagement />
          <Orders />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
