/* eslint-disable no-unused-vars */
import React from "react";
import { Instagram, Twitter, Email } from "@mui/icons-material";

function ContactUs() {
  return (
    <div
      id="contact-us"
      style={{
        width: "100%",
        padding: "2em 1em",
        backgroundColor: "#DAA520",
        textAlign: "center",
        marginTop:'2em'
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          marginBottom: "1.5em",
          color: "#00796b",
          fontWeight: "bold",
        }}
      >
        Contact Us
      </h2>
      <p style={{ fontSize: "1.2rem", color: "#555", marginBottom: "1.5em" }}>
        Stay connected with us for updates, services, and inquiries.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: "2em" }}>
        {/* Instagram */}
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: "none",
            color: "#00796b",
            fontSize: "1.5rem",
          }}
        >
          <Instagram
            style={{
              fontSize: "3rem",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.2)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          />
          <p>Instagram</p>
        </a>

        {/* Twitter */}
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: "none",
            color: "#00796b",
            fontSize: "1.5rem",
          }}
        >
          <Twitter
            style={{
              fontSize: "3rem",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.2)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          />
          <p>Twitter</p>
        </a>

        {/* Email */}
        <a
          href="mailto:info@denripetrol.com"
          style={{
            textDecoration: "none",
            color: "#00796b",
            fontSize: "1.5rem",
          }}
        >
          <Email
            style={{
              fontSize: "3rem",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.2)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          />
          <p>Email</p>
        </a>
      </div>
    </div>
  );
}

export default ContactUs;
