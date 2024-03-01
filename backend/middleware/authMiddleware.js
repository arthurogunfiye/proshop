import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// @desc Protect routes
// @access Private
// This middleware is going to be used to protect
// routes that require authentication.
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read the JWT from the cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get the user from the database and attach it to the request object
      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// This middleware is going to be used to protect
// routes that require authentication.

// It's going to be used in the:

// userController.js file to protect the
// /api/users/profile route.

// orderController.js file to protect the
// /api/orders route.

// productController.js file to protect the
// /api/products route.

// cartController.js file to protect the
// /api/cart route.

// paymentController.js file to protect the
// /api/payment route.

// shippingController.js file to protect the
// /api/shipping route.

// Admin middleware
// This middleware is going to be used to protect
// routes that require admin access.
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };
