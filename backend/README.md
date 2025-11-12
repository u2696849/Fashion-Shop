# Fashion Shop REST API

A Node.js, Express, MongoDB, and Mongoose REST API for managing fashion shop data.

## Prerequisites

- Node.js installed
- MongoDB installed and running
- npm (Node Package Manager)

## Setup Instructions

### 1. Check MongoDB Status

To check if MongoDB is running, use one of these commands:

```bash
# Check if MongoDB service is running (macOS with Homebrew)
brew services list | grep mongodb

# Or check if MongoDB process is running
ps aux | grep mongod | grep -v grep

# Or check if port 27017 is in use
lsof -i :27017
```

If MongoDB is not running, start it with:

```bash
brew services start mongodb-community
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The server will start on `http://localhost:3000`

## Project Structure

- `server.js` - Main Express server with all REST API endpoints
- `fashionShopSchema.js` - Mongoose schema definition for FashionShopData
- `dbConnection.js` - MongoDB connection configuration
- `package.json` - Project dependencies and scripts

## API Endpoints

### 1.5 Add Product (POST)

**Endpoint:** `POST /api/add`

**Body:**

```json
{
  "productCategory": "Tops",
  "productName": "Nike Blue Tops M",
  "unitsSold": 150,
  "returns": 5,
  "revenue": 15000.0,
  "customerRating": 4.5,
  "stockLevel": 200,
  "season": "Summer",
  "trendScore": 35.5
}
```

### 1.6 Update Product (POST)

**Endpoint:** `POST /api/update`

**Body:**

```json
{
  "productName": "Nike Blue Tops M",
  "unitsSold": 175,
  "customerRating": 4.7
}
```

### 1.7 Delete Product (POST)

**Endpoint:** `POST /api/delete`

**Body:**

```json
{
  "productName": "Nike Blue Tops M"
}
```

### 1.8 Season Totals (GET)

**Endpoint:** `GET /api/season-totals?season=Summer`

Returns total Units Sold, Returns, and Revenue for the specified season.

### 1.9 Filter by Units Sold (GET)

**Endpoint:** `GET /api/filter-by-units?season=Summer&minUnitsSold=200`

Displays first 10 records (in browser) where Units Sold > minUnitsSold for the given season.

### 1.10 Filter by Rating (GET)

**Endpoint:** `GET /api/filter-by-rating?season=Summer&condition=gte&value=4.0`

Displays all products (in browser) where Customer Rating meets the condition for the given season.

**Conditions:** `gt` (greater than), `gte` (greater than or equal), `lt` (less than), `lte` (less than or equal), `eq` (equal)

## Importing CSV Data

To import your `fashion_shop.csv` file into MongoDB, you can:

1. Use MongoDB Compass (GUI tool)
2. Use `mongoimport` command:
   ```bash
   mongoimport --db fashion_shop --collection fashionshopdatas --type csv --headerline --file fashion_shop.csv
   ```
3. Create a script to read the CSV and use the POST `/api/add` endpoint

## Testing the API

You can test the API using:

- Browser (for GET endpoints)
- Postman
- curl commands
- Any HTTP client

Example curl commands:

```bash
# Add a product
curl -X POST http://localhost:3000/api/add \
  -H "Content-Type: application/json" \
  -d '{"productCategory":"Tops","productName":"Test Product","unitsSold":100,"returns":5,"revenue":10000,"customerRating":4.5,"stockLevel":200,"season":"Summer","trendScore":30}'

# Get season totals
curl http://localhost:3000/api/season-totals?season=Summer
```
