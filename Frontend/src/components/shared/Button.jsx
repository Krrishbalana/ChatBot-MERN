import React from "react";

const Button = ({ buttonLabel, type, className }) => {
  return (
    <button
      type={type}
      className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200 ${
        className || ""
      }`}
    >
      {buttonLabel}
    </button>
  );
};

export default Button;
