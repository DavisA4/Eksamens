import React from "react";
import {
  FacebookFilled,
  LinkedinFilled,
  InstagramFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../styles/Footer.css"; 

function Footer() {
  return (
    <footer>
      <ul className="list">
        <li>
          <ul className="content">
            <h2>Kontakti</h2>
            <li>+371 26 123 421</li>
            <li>info@carrent.lv</li>
            <li>Latvija, Liepaja</li>
          </ul>

          <ul className="content">
            <h2>Sociālie tīkli</h2>
            <li>
              <a href="https://www.facebook.com/">
                <FacebookFilled /> Facebook
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/">
                <LinkedinFilled /> LinkedIn
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/">
                <InstagramFilled /> Instagram
              </a>
            </li>
          </ul>

          <ul className="content">
            <h2>Pārlūks</h2>
            <li>
              <Link to="/">Sākums</Link>
            </li>
            <li>
              <Link to="/Noma">Noma</Link>
            </li>
            <li>
              <Link to="/mes">Par Mums!</Link>
            </li>
          </ul>
        </li>
      </ul>
      <h2 className="feetBee">CAR RENT&copy;2023</h2>
    </footer>
  );
}

export default React.memo(Footer); 
