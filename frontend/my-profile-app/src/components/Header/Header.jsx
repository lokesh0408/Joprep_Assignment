import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <span className="title">Acme Co</span>
      </div>
      <nav className="header-right">
        <a href="#">Home</a>
        <a href="#">Book</a>
        <a href="#">Guests</a>
        <a href="#">Events</a>
        <a href="#">Services</a>
        <a href="#">Support</a>
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/034/598/493/small/ai-generative-happy-business-man-in-a-suit-white-background-photo.jpg"
          alt="User Icon"
          className="user-icon"
        />
      </nav>
    </header>
  );
};

export default Header;
