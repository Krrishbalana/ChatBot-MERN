import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constant.js";

export const createToken = (id, email, expiresIn) => {
  const payload = { id, email };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });

  return token;
};

export const verifyToken = async (req, res, next) => {
  const token = req.signedCookies[COOKIE_NAME]; // signed cookies is an object which can contain all of the cookies data

  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token Not Received" });
  }

  return new Promise((resolve, reject) => {
    return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
      if (err) {
        reject(err.message);
        return res.status(401).json({ message: "Token Expired" });
      } else {
        // we will set some local parameters for this request in this function
        // and then we can use those parameters inside next function
        // send local variables to next request
        console.log("Token verification successful");

        res.locals.jwtData = success;
        resolve();
        return next();
      }
    });
  });
};
