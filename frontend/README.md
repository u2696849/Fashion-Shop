# Fashion Shop Frontend

React application for managing fashion shop data with a REST API backend.

## Features

This frontend application provides a user interface for all backend API endpoints:

- **Add Product** (2.1) - Form to add new products with all 9 fields
- **Update Product** (2.2) - Form to update products by Product Name
- **Delete Product** (2.4) - Form to delete products by Product Name
- **Season Totals** (2.3) - Display total Units Sold, Returns, and Revenue for a season
- **Filter by Units** (2.5) - Display first 10 products where Units Sold > value
- **Filter by Rating** (2.6) - Display products where Customer Rating meets a condition

## Prerequisites

- Node.js installed
- Backend server running on `http://localhost:3000`

## Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

## Running the Application

1. Make sure the backend server is running:

   ```bash
   cd ../backend
   npm start
   ```

2. Start the React development server:

   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

The app will automatically reload when you make changes.

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── AddProduct.js          # Component 2.1
│   │   ├── UpdateProduct.js       # Component 2.2
│   │   ├── SeasonTotals.js        # Component 2.3
│   │   ├── DeleteProduct.js       # Component 2.4
│   │   ├── FilterByUnits.js       # Component 2.5
│   │   └── FilterByRating.js      # Component 2.6
│   ├── App.js                     # Main app with React Router (2.7)
│   ├── App.css                    # Styling
│   └── index.js
├── package.json
└── README.md
```

## Components

### AddProduct (2.1)

- Form with all 9 required fields
- Uses POST `/api/add` endpoint
- Validates all fields before submission

### UpdateProduct (2.2)

- Form to update products by Product Name
- Uses POST `/api/update` endpoint
- Only required field is Product Name

### SeasonTotals (2.3)

- Select season from dropdown
- Uses GET `/api/season-totals` endpoint
- Displays totals in card format

### DeleteProduct (2.4)

- Form to delete by Product Name
- Uses POST `/api/delete` endpoint
- Shows deleted product details after deletion

### FilterByUnits (2.5)

- Select season and enter minimum units sold
- Uses GET `/api/filter-by-units` endpoint
- Displays results in a table (max 10 records)

### FilterByRating (2.6)

- Select season, condition, and rating value
- Uses GET `/api/filter-by-rating` endpoint
- Displays all matching products in a table

## Technologies Used

- React 18
- React Router DOM (for routing)
- Axios (for API calls)
- CSS3 (for styling)

## API Endpoints Used

All components connect to the backend API running on `http://localhost:3000`:

- `POST /api/add` - Add product
- `POST /api/update` - Update product
- `POST /api/delete` - Delete product
- `GET /api/season-totals` - Get season totals
- `GET /api/filter-by-units` - Filter by units sold
- `GET /api/filter-by-rating` - Filter by rating

## Notes

- Make sure the backend server is running before using the frontend
- All API calls use `http://localhost:3000` as the base URL
- The application uses React Router for navigation between components
- All forms include validation and error handling
