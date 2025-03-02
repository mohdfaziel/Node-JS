const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const crypto = require("crypto");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running`);
});

app.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const options = req.body;
    const order = await razorpay.orders.create(options);
    if (!order) {
      return res.status(500).send("Some error occured");
    }
    res.json(order);
  } catch (error) {
    res.status(500).send("Some error occured");
  }
});
app.post("/order/validate", async (req, res) => {
  try {
   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest("hex");
    if (digest !== razorpay_signature) {
      return res.status(400).json({msg:"Transaction not legit!"});
    }
    res.json({ msg: "Payment successful", orderId: razorpay_order_id, paymentId: razorpay_payment_id });
  } catch (error) {
    res.status(500).send("Some error occured");
  }
});
