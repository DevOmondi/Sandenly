const express = require("express");

const getAccessToken = require("../../utils/paymentAccessTkn");

const paymentRoutes = () => {
  const paymentRouter = express.Router();

  paymentRouter.route("/access_token").get((req, res) => {
    getAccessToken()
      // .then((access_token) => {
      //   res.send("Your access token is: ", access_token);
      // })
      // .catch((error) => {
      //   console.log("Couldn't get token: ", error);
      // });
  });
  return paymentRouter;
};

module.exports = paymentRoutes;
