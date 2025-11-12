const mongoose = require("mongoose");
const FashionShopData = require("./fashionShopSchema");

// MongoDB connection string
const MONGODB_URI = "mongodb://localhost:27017/fashion_shop";

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
    console.log("Database: fashion_shop");
    console.log("Collection: FashionShopData");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = { connectDB, FashionShopData };
