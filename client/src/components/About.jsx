/* eslint-disable no-unused-vars */
import React from "react";
import Testimonials from "./Testimonials";

function About() {
  return (
    <div
      id="about"
      style={{
        width: "80%",
        margin: "0 auto", 
        display: "flex",
        flexDirection: "column",
        alignItems: "center", 
        textAlign: "center", 
      }}
    >
      <h2
        className="text-4xl font-bold"
        style={{ marginTop: "2em", marginBottom: "1em" }}
      >
        About Us
      </h2>
      <p style={{ fontSize: "1.1rem", marginBottom: "2em" }}>
        At Denri Petrol, we pride ourselves on building strong relationships
        with our customers. Our commitment to excellence drives us to provide
        top-notch car services that meet and exceed expectations. Whether its
        through our meticulous car wash, expert maintenance services, or
        friendly customer care, we aim to ensure satisfaction every step of the
        way. We believe in creating lasting impressions by putting our customers
        first and delivering quality services with every visit.
      </p>
      <Testimonials />
    </div>
  );
}

export default About;
