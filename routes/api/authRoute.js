const bcrypt = require("bcrypt");
const express = require("express");

const authRoutes = (User) => {
  const authRouter = express.Router();
  //   Register new user
  authRouter.route("/register").post(async (req, res) => {
    const { username, email, password, category, contact } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
        category,
        contact,
      });
      //   console.log("user created", user.dataValues);
      res
        .status(201)
        .json({ message: `${user.username} account successfully created` });
    } catch (error) {
      console.log("Couldn't create account", error);
    }
  });
  //   User login api
  authRouter.route("/login").post(async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ where: { username: username } });
      if (!user) {
        res
          .status(400)
          .json({ errorMessage: `User ${username} does not exist` });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        res.status(400).json({ errorMessage: "Incorrect credentials" });
      } else {
        res.status(200).json({ message: "Successfully logged in" });
      }
    } catch (error) {
        console.log("Sorry! couldn't log you in :", error)
    }
  });
  return authRouter;
};

module.exports = authRoutes;
