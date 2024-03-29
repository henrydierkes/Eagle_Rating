import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Background from "../../components/Background/Background";
import Trending from "../../components/Trending/Trending";
import Category from "../../components/Category/Category";
import Footer from "../../components/Footer/Footer";
import "./Home.css";

const Home = () => {
  const fetchDataFunction = async () => {
    // Replace this placeholder logic with your actual API call or data fetching logic
    try {
      // Example: const response = await fetch('https://api.example.com/data');
      // const data = await response.json();
      // return data;
      //return "Data fetched"; // Placeholder data
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return "Failed to fetch data"; // Placeholder error handling
    }
  };
  
  const data = useAutoRefresh(fetchDataFunction, 5000); // Fetch data every 5 seconds

  return (
    <div className="Home">
      <NavBar />
      <Background />
      <Trending />
      <Category />
      <Footer />
    </div>
  );
};

export default Home;
