# MERN-AI Chatbot Backend

## Project Overview

The **MERN-AI Chatbot** is a robust backend application built using Node.js and Express, designed to handle AI chat completions, user authentication, and chat history storage. This project leverages MongoDB for data persistence, ensuring a seamless experience for users interacting with the AI chatbot.

## Key Features

- **JWT Authentication**: Secure user authentication using JSON Web Tokens.
- **AI-Powered Chat**: Integrate AI capabilities for dynamic chat interactions.
- **MongoDB Storage**: Efficiently store user data and chat history.
- **Cloudinary Integration**: Manage and store media files effortlessly.
- **Validation and Error Handling Middleware**: Ensure data integrity and provide meaningful error messages.

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** + **Mongoose**
- **JWT**
- **Cloudinary**

## Project Folder Structure

```
MERN-AI-Chatbot/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── server.js
│   └── package.json
```

## Getting Started

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/MERN-AI-Chatbot.git
cd MERN-AI-Chatbot/backend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Setup Environment Variables

Create a `.env` file in the root of the backend directory and add the following variables:

```
PORT=5001
MONGO_URI=<your-mondo_URI>
OPENAI_API_KEY=<your-openAI_API_KEY>
JWT_SECRET=<your-JWT-SECRET>
COOKIE_SECRET=<your-cookie_secret_key>
DOMAIN=localhost
```

### Step 4: Run the Server

```bash
npm start
```

## API Endpoints

### Authentication

- **POST** `/api/auth/signup`: Create a new user.
- **POST** `/api/auth/login`: Authenticate a user.
- **POST** `/api/auth/logout`: Log out the user.

### Chat

- **POST** `/api/chat/new`: Create a new chat entry.
- **GET** `/api/chat/all`: Retrieve all chat entries.
- **DELETE** `/api/chat/all`: Delete all chat entries.

## Error Handling

The application implements a custom `ApiError` class for structured error responses, an `asyncHandler` middleware to handle asynchronous errors, and an `ApiResponse` wrapper to standardize API responses.

---

Feel free to contribute to the project or reach out for any questions! 🚀
