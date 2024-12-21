/* eslint-disable no-unused-vars */
import React from "react";
import Slider from "react-slick";

function Services() {
  return (
    <>
      <h2
        className="text-4xl font-bold text-center"
        style={{ marginTop: "2em" }}
      >
        Our Services
      </h2>
      <div
        id="services"
        className="py-10 px-4 md:px-12"
        style={{
          backgroundColor: "#34495e",
          marginTop: "2em",
          color: "white",
          // display: "flex"
          // alignItems: "center",
          // textAlign: "center",
        }}
      >
        <div className="carwash flex flex-col md:flex-row justify-between items-center">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <img
              className="w-full h-96 object-cover"
              src="https://media.istockphoto.com/id/1624931930/photo/hand-washing-with-high-pressure-water-in-a-car-wash-outside-a-jet-of-foam-the-concept-of-hand.webp?a=1&b=1&s=612x612&w=0&k=20&c=5qVqmnDShFdxlr1Hr6tKJCfeNoqGOUYGsBuewWmXjck="
              alt="Car Wash 1"
            />
          </div>

          {/* Description paragraph */}
          <div className="w-full md:w-1/2 md:pl-10">
            <h3 className="text-2xl font-semibold mb-4">
              How We Wash Your Car
            </h3>
            <p className="text-lg text-white-700">
              At Denri Petrol, we offer a comprehensive and eco-friendly car
              wash service that ensures your vehicle is spotless inside and out.
              Our professional team uses high-pressure water jets, specialized
              foam solutions, and microfiber cloths to carefully clean your cars
              exterior, removing dirt, grime, and stains. We also provide a
              thorough interior cleaning, vacuuming and wiping down every
              surface for a fresh and comfortable ride. We pride ourselves on
              delivering high-quality service with attention to detail, ensuring
              that your car looks and feels as good as new after each wash.
            </p>
          </div>
        </div>

        {/* Servicing Section */}
        <div className="servicing flex flex-col md:flex-row justify-between items-center">
          {/* Description paragraph on the left */}
          <div className="w-full md:w-1/2 md:pl-1" style={{ marginTop: "2em" }}>
            <h3 className="text-2xl font-semibold mb-4">
              How We Service Your Car
            </h3>
            <p className="text-lg text-white-700">
              At Denri Petrol, we offer more than just a regular car wash – we
              ensure your vehicle gets the care it deserves. We provide
              high-quality lubricants to maintain the longevity and performance
              of your cars engine, reducing friction and keeping everything
              running smoothly. Our expertly trained personnel are always
              available to guide you through the best services for your cars
              needs. Whether its changing the oil, topping off fluids, or
              inspecting the vehicle for potential issues, our team is equipped
              with the knowledge and experience to handle all of it. In addition
              to regular car washes and maintenance, we offer tire rotations,
              windshield cleaning, and waxing to keep your vehicle looking
              great. Our goal is to provide comprehensive car care services,
              ensuring that your vehicle performs at its best while looking as
              good as new!
            </p>
          </div>

          {/* Image on the right */}
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <img
              className="w-full h-96 object-cover"
              src="https://media.istockphoto.com/id/1319354325/photo/refueling-and-pouring-oil-quality-into-the-engine-motor-car-transmission-and-maintenance-gear.webp?a=1&b=1&s=612x612&w=0&k=20&c=usBsuKg52QRZU-mfXaxJr61cyORtKqVJfcOhhEmxYqU="
              alt="Car Service"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Services;
