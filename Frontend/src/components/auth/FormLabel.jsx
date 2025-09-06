import React from "react";
import { motion } from "framer-motion";
const FormLabel = ({
  className = "",
  htmlFor,
  label,
  type,
  id,
  name,
  required,
  maxLength,
  minLength,
  value,
  onChange,
  inputPH,
  labelPH,
}) => {
  return (
    <div className={`flex flex-col mb-4 ${className}`}>
      <label
        htmlFor={htmlFor}
        className="mb-1 text-gray-700 font-medium"
        placeholder={labelPH}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        required={required}
        maxLength={maxLength}
        minLength={minLength}
        value={value}
        onChange={onChange}
        placeholder={inputPH}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default FormLabel;
