import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";
import colors from "colors";

dotenv.config();

connectDB();

// Import data to database
const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data Imported!".green.inverse);

    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Destroy data from database
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);

    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Check if the user wants to import or destroy data
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

// You can run the seeder by running the following commands in the terminal

// node backend/seeder -d
// node backend/seeder

// The first command will destroy the data and the second command will import the data

// You can also add the following scripts to the package.json file

// "data:import": "node backend/seeder",

// "data:destroy": "node backend/seeder -d",

// Then you can run the following commands in the terminal

// npm run data:import

// npm run data:destroy
