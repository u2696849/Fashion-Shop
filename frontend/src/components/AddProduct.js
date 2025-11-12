// 2.1 A component that creates a user interface using a form and
// HTML elements for adding data (all 9 fields) to the collection in
// MongoDB through Axios API. (use Endpoint created in Task 1.5)
import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    productCategory: "",
    productName: "",
    unitsSold: "",
    returns: "",
    revenue: "",
    customerRating: "",
    stockLevel: "",
    season: "",
    trendScore: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await axios.post("http://localhost:3000/api/add", formData);
      setMessage("Product added successfully!");
      setFormData({
        productCategory: "",
        productName: "",
        unitsSold: "",
        returns: "",
        revenue: "",
        customerRating: "",
        stockLevel: "",
        season: "",
        trendScore: "",
      });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add product");
    }
  };

  return (
    <div className="container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Product Category:</label>
          <input
            type="text"
            name="productCategory"
            value={formData.productCategory}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Units Sold:</label>
          <input
            type="number"
            name="unitsSold"
            value={formData.unitsSold}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Returns:</label>
          <input
            type="number"
            name="returns"
            value={formData.returns}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Revenue:</label>
          <input
            type="number"
            step="0.01"
            name="revenue"
            value={formData.revenue}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Customer Rating:</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            name="customerRating"
            value={formData.customerRating}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Stock Level:</label>
          <input
            type="number"
            name="stockLevel"
            value={formData.stockLevel}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Season:</label>
          <select
            name="season"
            value={formData.season}
            onChange={handleChange}
            required
          >
            <option value="">Select Season</option>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
            <option value="Autumn">Autumn</option>
            <option value="Winter">Winter</option>
          </select>
        </div>

        <div className="form-group">
          <label>Trend Score:</label>
          <input
            type="number"
            step="0.01"
            name="trendScore"
            value={formData.trendScore}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-primary">
          Add Product
        </button>
      </form>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default AddProduct;
