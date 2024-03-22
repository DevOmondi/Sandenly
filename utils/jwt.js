const jwt = require("jsonwebtoken");
require("dotenv").config();
const genPrivateKey = require("../cryptography/genKeyPair")();

const SIGN_SECRET_KEY = genPrivateKey.privateKey ;

// Func to issue token
const issueJwt = (id) => {
  const expiresIn = "1hr";

  const payload = {
    sub: id,
    iat: Date.now(),
  };

  try{
    const signedToken = jwt.sign(payload, SIGN_SECRET_KEY, {
      algorithm: "RS256",
      expiresIn,
    });
    return { token: `Bearer ${signedToken}`, expires: expiresIn}
  }
  catch(error){
    console.log("Sorry! an error occured", error)
  }
};


module.exports = issueJwt;