const bcrypt = require("bcrypt");
const express = require("express");
require("dotenv").config();
const {OAuth2Client} = require("google-auth-library");

const { issueJwt } = require("../../utils/jwt");

const authRoutes = (User) => {
  const authRouter = express.Router();
  //   Register new user
  authRouter.route("/register").post(async (req, res) => {
    const { firstName, lastName, email, password, category, contact } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        category,
        contact,
      });
      //   console.log("user created", user.dataValues);
      res
        .status(201)
        .json({ message: `${user.firstName} account successfully created` });
    } catch (error) {
      // console.log("Couldn't create account", error);
      res.status(500).json({
        errorMessage: "Sorry, an error occured on our side, Try again :(",
      });
    }
  });
  //   User login api
  authRouter.route("/login").post(async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        res.status(400).json({ errorMessage: `User ${email} does not exist` });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        res.status(400).json({ errorMessage: "Incorrect password" });
      } else {
        delete user.password;

        const jwtToken = issueJwt(user.id);
        const bearerTkn = jwtToken.token;

        return res
          .header("Authorization", bearerTkn)
          .json({ message: `${user.email} user successfully logged in` });
      }
    } catch (error) {
      console.log("Sorry! couldn't log you in :", error);
    }
  });

  // Login with google || generate Auth url
  authRouter.route("/googleAuthUrl").post(async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Referrer-Policy", "no-referrer-when-downgrade");

    const redirectUrl = "http://localhost:3000/home"

    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUrl
    )

    const authorizationUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: "https://www.googleapis.com/auth/userinfo.profile openid",
      prompt: "consent"
    })
    res.json({url:authorizationUrl})
  });
  return authRouter;
};

module.exports = authRoutes;
