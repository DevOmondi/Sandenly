const router = require("express").Router();

router.use("/api/orders", require("./api/orderRoute"));
router.use("./api/orders/placeOrder", require("./api/orderRoute"))

module.exports = router;