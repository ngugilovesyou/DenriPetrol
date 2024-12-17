import { useState } from 'react';
import './App.css';
import Dashboard from './components/admin/Dashboard.jsx';

function App() {
  return (
    <div>
      <h1>Denri</h1>
      <Dashboard />  {/* Ensure the Dashboard component is used here */}
    </div>
  );
}

export default App;
