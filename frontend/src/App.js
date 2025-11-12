// 2.7 A React Router Application that integrates all the above components.
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import SeasonTotals from "./components/SeasonTotals";
import DeleteProduct from "./components/DeleteProduct";
import FilterByUnits from "./components/FilterByUnits";
import FilterByRating from "./components/FilterByRating";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <h1 className="nav-title">Fashion Shop Management</h1>

            <ul className="nav-menu">
              <li>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/add" className="nav-link">
                  Add Product
                </Link>
              </li>
              <li>
                <Link to="/update" className="nav-link">
                  Update Product
                </Link>
              </li>
              <li>
                <Link to="/delete" className="nav-link">
                  Delete Product
                </Link>
              </li>
              <li>
                <Link to="/season-totals" className="nav-link">
                  Season Totals
                </Link>
              </li>
              <li>
                <Link to="/filter-units" className="nav-link">
                  Filter by Units
                </Link>
              </li>
              <li>
                <Link to="/filter-rating" className="nav-link">
                  Filter by Rating
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update" element={<UpdateProduct />} />
            <Route path="/delete" element={<DeleteProduct />} />
            <Route path="/season-totals" element={<SeasonTotals />} />
            <Route path="/filter-units" element={<FilterByUnits />} />
            <Route path="/filter-rating" element={<FilterByRating />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="container">
      <h2>Welcome to Fashion Shop Management System</h2>
      <p>Use the navigation menu above to access different features:</p>
      <div className="feature-grid">
        <div className="feature-card">
          <h3>Add Product</h3>
          <p>Add a new product to the database with all 9 required fields.</p>
        </div>
        <div className="feature-card">
          <h3>Update Product</h3>
          <p>Update product information by Product Name.</p>
        </div>
        <div className="feature-card">
          <h3>Delete Product</h3>
          <p>Delete a product from the database by Product Name.</p>
        </div>
        <div className="feature-card">
          <h3>Season Totals</h3>
          <p>View total Units Sold, Returns, and Revenue for a season.</p>
        </div>
        <div className="feature-card">
          <h3>Filter by Units</h3>
          <p>
            Display first 10 products where Units Sold is greater than a value.
          </p>
        </div>
        <div className="feature-card">
          <h3>Filter by Rating</h3>
          <p>
            Display products where Customer Rating meets a condition for a
            season.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
