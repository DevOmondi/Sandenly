const express = require("express");
const moment = require("moment");
const axios = require("axios");
const fs = require("fs");

const getAccessToken = require("../../utils/paymentAccessTkn");

const paymentRoutes = () => {
  const paymentRouter = express.Router();

  //  Access token route
  paymentRouter.route("/access_token").get((req, res) => {
    getAccessToken()
      .then((accessToken) => {
        res
          .status(200)
          .json({ message: `Your access token is:  ${accessToken}` });
      })
      .catch((error) => {
        console.log("Couldn't get token: ", error);
      });
  });

  //MPESA STKpush route
  paymentRouter.route("/stkpush").get((req, res) => {
    getAccessToken()
      .then((accessToken) => {
        const url =
          "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
        const timestamp = moment().format("YYYYMMDDHHmmss");
        const auth = "Bearer " + accessToken;
        const password = new Buffer.from(
          "174379" +
            "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" +
            timestamp
        ).toString("base64");

        axios
          .post(
            url,
            {
              BusinessShortCode: "174379",
              Password: password,
              Timestamp: timestamp,
              TransactionType: "CustomerPayBillOnline",
              Amount: "1",
              PartyA: "254796178227",
              PartyB: "174379",
              PhoneNumber: "254796178227",
              CallBackURL: "https://5cd7-102-219-208-161.ngrok-free.app/api/payment/callback",
              AccountReference: "Sandenly",
              TransactionDesc: "Test STK push from Sandenly",
            },
            {
              headers: {
                Authorization: auth,
              },
            }
          )
          .then((response) => {
            console.log(response);
            res.json({
              message: "Successful 😀 check your phone and enter PIN",
            });
          })
          .catch((error) => {
            console.log(error);
            res
              .status(500)
              .json({ errorMessage: `An error occured ❌: ${error}` });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  //STK push callback route
  paymentRouter.route("/callback").get((req, res) => {
    console.log("STK push callback");
    // const CheckoutRequestID = req.body.Body.stkCallback.CheckoutRequestID;
    // const ResultCode = req.body.Body.stkCallback.ResultCode;
    let json = JSON.stringify(req.body);
    fs.writeFile("stkcallback.json", json, "utf8", function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("STK push callback json file saved successfully");
    });
    console.log(req.body);
  });

  return paymentRouter;
};

module.exports = paymentRoutes;
