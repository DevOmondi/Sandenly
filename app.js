const express = require("express");
require("dotenv").config();

const db = require("./db");

const app = express();
const port = process.env.SERVER_PORT || 5001;

app.get("/", (req, res) => {
  res.send("Sandenly app testing :)");
});

// Start server
app.listen(port, (error) => {
  if (error) {
    console.log("Sorry, couldn't start server :(");
  } else {
    console.log("Server is running on port:", port);
  }
});

// Test connection to database
const testConnectionDb = async () => {
  try {
    await db.authenticate();
    console.log(
      `Connection to ${process.env.DB_NAME} database has been established successfully :)`
    );
  } catch (error) {
    console.error(
      `Unable to connect to the ${process.env.DB_NAME} database:(`,
      error
    );
  }
};
testConnectionDb();
