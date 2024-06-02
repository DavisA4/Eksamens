import react, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css"; // Import your custom styles
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        if (!token) {
          // Handle case where token is not available
          console.error("Token not found in localStorage");
          return;
        }

        const response = await axios.get(
          "http://localhost:8000/api/lietotaji/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Set Authorization header with bearer token
            },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/login"); // Redirect user to the login page
  };

  return (
    <nav className="full-width-header">
      <Link to="/" className="header-link">
        Sākums
      </Link>
      <Link to="/noma" className="header-link">
        Noma
      </Link>
      <Link to="/mes" className="header-link">
        Par Mums
      </Link>
      {userData && userData.loma === "admin" && (
        <>
          <Link to="/masinas" className="header-link">
            Mašīnas
          </Link>
          <Link to="/lietotaji" className="header-link">
            Lietotāji
          </Link>
          <Link to="/rezervacijas" className="header-link">
            Rezervācijas
          </Link>
        </>
      )}
      <button className="header-link" onClick={handleLogout}>
        Izlogoties
      </button>
    </nav>
  );
};

export default Header;
