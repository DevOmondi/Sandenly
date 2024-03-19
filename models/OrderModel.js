const { DataTypes } = require("sequelize");
const db = require("../db");

const Order = db.define(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    delivery_date: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    delivery_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);
module.exports = Order;
