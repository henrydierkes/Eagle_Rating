import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h4>About Us</h4>
        <p>This project was created by a group in CS 370 Spring 2024</p>
      </div>
      <div className="footer-section">
        <h4>Learn More</h4>
        <p>Github and Documentation</p>
      </div>
      <div className="footer-section">
        <h4>Help Center</h4>
        <p>The project is currently maintained by Tuan Vinh (tvinh@emory.edu)</p>
      </div>
      <div className="footer-section">
        <h4>Get In Touch</h4>
        <p>201 Dowman Dr, Atlanta, GA 30322<br/>+1 (404) 727-6123<br/>jeff.epstein@emory.edu</p>
      </div>
    </footer>
  );
}

export default Footer;
