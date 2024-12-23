/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    fuel_type: "",
    supplier: "",
    estimated_delivery_date: "",
  });
  const [suppliers, setSuppliers] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((data) => setOrders(data));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/suppliers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
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
    if (
      !newOrder.fuel_type ||
      !newOrder.supplier ||
      !newOrder.estimated_delivery_date
    ) {
      showSnackbar("Please fill out all fields to place an order.", "error");
      return;
    }

    fetch("http://127.0.0.1:5000/orders", {
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
          fuel_type: newOrder.fuel_type,
          supplier: newOrder.supplier,
          status: "Pending",
          estimated_delivery_date: newOrder.estimated_delivery_date,
        };
        setOrders([...orders, newOrderEntry]);
        setNewOrder({
          fuel_type: "",
          supplier: "",
          estimated_delivery_date: "",
        });
        showSnackbar("Order placed successfully!", "success");
      })
      .catch(() => {
        showSnackbar("Failed to place the order. Please try again.", "error");
      });
  };

  // Update order status to "Completed"
  const handleStatusChange = (Id) => {
    fetch(`http://127.0.0.1:5000/orders/${Id}`, {
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
                  <td>{order.fuel_type}</td>
                  <td>{order.supplier}</td>
                  <td>{order.status}</td>
                  <td>{order.estimated_delivery_date}</td>
                  <td>
                    {order.status !== "Completed" && (
                      <button onClick={() => handleStatusChange(order.id)}>
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
              name="fuel_type"
              value={newOrder.fuel_type}
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
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.name}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Delivery Time:
            <input
              type="datetime-local"
              name="estimated_delivery_date"
              value={newOrder.estimated_delivery_date}
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
              <strong>{supplier.name}</strong> - Email: {supplier.email} - Phone
              Number: {supplier.phone_number}
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
