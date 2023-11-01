const Razorpay = require("razorpay");
const crypto = require("crypto");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const OrderModel = require("../models/OrderModel");

const checkout = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const {
    amount,
    coustomerDetails,
    deliveryAddress,
    deliveryDate,
    orderItems,
  } = req.body;
  const instance = new Razorpay({
    key_id: process.env.Razorpay_Api_key,
    key_secret: process.env.Razorpay_Api_Secret,
  });

  const options = {
    amount: Number(amount * 100),
    currency: "INR",
    // receipt: "receipt#1",
    // notes: {
    //   key1: "value3",
    //   key2: "value2",
    // },
  };

  const order = await instance.orders.create(options);
  console.log(order);
  if (order.id) {
    await OrderModel.create({
      order,
      coustomerDetails,
      deliveryAddress,
      deliveryDate,
      orderItems,
    });
  }
  res.status(200).json({
    success: true,
    order,
  });
});

const paymentVerification = catchAsync(async (req, res, next) => {
  //console.log(req.body);
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.Razorpay_Api_Secret)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    res.status(200).json({
      success: true,
    });
    // await OrderModel.create({
    //   razorpay_order_id,
    //   razorpay_payment_id,
    //   razorpay_signature,
    // });
    // res.redirect(`http://localhost:3000/cart`);
  }
});
const getUserOrder = catchAsync(async (req, res, next) => {
  const userid = req.params.id;
  console.log(userid);
  //   const uname = "sneaker1";
  const userOrder = await OrderModel.find({ "coustomerDetails.id": userid })
    .populate("order")
    .populate("coustomerDetails")
    .populate("deliveryAddress")
    .populate("deliveryDate")
    .populate("orderItems");
  if (!userOrder || userOrder.length === 0)
    return next(new AppError("You have no current orders", 404));

  res.status(200).json({
    success: true,
    totalOrders: userOrder.length,
    userOrder,
  });
});

module.exports = {
  checkout,
  paymentVerification,
  getUserOrder,
};
