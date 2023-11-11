const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const Seller = require("../models/sellerModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const bcrypt = require("bcryptjs");
const upload = require("../Middleware/multerSetup");
// ***********************SIGN TOKEN****************************

const signToken = (
  id,
  name,
  email,
  address,
  pancardnumber,
  phonenumber,
  businessType,
  logoimg
) => {
  return jwt.sign(
    {
      id,
      name,
      email,
      address,
      pancardnumber,
      phonenumber,
      businessType,
      logoimg,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};
const createSendToken = (user, statusCode, res) => {
  let token = signToken(
    user._id,
    user.businessName,
    user.businessEmail,
    user.businessAddress,
    user.pancardnumber,
    user.phonenumber,
    user.businessType,
    user.logoimg
  );

  res.status(statusCode).json({
    status: "success",
    token,
    _id: user._id,
    businessName: user.businessName,
    businessEmail: user.businessEmail,
  });
};

// ********************SIGNING UP USER***********************

const sellersignup = catchAsync(async (req, res, next) => {
  const {
    businessName,
    businessEmail,
    pancardnumber,
    businessType,
    phonenumber,
    businessAddress,
    password,
  } = req.body;
  // console.log("file----", req.file);

  const logoimg = req.file.path;

  const newSeller = await Seller.create({
    businessName,
    businessEmail,
    pancardnumber,
    businessType,
    phonenumber,
    businessAddress,
    password,
    logoimg,
  });
  createSendToken(newSeller, 201, res);
});

// // ********************LOGGING IN USER ************************

// const login = catchAsync(async (req, res, next) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return next(new AppError("please provide email and password!", 400));
//   }

//   const user = await User.findOne({ email }).select("+password"); //we use + bcz by default its selection is false in model

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return next(new AppError("Incorrect email or password", 401));
//   }

//   const token = signToken(
//     user._id,
//     user.name,
//     user.email,
//     user.address,
//     user.age,
//     user.phonenumber,
//     user.gender,
//     user.profileimg
//   );

//   res.status(200).json({
//     status: "success",
//     _id: user._id,
//     email,
//     token,
//     name: user.name,
//     address: user.address,
//     age: user.age,
//     phonenumber: user.phonenumber,
//     gender: user.gender,
//   });
// });

//******************************** Implementation of jwt ****************************
// const protect = catchAsync(async (req, res, next) => {
//   //  1)************ Getting token and check if it exits*************
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   }

//   if (!token) {
//     return next(
//       new AppError("You are not logged in please login to get access.", 401)
//     );
//   }

//   // 2)******************verification token************************

//   const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
//   //console.log(decode);
//   // 3)************check if user still exists******************

//   const currentUser = await User.findById(decode.id);
//   if (!currentUser) {
//     return next(
//       new AppError("The user belonging to this token no longer exists", 401)
//     );
//   }
//   //***** grant access to protected routes ******
//   req.user = currentUser; //putting user data in request
//   next();
// });

module.exports = {
  sellersignup,
};
