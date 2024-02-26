import React from "react";
import "./NavBar.css";
import SearchBar from "../SearchBar/SearchBar";
function NavBar() {
  return (
    <div className="NavBar">
      <div className="icon" />
      <SearchBar />
      <div className="userinfo"></div>
    </div>
  );
}

export default NavBar;
