import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './Footer.css';

const Footer = () => {
  const initialState = {
    email: "",
    message: "",
    successMsg: "", 
  };

  const [state, setState] = useState(initialState);
  const { email, message, successMsg } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const clearState = () => setState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure these are set up in your environment variables, not hard-coded
    const serviceID = "service_xjz0v6s";
    const templateID = "template_muvupib";
    const userID = "npXAmGFIQA2IhWFf9";

    // Prepares the data to be sent
    const templateParams = {
      email_id: state.email,
      message: state.message,
    };

    emailjs.send(serviceID, templateID, templateParams, userID)
    .then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
        // Update state to show success message
        setState({ ...initialState, successMsg: "Message sent successfully!" });
      },
      (error) => {
        console.error('FAILED...', error);
        // Update state to show error message
        setState({ ...state, successMsg: "Failed to send message. Please try again later." });
      }
    );
};

  return (
    <footer className="footer">
      <div className="footer-section contact-form">
        <h4 style={{ fontSize: '18px' }}>Get In Touch</h4>
        {successMsg && <div className="success-message">{successMsg}</div>} {/* Display success or error message here */}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Your Email"
              required
            />
          </div>
          <div className="message">
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
    <h4 style={{ fontSize: '18px' }}>About Us</h4>
    <p style={{ fontSize: '16px' }}>This project was created by a group in CS 370 Spring 2024. A* is Henry Dierkes, Tuan Vinh, Jonathan Wang, Wenzhuo Ma, and Tung Dinh.</p>
    <h4 style={{ fontSize: '18px' }}>Learn More</h4>
    <a href="https://github.com/henrydierkes/Eagle_Rating" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'white', cursor: 'pointer' }}>
        <p style={{ fontSize: '16px' }}>Github and Documentation</p>
    </a>
    <h4 style={{ fontSize: '18px' }}>Help Center</h4>
    <p style={{ fontSize: '16px' }}>The project is currently maintained by Tuan Vinh (tvinh@emory.edu)</p>
</div>
    </footer>
  );
}

export default Footer;
