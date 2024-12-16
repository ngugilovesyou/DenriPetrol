import React from 'react';

const Sidebar = () => {
  return (
    <div style={{ width: '250px', background: '#333', color: 'white', padding: '20px' }}>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li style={{ margin: '20px 0' }}>Fuel Management</li>
        <li style={{ margin: '20px 0' }}>Sales Overview</li>
        <li style={{ margin: '20px 0' }}>Employee Management</li>
        <li style={{ margin: '20px 0' }}>Orders</li>
      </ul>
    </div>
  );
};

export default Sidebar;
