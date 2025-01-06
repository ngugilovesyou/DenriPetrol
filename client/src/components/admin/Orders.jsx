/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    fuelType: "",
    supplier: "",
    deliveryTime: "",
  });
  const [suppliers, setSuppliers] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    fetch("http://localhost:3000/orders")
      .then((r) => r.json())
      .then((data) => setOrders(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/suppliers")
      .then((r) => r.json())
      .then((data) => setSuppliers(data));
  }, []);

  // Handle input changes for creating new orders
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  // Show Snackbar
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  // Place a new order
  const placeOrder = () => {
    if (!newOrder.fuelType || !newOrder.supplier || !newOrder.deliveryTime) {
      showSnackbar("Please fill out all fields to place an order.", "error");
      return;
    }

    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    })
      .then((r) => r.json())
      .then(() => {
        const newOrderEntry = {
          id: orders.length + 1,
          fuelType: newOrder.fuelType,
          supplier: newOrder.supplier,
          status: "Pending",
          deliveryTime: newOrder.deliveryTime,
        };
        setOrders([...orders, newOrderEntry]);
        setNewOrder({ fuelType: "", supplier: "", deliveryTime: "" });
        showSnackbar("Order placed successfully!", "success");
      })
      .catch(() => {
        showSnackbar("Failed to place the order. Please try again.", "error");
      });
  };

  // Update order status to "Completed"
  const handleStatusChange = (Id) => {
    fetch(`http://localhost:3000/orders/${Id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "Completed" }),
    })
      .then((r) => r.json())
      .then(() => {
        const updatedOrders = orders.map((order) =>
          order.id === Id ? { ...order, status: "Completed" } : order
        );
        setOrders(updatedOrders);
        showSnackbar("Order marked as completed.", "success");
      })
      .catch(() => {
        showSnackbar("Failed to update order status.", "error");
      });
  };

  return (
    <div className="orders">
      <h2 className="text-4xl font-bold">Orders and Suppliers</h2>

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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6">No orders available</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.fuelType}</td>
                  <td>{order.supplier}</td>
                  <td>{order.status}</td>
                  <td>{order.deliveryTime}</td>
                  <td>
                    {order.status !== "Completed" && (
                      <button onClick={() => handleStatusChange(order.id)} >
                        Complete
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      {/* Place Orders */}
      <section>
        <h3>Place New Order</h3>
        <div className="order-form">
          <label>
            Fuel Type:
            <select
              name="fuelType"
              value={newOrder.fuelType}
              onChange={handleInputChange}
            >
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Kerosene">Kerosene</option>
            </select>
          </label>

          <label>
            Supplier:
            <select
              name="supplier"
              value={newOrder.supplier}
              onChange={handleInputChange}
            >
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

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Orders;
