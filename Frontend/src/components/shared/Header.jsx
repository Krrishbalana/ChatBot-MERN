import React from "react";
import Logo from "./Logo";
import NavigationLink from "./NavigationLink";
import { useAuth } from "../../context/context";

const Header = () => {
  const auth = useAuth();

  let links;

  if (auth?.isLoggedIn) {
    links = (
      <div className="flex gap-4">
        <NavigationLink to="/chat" text="Go To Chat" />
        <NavigationLink to="/" text="Logout" onClick={auth.logout} />
      </div>
    );
  } else {
    links = (
      <div className="flex gap-4">
        <NavigationLink to="/login" text="Sign In" />
        <NavigationLink to="/signup" text="Create an Account" />
      </div>
    );
  }

  return (
    <header className="w-full flex justify-between items-center p-4 bg-white shadow-md">
      <div>
        <Logo />
      </div>
      <div>{links}</div>
    </header>
  );
};

export default Header;
