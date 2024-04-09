const request = require("request");
require("dotenv").config();

// FUNC: Get access token
const getAccessToken = () => {
  const consumer_key = process.env.CONSUMER_KEY;
  const consumer_secret = process.env.CONSUMER_SECRET;
  const url =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

  const auth =
    "Basic " +
    new Buffer.from(consumer_key + ":" + consumer_secret).toString("base64");

  request(
    {
      url: url,
      headers: {
        Authorization: auth,
      },
    },
    (error, response, body) => {
      if (error) {
        console.log("An error occured: ", error);
      } else {
        // console.log(body)
        const access_token = JSON.parse(body).access_token;
        console.log(access_token);
        return access_token;
      }
    }
  );
};

module.exports = getAccessToken;
