import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // unique email
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false, // not an admin by default
    },
  },
  {
    timestamps: true,
  }
);

// Method to match entered password to hashed password
// We use the methods property to create a method on the userSchema
// We use the matchPassword method to compare the entered password to the hashed password
// We use the bcrypt compare method to compare the entered password to the hashed password
// We use the this keyword to access the password
// We use the async keyword to make this method asynchronous
// We use the await keyword to wait for the bcrypt compare method to complete
// We use the return keyword to return the result of the bcrypt compare method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password before saving user
// This is a middleware that runs before a user is saved
// We use a regular function here instead of an arrow function because we need access to the user object
// Arrow functions don't have their own this. They inherit their this from the parent scope
// We need access to the user object so we can access the password
// We use the pre method to run this middleware before the user is saved
// We use the save method to save the user
// We use the isModified method to check if the password has been modified
// We use the genSalt method to generate a salt
// We use the hash method to hash the password
// We use the next method to move on to the next middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  // Generate a salt
  const salt = await bcrypt.genSalt(10);
  // Hash the password
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
