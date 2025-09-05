import express from "express";
import User from "../models/user-model.js";
import { configureOpenAI } from "../configs/open-ai-config.js";
import { OpenAIApi } from "openai";
import { config } from "dotenv";
config();

/**
 * Helper: return reference to the array that actually stores chats on user.
 * Handles cases where schema uses `chats` or `chat`. If neither exists, create `chats`.
 */
function getOrCreateChats(user) {
  if (!user) return [];
  if (Array.isArray(user.chats)) return user.chats;
  if (Array.isArray(user.chat)) return user.chat;
  user.chats = [];
  return user.chats;
}

export const generateChatCompletion = async (req, res, next) => {
  try {
    const { message } = req.body;

    if (
      !message ||
      typeof message !== "string" ||
      message.trim().length === 0
    ) {
      return res.status(400).json({ error: "Message is required" });
    }

    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered / token malfunctioned" });
    }

    const userChats = getOrCreateChats(user);

    // prepare chat history
    const chats = userChats.map(({ role, content }) => ({
      role,
      content,
    }));

    // add the new user message
    chats.push({ role: "user", content: message });
    userChats.push({ role: "user", content: message });

    // call OpenAI
    const openai = new OpenAIApi(configureOpenAI());

    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chats,
    });

    const botMessage = chatResponse?.data?.choices?.[0]?.message;
    if (!botMessage || typeof botMessage?.content !== "string") {
      console.error("OpenAI invalid response:", chatResponse?.data);
      return res
        .status(500)
        .json({ error: "OpenAI did not return a valid response" });
    }

    // save bot reply
    userChats.push({
      role: botMessage.role,
      content: botMessage.content,
    });
    await user.save();

    return res.status(200).json({ chats: userChats });
  } catch (error) {
    console.error("generateChatCompletion error:", error);
    return res
      .status(500)
      .json({ message: error?.message || "Internal Server Error" });
  }
};

export const getAllChats = async (req, res, next) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);

    if (!user) {
      return res.status(401).json({
        message: "ERROR",
        cause: "User doesn't exist or token malfunctioned",
      });
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res
        .status(401)
        .json({ message: "ERROR", cause: "Permissions didn't match" });
    }

    const userChats = getOrCreateChats(user);
    return res.status(200).json({ message: "OK", chats: userChats });
  } catch (err) {
    console.error("getAllChats error:", err);
    return res.status(500).json({ message: "ERROR", cause: err.message });
  }
};

export const deleteAllChats = async (req, res, next) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);

    if (!user) {
      return res.status(401).json({
        message: "ERROR",
        cause: "User doesn't exist or token malfunctioned",
      });
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res
        .status(401)
        .json({ message: "ERROR", cause: "Permissions didn't match" });
    }

    if (Array.isArray(user.chats)) {
      user.chats = [];
    } else if (Array.isArray(user.chat)) {
      user.chat = [];
    } else {
      user.chats = [];
    }

    await user.save();
    const userChats = getOrCreateChats(user);
    return res.status(200).json({ message: "OK", chats: userChats });
  } catch (err) {
    console.error("deleteAllChats error:", err);
    return res.status(500).json({ message: "ERROR", cause: err.message });
  }
};
