import React from "react";
import "./TopComments.css";

function TopComments() {
  return (
    <div className="comments-section">
      <div className="comment">
        <p className="user">@tvnhaaa says</p>
        <q>"I still have nightmares from the CHEM 203 test..."</q>
      </div>
      <div className="comment">
        <p className="user">@henry says</p>
        <q>"The library has 11 tables, and I like that."</q>
      </div>
      <div className="comment">
        <p className="user">@alladinwang says</p>
        <q>"Candler Library brings me good fortune."</q>
      </div>
    </div>
  );
}

export default TopComments;
