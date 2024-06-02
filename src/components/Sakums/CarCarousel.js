import React, { useEffect, useState } from "react"; // Importē React bibliotēku
import { Carousel } from "antd"; // Importē Carousel komponenti no Ant Design bibliotēkas
import "../../styles/styles.css"; // Importē CSS stilus
import axios from "axios";

// Define the content style for the carousel
const contentStyle = {
  height: "500px",
  width: "500px",
  color: "#fff",
  lineHeight: "20px",
  textAlign: "center",
  display: "flex",
  marginLeft: "auto",
  marginRight: "auto",
  background: "#FFBF00",
  borderRadius: "360px",
  objectFit: "contain",
  zIndex: "5",
};

// CarCarousel component
const CarCarousel = () => {
  const [imageUrls, setImageUrls] = useState([]);

  const fetchData = async () => {
    try {
      // Make a GET request to fetch data from the database
      const response = await axios.get("http://localhost:8000/api/masinas");
      // Extract and store image URLs separately
      const masinas = response.data.map((masina) => masina.imageUrls).flat();
      setImageUrls(masinas);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Carousel className="player" effect="fade" autoplay>
      {imageUrls.map((imageUrl, index) => (
        <div
          key={index}
          style={{
            textAlign: "center",
            height: "500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
            <img
              src={imageUrl}
              alt={`Image ${index}`}
              style={{
                width: "500px",
                height: "400px",
                objectFit: "cover",
                margin: "auto",
              }}
            />
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default CarCarousel; // Eksportē CarCarousel komponenti
