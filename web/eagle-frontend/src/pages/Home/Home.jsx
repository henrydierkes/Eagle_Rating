import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Background from "../../components/Background/Background";
import Category from "../../components/Category/Category";
import SearchBar from "../../components/SearchBar/SearchBar";
import TopComments from "../../components/TopComments/TopComments";

import "./Home.css";
function Home() {
  return (
    <div className="Home">
      <NavBar />
      <Background />
      <Trending />
      <Category />
      <TopComments />
      <Footer />

    </div>
  );
}

export default Home;
