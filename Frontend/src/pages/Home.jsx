import mainBot from "/page-photos/homepage-bot.png";
import { NavLink } from "react-router-dom";
import Section from "../components/home/Sections";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <Section
        src={mainBot}
        alt="main-bot"
        animateImg={true}
        imgStyle="w-80 h-auto md:w-96"
        reverse={false}
      >
        <h2 className="text-blue-500 font-semibold mb-2">
          | NEXT GEN PLATFORM
        </h2>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          YOUR OWN PERSONAL <span className="text-blue-600">CHAT BOT</span>
        </h1>
        <p className="text-gray-700 mb-6 max-w-xl text-center">
          Experience the ultimate in user-friendly design with our secure and
          confidential chat interface, ensuring seamless and natural
          conversations while receiving assistance on a diverse range of topics.
        </p>
        <NavLink
          to="/login"
          className="bg-blue-500 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-600 transition-colors"
        >
          Get Started For Free
        </NavLink>
      </Section>
    </div>
  );
};

export default Home;
