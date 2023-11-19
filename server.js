const express = require("express");
const cors = require("cors");
const razorpay = require("razorpay");
require("dotenv").config({ path: "./config.env" });
const PORT = process.env.PORT || 8000;
const app = express();
const AppError = require("./utils/appError");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const productRoutes = require("./routes/productRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const topicRoutes = require("./routes/topicRoutes");
const commentRoutes = require("./routes/commentRoutes");
const likeDislikeRoutes = require("./routes/likeDislikeRoutes");
const errorFormatter = require("./ErrorHandler/errorFormatter");
const dbConnect = require("./Config/dbConnect");
const products = require("./products");
const Product = require("./models/productModel");

// Parse JSON request body
app.use(express.json());
app.use(cors());

dbConnect(); //mongoose connection

// Use BLOGPOST routes
// app.use("/blogs", blogRoutes);
app.use("/users", userRoutes);
app.use("/sellers", sellerRoutes);
app.use("/payments", paymentRoutes);
// app.use("/topics", topicRoutes);
app.use("/comments", commentRoutes);
app.use("/sneakers", productRoutes);
// app.use("/likeDislikes", likeDislikeRoutes);

app.use("/uploads", express.static("uploads"));

///for products only
app.get("/products", (req, res) => {
  res.send(products);
});
// Product.insertMany(products)
//   .then(() => {
//     console.log("Data inserted successfully!");
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// Product.deleteMany({})
//   .then(() => {
//     console.log("Data deleted successfully!");
//   })
//   .catch((err) => {
//     console.error(err);
//   });

app.all("*", (req, res, next) => {
  return next(
    new AppError(`can't find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(errorFormatter);

//starting server
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}....`);
});
