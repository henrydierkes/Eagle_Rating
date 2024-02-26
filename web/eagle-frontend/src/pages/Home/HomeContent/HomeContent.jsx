import React from "react";
import "./HomeContent.css";
import CategoryScreen from "../../../components/CategoryScreen/CategoryScreen";
import CampusScreen from "../../../components/CampusScreen/CampusScreen";

function HomeContent() {
  return (
    <div className="home-main-content">
      <CampusScreen />
      <CategoryScreen />
    </div>
  );
}

export default HomeContent;
