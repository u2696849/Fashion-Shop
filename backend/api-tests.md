# API Endpoint Tests

This document contains all the curl commands used to test the Fashion Shop REST API endpoints and their responses.

---

## 1.5 POST /api/add — Add Product

**Code:**
```bash
curl -X POST http://localhost:3000/api/add \
  -H "Content-Type: application/json" \
  -d '{
    "productCategory": "Dresses",
    "productName": "Test Product New",
    "unitsSold": 250,
    "returns": 8,
    "revenue": 25000.50,
    "customerRating": 4.7,
    "stockLevel": 350,
    "season": "Spring",
    "trendScore": 35.0
  }'
```

**Response:**
```json
{
  "message": "Product added successfully",
  "data": {
    "productCategory": "Dresses",
    "productName": "Test Product New",
    "unitsSold": 250,
    "returns": 8,
    "revenue": 25000.5,
    "customerRating": 4.7,
    "stockLevel": 350,
    "season": "Spring",
    "trendScore": 35,
    "_id": "6914b36cdec7b0632f1af126",
    "createdAt": "2025-11-12T16:18:52.405Z",
    "updatedAt": "2025-11-12T16:18:52.405Z",
    "__v": 0
  }
}
```

**Status:** ✅ Working (201 Created)

---

## 1.6 POST /api/update — Update Product

**Code:**
```bash
curl -X POST http://localhost:3000/api/update \
  -H "Content-Type: application/json" \
  -d '{
    "productName": "Test Product A",
    "unitsSold": 320,
    "customerRating": 4.8,
    "revenue": 32000.00
  }'
```

**Response:**
```json
{
  "message": "Product updated successfully",
  "data": {
    "_id": "6914b32dc4f61c99eaaad30b",
    "productCategory": "Tops",
    "productName": "Test Product A",
    "unitsSold": 320,
    "returns": 12,
    "revenue": 32000,
    "customerRating": 4.8,
    "stockLevel": 400,
    "season": "Summer",
    "trendScore": 38.2,
    "createdAt": "2025-11-12T16:17:49.921Z",
    "updatedAt": "2025-11-12T16:18:42.521Z",
    "__v": 0
  }
}
```

**Status:** ✅ Working (200 OK)

---

## 1.7 POST /api/delete — Delete Product

**Code:**
```bash
curl -X POST http://localhost:3000/api/delete \
  -H "Content-Type: application/json" \
  -d '{
    "productName": "Test Product 2"
  }'
```

**Response:**
```json
{
  "message": "Product deleted successfully",
  "data": {
    "_id": "6914b0e9c4f61c99eaaad2fe",
    "productCategory": "Dresses",
    "productName": "Test Product 2",
    "unitsSold": 150,
    "returns": 5,
    "revenue": 15000,
    "customerRating": 4.8,
    "stockLevel": 200,
    "season": "Summer",
    "trendScore": 40,
    "createdAt": "2025-11-12T16:08:09.922Z",
    "updatedAt": "2025-11-12T16:08:09.922Z",
    "__v": 0
  }
}
```

**Status:** ✅ Working (200 OK)

---

## 1.8 GET /api/season-totals — Get Season Totals

**Code:**
```bash
curl "http://localhost:3000/api/season-totals?season=Summer"
```

**Response:**
```json
{
  "season": "Summer",
  "totalUnitsSold": 795,
  "totalReturns": 30,
  "totalRevenue": 79500.5
}
```

**Status:** ✅ Working (200 OK)

---

## 1.9 GET /api/filter-by-units — Filter by Units Sold

**Code:**
```bash
curl "http://localhost:3000/api/filter-by-units?season=Summer&minUnitsSold=200"
```

**Response:**
```json
{
  "season": "Summer",
  "minUnitsSold": 200,
  "recordsFound": 2,
  "products": [
    {
      "productCategory": "Tops",
      "productName": "Test Product A",
      "unitsSold": 320,
      "returns": 12,
      "revenue": 32000,
      "customerRating": 4.8,
      "stockLevel": 400,
      "season": "Summer",
      "trendScore": 38.2
    },
    {
      "productCategory": "Tops",
      "productName": "Test Product 1",
      "unitsSold": 275,
      "returns": 10,
      "revenue": 27500,
      "customerRating": 4.7,
      "stockLevel": 300,
      "season": "Summer",
      "trendScore": 35.5
    }
  ]
}
```

**Status:** ✅ Working (200 OK)

---

## 1.10 GET /api/filter-by-rating — Filter by Customer Rating

**Code:**
```bash
curl "http://localhost:3000/api/filter-by-rating?season=Summer&condition=gte&value=4.5"
```

**Response:**
```json
{
  "season": "Summer",
  "averageRatingForSeason": 4.8,
  "condition": "gte 4.5",
  "recordsFound": 3,
  "products": [
    {
      "productCategory": "Tops",
      "productName": "Test Product 1",
      "unitsSold": 275,
      "returns": 10,
      "revenue": 27500,
      "customerRating": 4.7,
      "stockLevel": 300,
      "season": "Summer",
      "trendScore": 35.5
    },
    {
      "productCategory": "Tops",
      "productName": "Test Product A",
      "unitsSold": 320,
      "returns": 12,
      "revenue": 32000,
      "customerRating": 4.8,
      "stockLevel": 400,
      "season": "Summer",
      "trendScore": 38.2
    },
    {
      "productCategory": "Dresses",
      "productName": "Test Product B",
      "unitsSold": 200,
      "returns": 8,
      "revenue": 20000.5,
      "customerRating": 4.9,
      "stockLevel": 250,
      "season": "Summer",
      "trendScore": 42.5
    }
  ]
}
```

**Status:** ✅ Working (200 OK)

---

## Error Handling Tests

### Error Test 1: Missing Required Fields (1.5)

**Code:**
```bash
curl -X POST http://localhost:3000/api/add \
  -H "Content-Type: application/json" \
  -d '{
    "productCategory": "Tops",
    "productName": "Incomplete Product"
  }'
```

**Response:**
```json
{
  "error": "All fields are required: productCategory, productName, unitsSold, returns, revenue, customerRating, stockLevel, season, trendScore"
}
```

**Status:** ✅ Error Handling Working (400 Bad Request)

---

### Error Test 2: Product Not Found (1.6)

**Code:**
```bash
curl -X POST http://localhost:3000/api/update \
  -H "Content-Type: application/json" \
  -d '{
    "productName": "Non-existent Product",
    "unitsSold": 100
  }'
```

**Response:**
```json
{
  "error": "Product not found"
}
```

**Status:** ✅ Error Handling Working (404 Not Found)

---

### Error Test 3: Missing Query Parameter (1.8)

**Code:**
```bash
curl "http://localhost:3000/api/season-totals"
```

**Response:**
```json
{
  "error": "Season parameter is required (e.g., ?season=Summer)"
}
```

**Status:** ✅ Error Handling Working (400 Bad Request)

---

## Summary

All 6 required endpoints (1.5-1.10) are working correctly and return JSON responses:

- ✅ **1.5 POST /api/add** - Successfully adds products
- ✅ **1.6 POST /api/update** - Successfully updates products by Product Name
- ✅ **1.7 POST /api/delete** - Successfully deletes products by Product Name
- ✅ **1.8 GET /api/season-totals** - Returns season totals correctly
- ✅ **1.9 GET /api/filter-by-units** - Returns filtered products as JSON
- ✅ **1.10 GET /api/filter-by-rating** - Returns filtered products as JSON

All endpoints properly handle error cases and return appropriate error messages.

