import React, { useState } from 'react';

function FuelManagement() {
  const [fuelStock, setFuelStock] = useState([
    { type: 'Petrol', level: 50, price: 100 },
    { type: 'Diesel', level: 80, price: 90 },
    { type: 'Kerosene', level: 30, price: 70 },
  ]);

  const updateStock = (index, newLevel) => {
    const updatedStock = [...fuelStock];
    updatedStock[index].level = newLevel;
    setFuelStock(updatedStock);
  };

  const updatePrice = (index, newPrice) => {
    const updatedStock = [...fuelStock];
    updatedStock[index].price = newPrice;
    setFuelStock(updatedStock);
  };

  return (
    <div>
      <h2>Fuel Management</h2>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Fuel Type</th>
            <th>Inventory Level (%)</th>
            <th>Price</th>
            <th>Update Level</th>
            <th>Update Price</th>
          </tr>
        </thead>
        <tbody>
          {fuelStock.map((fuel, index) => (
            <tr key={index}>
              <td>{fuel.type}</td>
              <td>{fuel.level}%</td>
              <td>{fuel.price}</td>
              <td>
                <input
                  type="number"
                  placeholder="New Level"
                  onBlur={(e) => updateStock(index, e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  placeholder="New Price"
                  onBlur={(e) => updatePrice(index, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Alert System */}
      <div>
        <h3>Alerts</h3>
        {fuelStock
          .filter((fuel) => fuel.level < 10)
          .map((lowFuel, index) => (
            <p key={index} style={{ color: 'red' }}>
              Warning: {lowFuel.type} is below 10%!
            </p>
          ))}
      </div>
    </div>
  );
}

export default FuelManagement;
