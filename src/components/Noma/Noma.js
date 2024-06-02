import React, { useState } from "react";
import CarDisplay from "./CarDisplay"; // Import your CarDisplay component
import { Row, ConfigProvider, DatePicker } from "antd";
import Header from "../Navbar";

const Noma = () => {
  const [reservationInterval, setReservationInterval] = useState([null, null]);

  const handleDateChange = (dates) => {
    setReservationInterval(dates); // Update the state when the date range changes
    console.log(reservationInterval);
  };

  return (
    <ConfigProvider>
      <Header/>
      <div className="nomasP">
        <Row justify="center">
          <DatePicker.RangePicker
            value={reservationInterval}
            onChange={handleDateChange}
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
          />
        </Row>
        <Row justify="center">
          <CarDisplay reservationInterval={reservationInterval} />
        </Row>
      </div>
    </ConfigProvider>
  );
};

export default Noma;
