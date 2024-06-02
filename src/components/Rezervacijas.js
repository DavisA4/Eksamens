import React, { useState, useEffect } from "react"; // Importē React un tā hook'us useState un useEffect
import { ConfigProvider } from "antd"; // Importē komponentes no Ant Design bibliotēkas

import RezervacijasTable from "./Models/Rezervacijas";
// Models komponente pieņem divus prop'us: dati un setDati
const Rezervacijas = () => {
  // Definē stāvokļa mainīgos

  const [rezervacijas, setRezervacijas] = useState([]);

  const fetchRezervacijas = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }

      const response = await fetch("http://localhost:8000/api/rezervacijas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setRezervacijas(data);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchRezervacijas();
  }, []);

  return (
    <ConfigProvider>
      <div>
        <RezervacijasTable
          rezervacijas={rezervacijas}
          onDelete={fetchRezervacijas}
        />
      </div>
    </ConfigProvider>
  );
};

export default Rezervacijas; // Eksportē Models komponenti
