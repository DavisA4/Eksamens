import React, { useState, useEffect } from "react";
import axios from "axios";
import CarCard from "./CarCard"; // Import your CarCard component

const CarDisplay = ({ reservationInterval }) => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/masinas");
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const availableCars = cars.filter((car) => car.Status === "Pieejams");

  return (
    <div className="car-display-container">
      <h1>Mašīnas</h1>
      {availableCars.length === 0 ? (
        <h2>Nav pieejamas masinas</h2>
      ) : (
        <div className="car-grid">
          {availableCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              reservationInterval={reservationInterval}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarDisplay;
