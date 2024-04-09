const router = require("express").Router();
const User = require("../models/UserModel");
const Order = require("../models/OrderModel");

const authRoutes = require("./api/authRoute")(User);
const orderRoutes = require("./api/orderRoute")(Order);
const paymentRoutes = require("./api/paymentRoute")();

// api endpoints
router.use("/api/orders", orderRoutes);
router.use("/api/auth", authRoutes);
router.use("/api/payment", paymentRoutes);

module.exports = router;