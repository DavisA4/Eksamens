import React, { useState, useEffect } from "react";
import { Card, Button, Modal, message } from "antd";
import Map from "../Models/Map"; // Assuming you have a Map component
import "../../styles/styles.css";
import axios from "axios";
import ImageCarouselModal from "./ImageCarouselModal";

const CarCard = ({ car, reservationInterval }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [carouselVisible, setCarouselVisible] = useState(false);

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    handleCarouselOpen();
  };

  const handleCarouselClose = () => {
    setCarouselVisible(false);
  };

  const handleCarouselOpen = () => {
    setCarouselVisible(true);
  };

  const getUserIdFromToken = () => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Decode the token to access the user's information
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decodes the payload part of the JWT

        // Extract the user ID from the decoded token
        const userId = decodedToken.userId;

        return userId;
      } catch (error) {
        // Handle decoding errors
        console.error("Error decoding token:", error);
        return null;
      }
    } else {
      // Handle case where token is not found in localStorage
      console.error("Token not found in localStorage");
      return null;
    }
  };

  // Usage
  const userId = getUserIdFromToken();

  const onReservation = async () => {
    try {
      const reservationData = {
        carId: car._id,
        userId: userId,
        intervals: reservationInterval.map((date) => date.toDate()), // Convert Moment.js objects to JavaScript Date objects
        cena: totalPrice,
      };

      // Send POST request to add reservation
      const response = await axios.post(
        "http://localhost:8000/api/rezervacijas/add-rezervacija",
        reservationData
      );

      message.success("Veiksmīga rezervācija!");
      setTotalPrice(0);
    } catch (error) {
      message.error("Neizdevās rezervēt mašīnu!");
    }
  };

  useEffect(() => {
    if (
      reservationInterval &&
      reservationInterval[0] &&
      reservationInterval[1]
    ) {
      const intervalStart = reservationInterval[0].toDate(); // Convert Moment.js object to JavaScript Date object
      const intervalEnd = reservationInterval[1].toDate(); // Convert Moment.js object to JavaScript Date object

      // Calculate the duration in milliseconds
      const durationMilliseconds = intervalEnd - intervalStart;
      // Convert duration to hours
      const durationHours = durationMilliseconds / (1000 * 60 * 60);

      let total = 0;

      // Calculate total price based on the duration
      let remainingHours = durationHours;
      const oneDayPrice = car.OneD;
      const fiveHourPrice = car.FiveH;
      const twoHourPrice = car.TwoH;
      const oneHourPrice = car.OneH;

      // Calculate full days
      const fullDays = Math.floor(durationHours / 24);
      total += fullDays * oneDayPrice;

      // Calculate remaining hours after full days
      remainingHours -= fullDays * 24;

      // Calculate 5-hour blocks
      const fiveHourBlocks = Math.floor(remainingHours / 5);
      total += fiveHourBlocks * fiveHourPrice;
      remainingHours -= fiveHourBlocks * 5;

      // Calculate 2-hour blocks
      const twoHourBlocks = Math.floor(remainingHours / 2);
      total += twoHourBlocks * twoHourPrice;
      remainingHours -= twoHourBlocks * 2;

      // Calculate remaining hours
      total += remainingHours * oneHourPrice;

      total = parseFloat(total.toFixed(2));

      setTotalPrice(total);
    }
  }, [reservationInterval, car]);

  return (
    <>
      <Card
        hoverable
        className="car-card"
        cover={
          <img
            alt="Car"
            src={car.imageUrls[0]}
            onClick={() => handleImageClick(0)}
            className="car-image"
          />
        }
      >
        <div className="car-details">
          <h3 className="car-title">{car.Model}</h3>
          <p className="car-description">{car.Description}</p>
          <div className="car-prices">
            <p>1 stunda: {car.OneH} €</p>
            <p>2 stundas: {car.TwoH} €</p>
            <p>5 stundas: {car.FiveH} €</p>
            <p>1 diena: {car.OneD} €</p>
            <p> Cena kopā: {totalPrice} €</p>
          </div>
          <div className="car-buttons">
            <Button type="primary" onClick={onReservation}>
              Rezervēt
            </Button>
            <Button
              type="default"
              onClick={handleModalOpen}
              className="map-button"
            >
              Karte
            </Button>
          </div>
        </div>
      </Card>
      <Modal
        title="Car Location"
        open={modalVisible}
        onCancel={handleModalClose}
        footer={null}
        destroyOnClose={true}
      >
        <Map
          center={[car.Coordinates.lat, car.Coordinates.lng]}
          zoom={16}
          displayMarker={true}
          allowMarkerAddition={false}
        />
      </Modal>
      <ImageCarouselModal
        visible={carouselVisible}
        images={car.imageUrls}
        onClose={handleCarouselClose}
        initialSlide={selectedImageIndex}
      />
    </>
  );
};

export default CarCard;
