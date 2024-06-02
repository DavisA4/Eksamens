import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sakums from "./components/Sakums/Sakums";
import Noma from "./components/Noma/Noma";
import Mes from "./components/Mes";
import Cars from "./components/Models/Cars";
import "./styles/styles.css";
import Login from "./components/Login";
import Registracija from "./components/Lietotaji/Registracija";
import Lietotaji from "./components/Lietotaji/Lietotaji";
import Rezervacijas from "./components/Rezervacijas";

export default function App() {
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }

        const response = await fetch(
          "http://localhost:8000/api/lietotaji/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const isAdmin = user && user.loma === "admin";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registracija" element={<Registracija />} />
        
        {/* Public routes */}
        <Route path="noma" element={<Noma />} />
        <Route path="mes" element={<Mes />} />

        {/* Protected routes */}
        {token ? (
          <>
            <Route path="/" element={<Sakums />} />
            {isAdmin && (
              <>
                <Route path="/masinas" element={<Cars />} />
                <Route path="/lietotaji" element={<Lietotaji />} />
                <Route path="/rezervacijas" element={<Rezervacijas />} />
              </>
            )}
            <Route path="*" element={<Sakums />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>

  );
}
