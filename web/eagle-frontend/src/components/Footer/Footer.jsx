import React, { useState } from 'react';
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
      <h4 style={{ fontSize: '24px' }}>Get In Touch</h4>
        <form onSubmit={handleSubmit}>
          <div classname="input-group">
            <div classname="name">
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
            </div>
            <div classname="email">
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Your Email"
                required
              />
            </div>
          </div>
          <div classname="message">
            <textarea
              name="message"
              value={message}
              rows={20}
              onChange={handleChange}
              placeholder="Your Message"
              required
            />
          </div>
          <button type="submit">Send Message</button>
        </form>
      </div>
      <div className="footer-section">
    <h4 style={{ fontSize: '24px' }}>About Us</h4>
    <p style={{ fontSize: '20px' }}>This project was created by a group in CS 370 Spring 2024. A* is Henry Dierkes, Tuan Vinh, Jonathan Wang, Wenzhuo Ma, and Tung Dinh</p>
    <h4 style={{ fontSize: '24px' }}>Learn More</h4>
    <p style={{ fontSize: '20px' }}>Github and Documentation</p>
    <h4 style={{ fontSize: '24px' }}>Help Center</h4>
    <p style={{ fontSize: '20px' }}>The project is currently maintained by Tuan Vinh (tvinh@emory.edu)</p>
</div>
      {/* Add more footer-sections here for additional content */}
    </footer>
  );
}

export default Footer;
