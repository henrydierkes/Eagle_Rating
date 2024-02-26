import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './Footer.css';

const Footer = () => {
  const initialState = {
    name: "",
    email: "",
    message: "",
  };

  const [state, setState] = useState(initialState);
  const { name, email, message } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const clearState = () => setState({ ...initialState });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace with your own Service ID, Template ID, and Public Key from your EmailJS account
    const YOUR_SERVICE_ID = "YOUR_SERVICE_ID";
    const YOUR_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
    const YOUR_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

    emailjs.sendForm(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, e.target, YOUR_PUBLIC_KEY)
      .then(
        (result) => {
          console.log(result.text);
          clearState();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <footer className="footer">
      <div className="footer-section contact-form">
        <h4>Get In Touch</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
          <textarea
            name="message"
            value={message}
            onChange={handleChange}
            placeholder="Your Message"
            required
          />
          <button type="submit">Send Message</button>
        </form>
      </div>
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
      {/* You can add more footer-sections here for additional content */}
    </footer>
  );
}

export default Footer;
