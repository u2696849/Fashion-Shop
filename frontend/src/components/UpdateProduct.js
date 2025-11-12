// 2.2 A component that creates a user interface using a form and HTML elements for updating data for a given Product Name. (Endpoint created in Task 1.6)
import React, { useState } from "react";
import axios from "axios";

const UpdateProduct = () => {
  const [productName, setProductName] = useState("");
  const [formData, setFormData] = useState({
    productCategory: "",
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

    if (!productName) {
      setError("Product Name is required");
      return;
    }

    try {
      const updatePayload = {
        productName,
        ...formData,
      };

      // Remove empty fields
      Object.keys(updatePayload).forEach((key) => {
        if (updatePayload[key] === "") {
          delete updatePayload[key];
        }
      });

      await axios.post("http://localhost:3000/api/update", updatePayload);
      setMessage("Product updated successfully!");
      setFormData({
        productCategory: "",
        unitsSold: "",
        returns: "",
        revenue: "",
        customerRating: "",
        stockLevel: "",
        season: "",
        trendScore: "",
      });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update product");
    }
  };

  return (
    <div className="container">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Product Name (Required):</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            placeholder="Enter product name to update"
          />
        </div>

        <div className="form-group">
          <label>Product Category:</label>
          <input
            type="text"
            name="productCategory"
            value={formData.productCategory}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Units Sold:</label>
          <input
            type="number"
            name="unitsSold"
            value={formData.unitsSold}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Returns:</label>
          <input
            type="number"
            name="returns"
            value={formData.returns}
            onChange={handleChange}
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
          />
        </div>

        <div className="form-group">
          <label>Stock Level:</label>
          <input
            type="number"
            name="stockLevel"
            value={formData.stockLevel}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Season:</label>
          <select name="season" value={formData.season} onChange={handleChange}>
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
          />
        </div>

        <button type="submit" className="btn-primary">
          Update Product
        </button>
      </form>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default UpdateProduct;
