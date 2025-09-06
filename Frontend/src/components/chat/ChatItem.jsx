import React from "react";
import ReactMarkdown from "react-markdown";
import reactGFM from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";

import botIcon from "/logos/bot.png";
import { useAuth } from "../../context/context";

const ChatItem = ({ content, role }) => {
  const auth = useAuth();

  const botMsg = (
    <div className="flex items-start gap-3 mb-4">
      <div className="w-10 h-10 flex-shrink-0">
        <img
          src={botIcon}
          alt="chat bot icon"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="bg-gray-800 text-white p-3 rounded-lg markdown-body max-w-xl">
        <ReactMarkdown
          remarkPlugins={[reactGFM]}
          rehypePlugins={[rehypeHighlight]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );

  const userMsg = (
    <div className="flex items-start gap-3 mb-4 justify-end">
      <div className="flex flex-col items-end">
        <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xl break-words">
          <p>{content}</p>
        </div>
      </div>
      <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-blue-500 text-white rounded-full font-bold">
        {auth?.user?.name
          ? auth.user.name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .toUpperCase()
          : "U"}
      </div>
    </div>
  );

  return <>{role === "assistant" ? botMsg : userMsg}</>;
};

export default ChatItem;
