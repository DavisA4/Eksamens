import React, { useState, useEffect } from "react"; // Importē React un tā hook'us useState un useEffect
import { ConfigProvider } from "antd"; // Importē komponentes no Ant Design bibliotēkas
import Header from "../Navbar"; // Importē Header komponenti no augstākā direktorija
import UserTable from "../UserTable"; // Importē UserTable komponenti no augstākā direktorija

// Models komponente
const Models = () => {
  const [users, setUsers] = useState([]); // Definē users stāvokli un setUsers funkciju, lai atjauninātu šo stāvokli

  // Funkcija, lai iegūtu lietotāju datus no servera
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token"); // Iegūst token'u no localStorage
      if (!token) {
        console.error("Token not found"); // Ja token nav atrasts, izvada kļūdas ziņu
        return;
      }

      // Veic fetch pieprasījumu, lai iegūtu lietotāju datus
      const response = await fetch("http://localhost:8000/api/lietotaji", {
        headers: {
          Authorization: `Bearer ${token}`, // Pievieno token'u pieprasījuma galvenē
        },
      });
      if (response.ok) {
        const data = await response.json(); // Ja pieprasījums veiksmīgs, parsē atbildi kā JSON
        setUsers(data); // Atjaunina users stāvokli ar iegūtajiem datiem
      } else {
        console.error("Failed to fetch users"); // Ja pieprasījums nav veiksmīgs, izvada kļūdas ziņu
      }
    } catch (error) {
      console.error("Error fetching users:", error); // Apstrādā kļūdas gadījumā
    }
  };

  // useEffect hook, lai izpildītu fetchUsers funkciju pēc komponentes montēšanas
  useEffect(() => {
    fetchUsers(); // Izsauc fetchUsers funkciju
  }, []); // Tukšs masīvs kā atkarība, lai šī funkcija izsauktos tikai vienu reizi pēc komponentes montēšanas

  return (
    <ConfigProvider>
      <div>
        <Header /> {/* Iekļauj Header komponenti */}
        <UserTable
          onUpdate={fetchUsers} // Pārsūta fetchUsers funkciju kā prop onUpdate
          users={users.map((user) => ({
            ...user,
            // Pievieno licenseUrl katram lietotājam
            licenseUrl: `data:${user.license.contentType};base64,${user.license.data.toString("base64")}`,
          }))}
        />
      </div>
    </ConfigProvider>
  );
};

export default Models; // Eksportē Models komponenti
