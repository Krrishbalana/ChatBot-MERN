import Header from "./components/shared/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import { useAuth } from "./context/context";

function App() {
  const auth = useAuth();

  // Check if auth context is still loading
  if (auth === null) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="p-4 max-w-5xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          {auth.isLoggedIn ? (
            <Route path="/chat" element={<Chat />} />
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}
        </Routes>
      </main>
    </div>
  );
}

export default App;
