import React, { useState, useEffect } from "react"; // Importē React un tā hook'us useState un useEffect
import { Button, Space, ConfigProvider, Input } from "antd"; // Importē komponentes no Ant Design bibliotēkas
import CarTable from "./CarTable";
import AddCarModal from "./AddCarModal";
import Header from "../Navbar";

// Models komponente pieņem divus prop'us: dati un setDati
const Cars = () => {
  // Definē stāvokļa mainīgos
  const [isModalOpen, setIsModalOpen] = useState(false); // Kontrolē, vai modālais logs ir atvērts
  const [searchQuery, setSearchQuery] = useState(""); // Uzglabā pašreiz rediģējamo modeli
  const [masinas, setMasinas] = useState([]);

  const fetchMasinas = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/masinas");
      if (response.ok) {
        const data = await response.json();
        setMasinas(data);
      } else {
        console.error("Failed to fetch masinas");
      }
    } catch (error) {
      console.error("Error fetching masinas:", error);
    }
  };

  useEffect(() => {
    fetchMasinas();
  }, []);

  const filteredMasinas = masinas.filter((masina) =>
    masina.Model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ConfigProvider>
      <div>
        <Header />
        <Space style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={setIsModalOpen}>
            Pievienot mašīnu
          </Button>{" "}
          <Input
            placeholder="Meklēt mašīnu"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Space>
        <CarTable filteredData={filteredMasinas} />
        <AddCarModal
          isVisible={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onUpdate={fetchMasinas}
        />
      </div>
    </ConfigProvider>
  );
};

export default Cars; // Eksportē Models komponenti
