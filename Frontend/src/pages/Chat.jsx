import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import ChatItem from "../components/chat/ChatItem";
import {
  deleteAllChats,
  getAllChats,
  postChatRequest,
} from "../../helpers/api-functions";

import sendIcon from "/logos/send-icon.png";
import noMsgBot from "/logos/no-msg2.png";
import upArrow from "/logos/up-arrow.png";
import ChatLoading from "../components/chat/ChatLoading";

import { useAuth } from "../context/context";
import SpinnerOverlay from "../components/shared/SpinnerOverlay";
import toast from "react-hot-toast";

const Chat = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [chatMessages, setChatMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingChats, setIsLoadingChats] = useState(true);
  const [deleteChatToggle, setDeleteChatToggle] = useState(false);

  const inputRef = useRef(null);
  const messageContainerRef = useRef(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  useLayoutEffect(() => {
    const getChats = async () => {
      try {
        if (auth?.isLoggedIn && auth.user) {
          const data = await getAllChats();
          setChatMessages([...data.chats]);
        }
        setIsLoadingChats(false);
      } catch (err) {
        console.log(err);
        setIsLoadingChats(false);
      }
    };
    getChats();
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth, navigate]);

  const sendMsgHandler = async () => {
    const content = inputRef.current?.value;

    if (inputRef.current) inputRef.current.value = "";

    const newMessage = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);

    setIsLoading(true);
    const chatData = await postChatRequest(content);
    setChatMessages([...chatData.chats]);
    setIsLoading(false);
  };

  const deleteChatsToggle = () => {
    setDeleteChatToggle((prevState) => !prevState);
  };

  const clearChatsHandler = async () => {
    try {
      toast.loading("Deleting Messages ...", { id: "delete-msgs" });
      const data = await deleteAllChats();
      setChatMessages(data.chats);
      setDeleteChatToggle(false);
      toast.success("Deleted Messages Successfully", { id: "delete-msgs" });
    } catch (error) {
      toast.error(error.message, { id: "delete-msgs" });
    }
  };

  const variants = {
    animate: {
      y: [0, -10, 0, -10, 0],
      transition: {
        type: "spring",
        y: { repeat: Infinity, duration: 4, stiffness: 100, damping: 5 },
      },
    },
  };

  const logo = {
    animate: {
      y: [0, -5, 0, -5, 0],
      transition: {
        type: "spring",
        y: {
          repeat: Infinity,
          duration: 4,
          stiffness: 100,
          damping: 5,
        },
      },
    },
    animateReverse: {
      transform: "rotate(180deg)",
      y: "-4",
      transition: {
        duration: 0.5,
      },
    },
    initialBtn: {
      y: "4",
      opacity: 0,
    },
    animateBtn: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exitBtn: {
      y: "-20",
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const placeHolder = (
    <div className="flex flex-col items-center justify-center text-center p-6 space-y-4 text-gray-600">
      <h3 className="text-xl font-bold">GPT 3.5 TURBO</h3>
      <motion.div className="w-32 h-32" variants={variants} animate="animate">
        <img alt="no msg bot" src={noMsgBot} />
      </motion.div>
      <p>
        It's quiet in here! Be the first to break the silence and send a message
        to get the conversation going.
      </p>
    </div>
  );

  const chats = chatMessages.map((chat, idx) => (
    <ChatItem
      key={`${chat.content}-${idx}`}
      content={chat.content}
      role={chat.role}
    />
  ));

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4"
        ref={messageContainerRef}
      >
        {isLoadingChats && <SpinnerOverlay />}
        {!isLoadingChats && (
          <>
            {chatMessages.length === 0 && placeHolder}
            {chatMessages.length !== 0 && chats}
            {isLoading && <ChatLoading />}
          </>
        )}
      </div>

      <div className="p-4 border-t border-gray-300 bg-white">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 relative">
            <motion.img
              variants={logo}
              animate={!deleteChatToggle ? "animate" : "animateReverse"}
              src={upArrow}
              alt="top icon"
              onClick={deleteChatsToggle}
              className="w-6 h-6 cursor-pointer"
            />
            <AnimatePresence>
              {deleteChatToggle && (
                <motion.button
                  onClick={clearChatsHandler}
                  variants={logo}
                  initial="initialBtn"
                  animate="animateBtn"
                  exit="exitBtn"
                  className="absolute left-10 top-0 bg-red-500 text-white px-3 py-1 rounded shadow"
                >
                  CLEAR CHATS
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <textarea
            ref={inputRef}
            rows={1}
            maxLength={1500}
            disabled={isLoadingChats || isLoading}
            placeholder="Enter your query here"
            className="flex-1 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={sendMsgHandler}
            className="p-2 bg-blue-500 rounded hover:bg-blue-600 transition-colors"
          >
            <img alt="icon" src={sendIcon} className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
