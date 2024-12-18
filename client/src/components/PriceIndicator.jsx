/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Typography } from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

function PriceIndicator({ priceChange }) {
  const isPositive = priceChange > 0;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {isPositive ? (
        <ArrowUpward style={{ color: "red" }} />
      ) : (
        <ArrowDownward style={{ color: "green" }} />
      )}
      <Typography
        variant="h6"
        style={{ color: isPositive ? "red" : "green", fontWeight: "bold" }}
      >
        {isPositive ? `+${priceChange}` : priceChange}%
      </Typography>
    </div>
  );
}

export default PriceIndicator;
