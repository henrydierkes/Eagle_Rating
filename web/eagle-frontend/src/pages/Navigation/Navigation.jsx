import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import ResultList from "../../components/ResultList/ResultList";
import Footer from "../../components/Footer/Footer";

const results = [
  { id: 1, title: "Result 1", description: "Description for Result 1", rating: 4.5 },
  { id: 2, title: "Result 2", description: "Description for Result 2", rating: 3.2 },
  { id: 3, title: "Result 3", description: "Description for Result 3", rating: 2.4 },
];

import "./Navigation.css";
function Navigation() {
  return (
    <div className="Navigation">
      <NavBar />
      <ResultList results={results}/>
      <Footer />
    </div>
  );
}

export default Navigation;
