import jwt from "jsonwebtoken";

// Generate JWT and store it in an http-only cookie
// We use the jwt.sign method to generate a token
// We use the userId and JWT_SECRET as the payload
// We use the expiresIn property to set the expiration time of the token
// We use the res.cookie method to set the JWT as an http-only cookie on the server
// We use the httpOnly property to make the cookie inaccessible to the client side
// We use the secure property to make the cookie only accessible in a secure environment
// We use the sameSite property to make the cookie only accessible in the same site
// We use the maxAge property to set the expiration time of the cookie
// We use 30 days as the expiration time of the cookie
// We use the return keyword to return the token
const generateToken = (res, userId) => {
  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  // Set JWT as http-only cookie on the server
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Protect against CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days converted to milliseconds
  });
};

export default generateToken;
