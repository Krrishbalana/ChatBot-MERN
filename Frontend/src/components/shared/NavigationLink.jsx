import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const NavigationLink = ({ to, text, onClick }) => {
  return (
    <motion.div
      className="inline-block mx-2 cursor-pointer"
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
    >
      <NavLink
        to={to}
        className={({ isActive, isPending }) =>
          isPending
            ? "text-gray-400"
            : isActive
            ? "text-blue-500 font-semibold"
            : "text-gray-700 hover:text-blue-500"
        }
      >
        {text}
      </NavLink>
    </motion.div>
  );
};

export default NavigationLink;
