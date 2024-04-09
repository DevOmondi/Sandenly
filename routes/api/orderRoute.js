const express = require("express");

const { verifyJwtToken } = require("../../utils/jwt");

const orderRoutes = (Order) => {
  const orderRouter = express.Router();

  // Fetch orders from db
  orderRouter.route("/all").get(verifyJwtToken, (req, res) => {
    Order.findAll()
      .then((orders) => {
        // console.log("Available orders:", orders);
        res.send(orders);
      })
      .catch((err) => {
        console.log("An error occured:", err);
      });
  });

  // Place order
  orderRouter.route("/placeOrder").post((req, res) => {
    const {
      quantity,
      delivery_date,
      delivery_address,
      order_status,
      order_type,
    } = req.body;

    Order.create({
      quantity,
      delivery_date,
      delivery_address,
      order_status,
      order_type,
    })
      .then((order) => {
        console.log("Created orders", order);
        res.send(order.dataValues);
      })
      .catch((err) => {
        console.log("Couldn't add order", err);
      });
  });

  // Update order
  orderRouter.route("/updateOrder").put();

  return orderRouter;
};

module.exports = orderRoutes;
