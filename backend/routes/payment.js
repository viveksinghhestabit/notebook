const express = require("express");
const Router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require("uuid");
const Order = require("../models/Order");
const Payment = require("../models/Payment");
const User = require("../models/User");
const Note = require("../models/Notes");

const { res_success, res_error } = require("../middleware/response");

Router.post("/paywithstripe", async (req, res) => {
  try {
    const { token, items } = req.body;
    const idempotencyKey = uuidv4();
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const source = await customer.default_source;
    const amount = items.reduce((a, b) => a + b.price * b.quantity, 0) * 100;
    const charge = await stripe.paymentIntents.create(
      {
        amount: amount,
        currency: "inr",
        customer: customer.id,
        payment_method: source,
        off_session: true,
        confirm: true,
      },
      {
        idempotencyKey,
      }
    );

    const user = req.user.id;

    const payment = await Payment.create({
      user,
      payment_id: charge.id,
      amount: charge.amount / 100,
      status: charge.status,
    });
    items.map(async (item) => {
      await Order.create({
        order_id: payment.id,
        user,
        product: item.id,
        quantity: item.quantity,
        total: item.price,
        status: "pending",
      });
    });

    if (!charge) throw Error("Payment failed");

    res_success(res, charge);
  } catch (err) {
    console.log(err);
    res_error(res, err.message);
  }
});

Router.get("/getpayments", async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const payments = await Payment.find().populate("user");
      return res_success(res, payments);
    }
    const payments = await Payment.find({ user: req.user.id });
    res_success(res, payments);
  } catch (err) {
    console.log(err);
    res_error(res, err.message);
  }
});

Router.get("/getorder/:id", async (req, res) => {
  try {
    const orders = await Order.find({ order_id: req.params.id }).populate(
      "product"
    );
    orders.map((order) => {
      order.product.imagePath = `${process.env.BASE_URL}/${order.product.imagePath}`;
    });
    res_success(res, orders);
  } catch (err) {
    console.log(err);
    res_error(res, err.message);
  }
});

Router.put("/updateorder/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    order.status = req.body.status;
    await order.save();
    res_success(res, order);
  } catch (err) {
    console.log(err);
    res_error(res, err.message);
  }
});

Router.get("/dashboard", async (req, res) => {
  try {
    //get graph range from params
    const grapgrange = req.query.grapgrange;
    const dateArray = [];
    const Orders = [];
    const Users = [];
    const Notes = [];
    const loopRange = grapgrange > 30 ? 11 : grapgrange - 1;
    const formatmultiplier = grapgrange > 30 ? 30 : 1;
    const format = grapgrange > 30 ? "%Y-%m" : "%Y-%m-%d";

    const orders = await Order.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(new Date() - grapgrange * 60 * 60 * 24 * 1000),
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: format, date: "$date" },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    const users = await User.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(new Date() - grapgrange * 60 * 60 * 24 * 1000),
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: format, date: "$date" },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    const notes = await Note.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(new Date() - grapgrange * 60 * 60 * 24 * 1000),
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: format, date: "$date" },
          },
          count: { $sum: 1 },
        },
      },
    ]);
    for (let i = loopRange; i >= 0; i--) {
      const date = new Date(
        new Date() - i * formatmultiplier * 60 * 60 * 24 * 1000
      )
        .toISOString()
        .split("T")[0];
      dateArray.push(date);
      const sliceFormat = grapgrange > 30 ? date.slice(0, 7) : date;
      const index1 = orders.findIndex((order) => order._id === sliceFormat);
      index1 === -1 ? Orders.push(0) : Orders.push(orders[index1].count);
      const index2 = users.findIndex((user) => user._id === sliceFormat);
      index2 === -1 ? Users.push(0) : Users.push(users[index2].count);
      const index3 = notes.findIndex((note) => note._id === sliceFormat);
      index3 === -1 ? Notes.push(0) : Notes.push(notes[index3].count);
    }
    const series1 = { name: "Orders", data: Orders };
    const series2 = { name: "Users", data: Users };
    const series3 = { name: "Notes", data: Notes };
    const series = [series1, series2, series3];
    res_success(res, { dateArray, series });
  } catch (err) {
    console.log(err);
    res_error(res, err.message);
  }
});

module.exports = Router;
