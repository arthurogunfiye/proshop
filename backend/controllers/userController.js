import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc Authenticate user and get token
// @route POST /api/users/login
// @access Public
const authenticateUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; // Destructure email and password from the request body

  const user = await User.findOne({ email }); // Check if user exists in the database

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Register user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  }); // Create a new user

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Logout user and clear cookie
// @route POST /api/users/logout
// @access Private
// Here we're going to clear the cookie bcos
// we're storing the JWT in an http-only
// cookie on the server and we need to destroy
// that. It's not just a matter of clearing
// the localStorage. The route is private bcos
// the user has to be logged to be able to log out
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0), // Set the cookie to expire immediately
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Public
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // Get the user from the database
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
// We are not passing in an ID here bcos
// we're going to use the token as it is
// the user that updates their own profile
// They have access to only their own
// data which is encoded in the JWT
// (JSON Web Token)
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // Get the user from the database

  if (user) {
    user.name = req.body.name || user.name; // If the user enters a new name, update the name
    user.email = req.body.email || user.email; // If the user enters a new email, update the email

    if (req.body.password) {
      // Password is hashed in the model hence the need to check if the user entered a new password
      user.password = req.body.password; // If the user enters a new password, update the password
    }

    const updatedUser = await user.save(); // Save the updated user

    generateToken(res, updatedUser._id); // Generate a new token and store it in an http-only cookie
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("Get all users");
});

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("Get user by ID");
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("Delete user");
});

// @desc Update user
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("Update user");
});

export {
  authenticateUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};

// In web development, there are many ways to
// authenticate users. You can use cookies,
// sessions, JWT or a combination. You can
// also use services like OAuth and third-
// party services like Auth0.

// JWT is a secure way to share info btw
// 2 parties such as a web server and a client.
// JWT consists of 3 parts: a header, a payload
// and a signature. The payload contains info
// like the user's id or role. The signature is
// used to verify the info hasn't been tampered
// with in any way.

// Traditionally, JWTs are often stored in the
// browser on the client. However, this can be
// insecure as doing this might expose you to
// CSS attacks. Better to generate the JWT and
// store it in an http-only cookie on the server.
// This http-only cookie will then be sent with
// every request.
