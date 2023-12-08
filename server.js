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
const channelRoutes = require("./routes/channelRoutes");
const errorFormatter = require("./ErrorHandler/errorFormatter");
const dbConnect = require("./Config/dbConnect");
const products = require("./products");
const Product = require("./models/productModel");
const CHAT_ENGINE_PROJECT_ID = "c18b96cf-f444-4fa1-b996-67a97fb9ca86";
const CHAT_ENGINE_PRIVATE_KEY = "3955815d-44a9-425d-bfa3-74dded157c1b";

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
app.use("/channel", channelRoutes);
app.use("/uploads", express.static("uploads"));

///for products only
app.get("/products", (req, res) => {
  res.send(products);
});
// app.post("/channel/signup", async (req, res) => {
//   const { username, secret, email, first_name, last_name } = req.body;
//   console.log(req.body);

//   // Store a user-copy on Chat Engine!
//   // Docs at rest.chatengine.io
//   try {
//     const r = await axios.post(
//       "https://api.chatengine.io/users/",
//       { username, secret, email, first_name, last_name },
//       { headers: { "Private-Key": CHAT_ENGINE_PRIVATE_KEY } }
//     );
//     return res.status(r.status).json(r.data);
//   } catch (e) {}
// });

// app.post("/channel/login", async (req, res) => {
//   const { username, secret } = req.body;

//   // Fetch this user from Chat Engine in this project!
//   // Docs at rest.chatengine.io
//   try {
//     const r = await axios.get("https://api.chatengine.io/users/me/", {
//       headers: {
//         "Project-ID": CHAT_ENGINE_PROJECT_ID,
//         "User-Name": username,
//         "User-Secret": secret,
//       },
//     });
//     return res.status(r.status).json(r.data);
//   } catch (e) {
//     return res.status(e.response.status).json(e.response.data);
//   }
// });
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
