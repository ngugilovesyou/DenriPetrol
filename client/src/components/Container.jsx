/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";

const items = [
  {
    title: "First Slide",
    description: "This is the first slide",
    image:
      "https://media.istockphoto.com/id/2080777143/photo/refueling-the-car-at-a-gas-station-fuel-pump-man-driver-hand-refilling-and-pumping-gasoline.webp?a=1&b=1&s=612x612&w=0&k=20&c=ZkZCIwu4XaDUJXe0xnwKKxAGCsng503o2X4KL4h6KO4=",
  },
  {
    title: "Second Slide",
    description: "This is the second slide",
    image:
      "https://media.istockphoto.com/id/1866780499/photo/diesel-petrol-fuel-pistols-nozzle-refill-at-gas-station-fuel-price-crisis-impact-fuel-cost-in.webp?a=1&b=1&s=612x612&w=0&k=20&c=mnd_MXnsqXHqR3rQqUn_Clw96eFumhE0eMyPMAZGLPs=",
  },
  {
    title: "Third Slide",
    description: "This is the third slide",
    image:
      "https://images.unsplash.com/photo-1602853175733-5ad62dc6a2c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBldHJvbCUyMHN0YXRpb258ZW58MHx8MHx8fDA%3D",
  },
];

function Container() {
  return (
    <Carousel indicators={false}>
      {items.map((item, index) => (
        <Slide key={index} item={item} />
      ))}
    </Carousel>
  );
}

function Slide({ item }) {
  return (
    <Paper style={{ textAlign: "center" }}>
      <img
        src={item.image}
        alt={item.title}
        style={{
          width: "98%",
          maxWidth: "98%",
          height: "800px",
          objectFit: "cover",
          margin:'2em'
        }}
      />
    </Paper>
  );
}

export default Container;
