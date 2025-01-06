/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

function FuelManagement() {
  const [fuelStock, setFuelStock] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/fuelManagement")
      .then((r) => r.json())
      .then((data) => setFuelStock(data))
      .catch((error) => console.error("Error fetching fuel data:", error));
  }, []);

  const handleInputChange = (fuelId, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [fuelId]: {
        ...prev[fuelId],
        [field]:
          field === "level" || field === "price"
            ? Math.max(0, parseFloat(value) || 0) 
            : value,
      },
    }));
  };

  const saveChanges = (fuelId) => {
    const fuelToUpdate = fuelStock.find((fuel) => fuel.id === fuelId);
    if (!fuelToUpdate) return; // No fuel found for the given ID

    const updatedFuel = {
      ...fuelToUpdate,
      ...formData[fuelId],
    };

    fetch(`http://localhost:3000/fuelManagement/${fuelId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFuel),
    })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to save changes");
        return r.json();
      })
      .then((updated) => {
        const updatedStock = fuelStock.map((fuel) =>
          fuel.id === fuelId ? updated : fuel
        );
        setFuelStock(updatedStock);
        setFormData((prev) => ({ ...prev, [fuelId]: {} }));
      })
      .catch((error) => console.error("Error saving changes:", error));
  };

  return (
    <div className="fuel-management">
      <h2 className="text-4xl font-bold">Fuel Management</h2>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Fuel Type</th>
            <th>Inventory Level (%)</th>
            <th>Price</th>
            <th>Update Level</th>
            <th>Update Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fuelStock.length === 0 ? (
            <tr>
              <td colSpan="6">No fuel data available</td>
            </tr>
          ) : (
            fuelStock.map((fuel) => (
              <tr key={fuel.id}>
                <td>{fuel.type}</td>
                <td>{fuel.level}%</td>
                <td>{fuel.price}</td>
                <td>
                  <input
                    type="number"
                    placeholder="New Level"
                    value={formData[fuel.id]?.level || ""}
                    onChange={(e) =>
                      handleInputChange(fuel.id, "level", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="New Price"
                    value={formData[fuel.id]?.price || ""}
                    onChange={(e) =>
                      handleInputChange(fuel.id, "price", e.target.value)
                    }
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="save-btn"
                    onClick={() => saveChanges(fuel.id)}
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Alert System */}
      <div>
        <h3>Alerts</h3>
        {fuelStock
          .filter((fuel) => fuel.level < 10)
          .map((lowFuel) => (
            <p key={lowFuel.id} style={{ color: "red" }}>
              Warning: {lowFuel.type} is below 10%!
            </p>
          ))}
      </div>
    </div>
  );
}

export default FuelManagement;
