const axios = require("axios");
require("dotenv").config();

// FUNC: Get access token
const getAccessToken = async () => {
  const consumer_key = process.env.CONSUMER_KEY;
  const consumer_secret = process.env.CONSUMER_SECRET;
  const url =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

  const auth =
    "Basic " +
    new Buffer.from(consumer_key + ":" + consumer_secret).toString("base64");

  //  Get access token using axios
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: auth,
      },
    });
    const accessToken = response.data.access_token;
    // console.log(accessToken);
    return accessToken;
  } catch (error) {
    throw error;
  }
};

module.exports = getAccessToken;
