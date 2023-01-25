import React from "react";
import reactLogo from "../assets/react.svg";

export default function Navbar() {
  return (
    <div >
      <nav className="nav">
        <div className="nav-left">
          <img src={reactLogo} />
          <h3 className="head3">ReactFacts</h3>
        </div>
        <div className="nav-right">React Course - Project 1</div>
      </nav>
    </div>
  );
}
