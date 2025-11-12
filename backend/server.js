const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectDB, FashionShopData } = require("./dbConnection");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// 1.5 POST method to add data to FashionShopData collection
app.post("/api/add", async (req, res) => {
  try {
    const {
      productCategory,
      productName,
      unitsSold,
      returns,
      revenue,
      customerRating,
      stockLevel,
      season,
      trendScore,
    } = req.body;

    // Validate required fields
    if (
      !productCategory ||
      !productName ||
      unitsSold === undefined ||
      returns === undefined ||
      revenue === undefined ||
      customerRating === undefined ||
      stockLevel === undefined ||
      !season ||
      trendScore === undefined
    ) {
      return res.status(400).json({
        error:
          "All fields are required: productCategory, productName, unitsSold, returns, revenue, customerRating, stockLevel, season, trendScore",
      });
    }

    const newProduct = new FashionShopData({
      productCategory,
      productName,
      unitsSold: Number(unitsSold),
      returns: Number(returns),
      revenue: Number(revenue),
      customerRating: Number(customerRating),
      stockLevel: Number(stockLevel),
      season,
      trendScore: Number(trendScore),
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({
      message: "Product added successfully",
      data: savedProduct,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: "Product with this name already exists" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// 1.6 POST method to update a single record for a given Product Name
app.post("/api/update", async (req, res) => {
  try {
    const { productName } = req.body;

    if (!productName) {
      return res.status(400).json({ error: "Product Name is required" });
    }

    const updateData = {
      productCategory: req.body.productCategory,
      unitsSold:
        req.body.unitsSold !== undefined
          ? Number(req.body.unitsSold)
          : undefined,
      returns:
        req.body.returns !== undefined ? Number(req.body.returns) : undefined,
      revenue:
        req.body.revenue !== undefined ? Number(req.body.revenue) : undefined,
      customerRating:
        req.body.customerRating !== undefined
          ? Number(req.body.customerRating)
          : undefined,
      stockLevel:
        req.body.stockLevel !== undefined
          ? Number(req.body.stockLevel)
          : undefined,
      season: req.body.season,
      trendScore:
        req.body.trendScore !== undefined
          ? Number(req.body.trendScore)
          : undefined,
    };

    // Remove undefined fields
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const updatedProduct = await FashionShopData.findOneAndUpdate(
      { productName: productName },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 1.7 POST endpoint to delete a record for a given Product Name
app.post("/api/delete", async (req, res) => {
  try {
    const { productName } = req.body;

    if (!productName) {
      return res.status(400).json({ error: "Product Name is required" });
    }

    const deletedProduct = await FashionShopData.findOneAndDelete({
      productName: productName,
    });

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 1.8 GET method to show total Units Sold, Returns, and Revenue for a given Season
app.get("/api/season-totals", async (req, res) => {
  try {
    const { season } = req.query;

    if (!season) {
      return res
        .status(400)
        .json({ error: "Season parameter is required (e.g., ?season=Summer)" });
    }

    const result = await FashionShopData.aggregate([
      { $match: { season: season } },
      {
        $group: {
          _id: null,
          totalUnitsSold: { $sum: "$unitsSold" },
          totalReturns: { $sum: "$returns" },
          totalRevenue: { $sum: "$revenue" },
        },
      },
    ]);

    if (result.length === 0) {
      return res.status(404).json({
        message: `No data found for season: ${season}`,
        season: season,
        totalUnitsSold: 0,
        totalReturns: 0,
        totalRevenue: 0,
      });
    }

    res.json({
      season: season,
      totalUnitsSold: result[0].totalUnitsSold,
      totalReturns: result[0].totalReturns,
      totalRevenue: result[0].totalRevenue,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 1.9 GET endpoint to display first 10 records where Units Sold > given value for a given season
app.get("/api/filter-by-units", async (req, res) => {
  try {
    const { season, minUnitsSold } = req.query;

    if (!season || !minUnitsSold) {
      return res.status(400).json({
        error:
          "Both season and minUnitsSold parameters are required (e.g., ?season=Summer&minUnitsSold=200)",
      });
    }

    const minUnits = Number(minUnitsSold);
    if (isNaN(minUnits)) {
      return res.status(400).json({ error: "minUnitsSold must be a number" });
    }

    const products = await FashionShopData.find({
      season: season,
      unitsSold: { $gt: minUnits },
    })
      .limit(10)
      .sort({ unitsSold: -1 });

    if (products.length === 0) {
      return res.json({
        message: `No products found for season "${season}" with Units Sold greater than ${minUnits}`,
        season: season,
        minUnitsSold: minUnits,
        recordsFound: 0,
        products: [],
      });
    }

    res.json({
      season: season,
      minUnitsSold: minUnits,
      recordsFound: products.length,
      products: products.map((product) => ({
        productCategory: product.productCategory,
        productName: product.productName,
        unitsSold: product.unitsSold,
        returns: product.returns,
        revenue: product.revenue,
        customerRating: product.customerRating,
        stockLevel: product.stockLevel,
        season: product.season,
        trendScore: product.trendScore,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 1.10 GET endpoint to display all products where average Customer Rating for a given Season meets a condition
app.get("/api/filter-by-rating", async (req, res) => {
  try {
    const { season, condition, value } = req.query;

    if (!season || !condition || !value) {
      return res.status(400).json({
        error:
          "season, condition (gt, gte, lt, lte, eq), and value parameters are required (e.g., ?season=Summer&condition=gte&value=4.0)",
      });
    }

    const ratingValue = Number(value);
    if (isNaN(ratingValue)) {
      return res.status(400).json({ error: "value must be a number" });
    }

    // First, calculate average rating for the season
    const avgRatingResult = await FashionShopData.aggregate([
      { $match: { season: season } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$customerRating" },
        },
      },
    ]);

    if (avgRatingResult.length === 0) {
      return res.status(404).json({
        message: `No data found for season: ${season}`,
        season: season,
      });
    }

    const averageRating = avgRatingResult[0].averageRating;

    // Build query based on condition
    let ratingQuery = {};
    switch (condition.toLowerCase()) {
      case "gt":
        ratingQuery = { customerRating: { $gt: ratingValue } };
        break;
      case "gte":
        ratingQuery = { customerRating: { $gte: ratingValue } };
        break;
      case "lt":
        ratingQuery = { customerRating: { $lt: ratingValue } };
        break;
      case "lte":
        ratingQuery = { customerRating: { $lte: ratingValue } };
        break;
      case "eq":
        ratingQuery = { customerRating: ratingValue };
        break;
      default:
        return res
          .status(400)
          .json({ error: "Invalid condition. Use: gt, gte, lt, lte, or eq" });
    }

    const products = await FashionShopData.find({
      season: season,
      ...ratingQuery,
    });

    if (products.length === 0) {
      return res.json({
        message: "No products found matching the criteria",
        season: season,
        averageRatingForSeason: parseFloat(averageRating.toFixed(2)),
        condition: `${condition} ${ratingValue}`,
        recordsFound: 0,
        products: [],
      });
    }

    res.json({
      season: season,
      averageRatingForSeason: parseFloat(averageRating.toFixed(2)),
      condition: `${condition} ${ratingValue}`,
      recordsFound: products.length,
      products: products.map((product) => ({
        productCategory: product.productCategory,
        productName: product.productName,
        unitsSold: product.unitsSold,
        returns: product.returns,
        revenue: product.revenue,
        customerRating: product.customerRating,
        stockLevel: product.stockLevel,
        season: product.season,
        trendScore: product.trendScore,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the Fashion Shop API");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`MongoDB connection will be established on startup`);
});
