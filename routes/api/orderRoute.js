const Order = require("../../models/OrderModel");
const router = require("express").Router();

// Fetch orders from db
router.get("/", (req, res) => {
  Order.findAll()
    .then((orders) => {
      console.log("Available orders:", orders);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("An error occured:", err);
    });
});

router.post("/placeOrder", (req, res) => {
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
      res.send(order.dataValues)
    })
    .catch((err) => {
      console.log("Couldn't add order", err);
    });
});

module.exports = router;
