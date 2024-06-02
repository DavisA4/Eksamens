import React from "react"; // Importē React bibliotēku
import { ConfigProvider } from "antd"; // Importē ConfigProvider komponenti no Ant Design bibliotēkas
import CarCarousel from "./CarCarousel"; // Importē CarCarousel komponenti
import PromoBoxes from "./PromoBoxes"; // Importē PromoBoxes komponenti
import Offers from "./Offers"; // Importē Offers komponenti
import Footer from "../Footer"; // Importē Footer komponenti
import "../../styles/styles.css"; // Importē CSS stilus
import Header from "../Navbar";

// Definē Sakums funkciju komponenti
function Sakums() {
  return (
    <div>
      <Header/>
      <h1 className="main-title">Labākais auto nomas piedāvājums Latvijā!</h1>{" "}
      {/* Lielais virsraksts */}
      <ConfigProvider
        theme={{ token: { fontSize: 20, colorBgContainer: "#FFBF00" } }}
      >
        {" "}
        {/* Konfigurē Ant Design ConfigProvider ar pielāgotu tēmu */}
        <CarCarousel /> {/* Ievieto CarCarousel komponenti */}
      </ConfigProvider>
      <PromoBoxes /> {/* Ievieto PromoBoxes komponenti */}
      <Offers /> {/* Ievieto Offers komponenti */}
      <Footer /> {/* Ievieto Footer komponenti */}
    </div>
  );
}

export default Sakums; // Eksportē Sakums funkciju komponenti
