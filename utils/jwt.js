const jwt = require("jsonwebtoken");
const createError = require("http-errors");
require("dotenv").config();

const genPrivateKey = require("../cryptography/genKeyPair")();

const SIGN_SECRET_KEY = genPrivateKey.privateKey;

// Func to issue token
const issueJwt = (id) => {
  const expiresIn = "1hr";

  const payload = {
    sub: id,
    iat: Date.now(),
  };

  try {
    const signedToken = jwt.sign(payload, SIGN_SECRET_KEY, {
      algorithm: "RS256",
      expiresIn,
    });
    return { token: `Bearer ${signedToken}`, expires: expiresIn };
  } catch (error) {
    console.log("Sorry! an error occured", error);
  }
};

// Func to verify token
const verifyJwtToken = (req, res, next) => {
  if (!req.headers["authorization"]) return next(createError.Unauthorized());

  const token = req.headers["authorization"];

  console.log("Token:", token);
  jwt.verify(token, SIGN_SECRET_KEY, (error, payload) => {
    if (error) {
      // return next(createError.Unauthorized());
      console.log(error);
    }
    req.payload = payload;
    next();
  });
};

module.exports = { issueJwt, verifyJwtToken };
