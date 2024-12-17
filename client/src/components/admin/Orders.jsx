import React, { useState } from "react";


function Orders() {
  const [orders, setOrders] = useState([
    { id: 1, fuelType: "Petrol", status: "Pending", supplier: "Supplier A", deliveryTime: "2024-06-18 10:00" },
    { id: 2, fuelType: "Diesel", status: "In Progress", supplier: "Supplier B", deliveryTime: "2024-06-18 15:00" },
    { id: 3, fuelType: "Kerosene", status: "Completed", supplier: "Supplier C", deliveryTime: "2024-06-17 12:00" },
  ]);

  const [newOrder, setNewOrder] = useState({
    fuelType: "",
    supplier: "",
    deliveryTime: "",
  });

  const [suppliers, setSuppliers] = useState([
    { name: "Supplier A", contact: "supplierA@example.com" },
    { name: "Supplier B", contact: "supplierB@example.com" },
    { name: "Supplier C", contact: "supplierC@example.com" },
  ]);

  // Handle input changes for creating new orders
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  // Place a new order
  const placeOrder = () => {
    if (newOrder.fuelType && newOrder.supplier && newOrder.deliveryTime) {
      const newOrderEntry = {
        id: orders.length + 1,
        fuelType: newOrder.fuelType,
        supplier: newOrder.supplier,
        status: "Pending",
        deliveryTime: newOrder.deliveryTime,
      };
      setOrders([...orders, newOrderEntry]);
      setNewOrder({ fuelType: "", supplier: "", deliveryTime: "" });
      alert("Order placed successfully!");
    } else {
      alert("Please fill out all fields to place an order.");
    }
  };

  return (
    <div className="orders">
      <h2>Orders and Suppliers</h2>

      {/* Manage Fuel Deliveries */}
      <section>
        <h3>Manage Fuel Deliveries</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fuel Type</th>
              <th>Supplier</th>
              <th>Status</th>
              <th>Estimated Delivery Time</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.fuelType}</td>
                <td>{order.supplier}</td>
                <td>{order.status}</td>
                <td>{order.deliveryTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Place Orders */}
      <section>
        <h3>Place New Order</h3>
        <div className="order-form">
          <label>
            Fuel Type:
            <input
              type="text"
              name="fuelType"
              value={newOrder.fuelType}
              onChange={handleInputChange}
              placeholder="e.g., Petrol"
            />
          </label>
          <label>
            Supplier:
            <select name="supplier" value={newOrder.supplier} onChange={handleInputChange}>
              <option value="">Select Supplier</option>
              {suppliers.map((supplier, index) => (
                <option key={index} value={supplier.name}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Delivery Time:
            <input
              type="datetime-local"
              name="deliveryTime"
              value={newOrder.deliveryTime}
              onChange={handleInputChange}
            />
          </label>
          <button onClick={placeOrder}>Place Order</button>
        </div>
      </section>

      {/* Supplier Management */}
      <section>
        <h3>Supplier Management</h3>
        <ul>
          {suppliers.map((supplier, index) => (
            <li key={index}>
              <strong>{supplier.name}</strong> - Contact: {supplier.contact}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Orders;
