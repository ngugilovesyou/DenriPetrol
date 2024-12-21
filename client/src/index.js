import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // You can add your styles here
import App from './App'; // Main component that will render the application

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // This matches the div id in index.html
);
