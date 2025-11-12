const mongoose = require("mongoose");

// Define the Schema for Fashion Shop Data
const fashionShopSchema = new mongoose.Schema(
  {
    productCategory: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
      unique: true,
    },
    unitsSold: {
      type: Number,
      required: true,
    },
    returns: {
      type: Number,
      required: true,
    },
    revenue: {
      type: Number,
      required: true,
    },
    customerRating: {
      type: Number,
      required: true,
    },
    stockLevel: {
      type: Number,
      required: true,
    },
    season: {
      type: String,
      required: true,
      enum: ["Spring", "Summer", "Autumn", "Winter"],
    },
    trendScore: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the Model
const FashionShopData = mongoose.model("FashionShopData", fashionShopSchema);

module.exports = FashionShopData;
