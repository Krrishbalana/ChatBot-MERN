import React from "react";
import Spinner from "../shared/Spinner";
import botIcon from "/logos/bot.png";
import { motion } from "framer-motion";

const ChatLoading = () => {
  return (
    <div className="flex items-start gap-3 mb-4">
      <div className="w-10 h-10 flex-shrink-0">
        <img
          src={botIcon}
          alt="chat bot icon"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="flex items-center justify-center bg-gray-800 p-3 rounded-lg max-w-xl">
        <Spinner />
      </div>
    </div>
  );
};

export default ChatLoading;
