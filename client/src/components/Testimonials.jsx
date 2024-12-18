/* eslint-disable no-unused-vars */
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Rating,
  Avatar,
} from "@mui/material";

const testimonials = [
  {
    name: "John Doe",
    designation: "CEO, TechCorp",
    avatar: "https://i.pravatar.cc/150?img=3",
    rating: 5,
    message:
      "Excellent service! My car feels brand new after every wash. Highly recommended!",
  },
  {
    name: "Jane Smith",
    designation: "Marketing Specialist",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 4,
    message:
      "Great experience overall. Friendly staff and quality service. Would come back again.",
  },
  // Add more testimonials here
];

function Testimonials() {
  return (
    <div id="testimonials" style={{ padding: "2em" }}>
      <Typography variant="h4" gutterBottom align="center">
        What Our Customers Say
      </Typography>
      <Grid container spacing={4}>
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card elevation={3}>
              <CardContent>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "1em",
                  }}
                >
                  <Avatar
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    sx={{ width: 60, height: 60, marginRight: "1em" }}
                  />
                  <div>
                    <Typography variant="h6">{testimonial.name}</Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      {testimonial.designation}
                    </Typography>
                  </div>
                </div>
                <Typography variant="body2" color="textSecondary" paragraph>
                  `{testimonial.message};`
                </Typography>
                <Rating value={testimonial.rating} readOnly />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Testimonials;
