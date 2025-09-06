import React from "react";

const SpinnerOverlay = () => {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="flex gap-2">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-150"></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-300"></div>
      </div>
    </div>
  );
};

export default SpinnerOverlay;
