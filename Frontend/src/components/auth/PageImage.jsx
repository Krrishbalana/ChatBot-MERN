import React from "react";

const PageImage = ({ className, alt, src }) => {
  return (
    <div className={`flex justify-center items-center ${className || ""}`}>
      <img alt={alt} src={src} className="max-w-full h-auto object-contain" />
    </div>
  );
};

export default PageImage;
