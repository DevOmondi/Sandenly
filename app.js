const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const db = require("./db");
const User = require("./models/UserModel");
const Order = require("./models/OrderModel");

const app = express();
const port = process.env.SERVER_PORT || 5001;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

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

// Test connection to database and sync
const syncDb = async () => {
  try {
    await db.authenticate();
    console.log(
      `Connected to ${process.env.DB_NAME} database  successfully :)`
    );
    //  Synchronise to the database
    await db.sync({alter: true});
    console.log(`Synced to ${process.env.DB_NAME} database successfully`);
  } catch (error) {
    console.error(
      `Unable to connect to the ${process.env.DB_NAME} database:(`,
      error
    );
  }
  return db;
};
// syncDb();

// Set routing
app.use(require("./routes"));
