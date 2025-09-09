import axios from "axios";

// Create axios instance with baseURL and credentials
const API = axios.create({
  baseURL: "https://chatbot-mern-env.up.railway.app/api",
  withCredentials: true, // 🔑 send cookies for auth
});

export const userLogin = async (email, password) => {
  try {
    const response = await API.post("/user/login", { email, password });
    if (response.status !== 200) throw new Error();
    return response.data;
  } catch (err) {
    throw new Error(`Error! Cannot Login. ${err.message}`);
  }
};

export const userSignup = async (name, email, password) => {
  try {
    const response = await API.post("/user/signup", { name, email, password });
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(`Error! Cannot Signup. ${err.message}`);
  }
};

export const getAuthStatus = async () => {
  try {
    const response = await API.get("/user/auth-status");
    if (response.status !== 200)
      throw new Error("Could not verify authentication status");
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const postChatRequest = async (message) => {
  try {
    const response = await API.post("/chat/new", { message });
    if (response.status !== 200) throw new Error();
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

export const getAllChats = async () => {
  try {
    const response = await API.get("/chat/all-chats");
    if (response.status !== 200) throw new Error();
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

export const deleteAllChats = async () => {
  try {
    const response = await API.delete("/chat/delete-all-chats");
    if (response.status !== 200) throw new Error();
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

export const logoutUser = async () => {
  try {
    const response = await API.get("/user/logout");
    if (response.status !== 200) throw new Error();
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};
