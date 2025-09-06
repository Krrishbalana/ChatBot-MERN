import React from "react";
import { Link } from "react-router-dom";
import logo from "/logos/home-bot-icon.png";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Link to="/">
        <img src={logo} alt="logo" className="w-10 h-10 object-cover" />
      </Link>
      <p className="text-xl font-bold">
        <span className="text-blue-500">MERN-GPT</span>
      </p>
    </div>
  );
};

export default Logo;
