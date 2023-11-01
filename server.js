const express = require("express");
const cors = require("cors");
const razorpay = require("razorpay");
require("dotenv").config({ path: "./config.env" });
const PORT = process.env.PORT || 8000;
const app = express();
const AppError = require("./utils/appError");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const topicRoutes = require("./routes/topicRoutes");
const commentRoutes = require("./routes/commentRoutes");
const likeDislikeRoutes = require("./routes/likeDislikeRoutes");
const errorFormatter = require("./ErrorHandler/errorFormatter");
const dbConnect = require("./Config/dbConnect");
const products = require("./products");

// Parse JSON request body
app.use(express.json());
app.use(cors());

dbConnect(); //mongoose connection

// Use BLOGPOST routes
// app.use("/blogs", blogRoutes);
app.use("/users", userRoutes);
app.use("/payments", paymentRoutes);
// app.use("/topics", topicRoutes);
// app.use("/comments", commentRoutes);
// app.use("/likeDislikes", likeDislikeRoutes);

///for products only
app.get("/products", (req, res) => {
  res.send(products);
});

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
