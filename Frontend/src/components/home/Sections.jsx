import React from "react";

const Section = ({ src, alt, animateImg, children, imgStyle, reverse }) => {
  return (
    <div
      className={`flex flex-col md:flex-row items-center justify-between my-8 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Content */}
      <div className="flex-1 p-4 transition-transform duration-700 ease-in-out">
        {children}
      </div>

      {/* Image */}
      <div className="flex-1 flex justify-center items-center p-4">
        <img
          src={src}
          alt={alt}
          className={`max-w-full h-auto transition-opacity duration-1000 ease-in-out ${
            animateImg ? "opacity-100" : "opacity-0"
          } ${imgStyle}`}
        />
      </div>
    </div>
  );
};

export default Section;
