// 2.4 A component that creates a user interface for deleting a record for a given Product Name. (use Endpoint created in Task 1.7)
import React, { useState } from "react";
import axios from "axios";

const DeleteProduct = () => {
  const [productName, setProductName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [deletedProduct, setDeletedProduct] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setDeletedProduct(null);

    try {
      const response = await axios.post("http://localhost:3000/api/delete", {
        productName,
      });
      setMessage("Product deleted successfully!");
      setDeletedProduct(response.data.data);
      setProductName("");
    } catch (err) {
      setError(err.response?.data?.error);
    }
  };

  return (
    <div className="container">
      <h2>Delete Product</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            placeholder="Enter product name to delete"
          />
        </div>
        <button type="submit" className="btn-danger">
          Delete Product
        </button>
      </form>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      {deletedProduct && (
        <div className="results-container">
          <h3>Deleted Product Details:</h3>
          <div className="product-details">
            <p>
              <strong>Product Category:</strong>{" "}
              {deletedProduct.productCategory}
            </p>
            <p>
              <strong>Product Name:</strong> {deletedProduct.productName}
            </p>
            <p>
              <strong>Units Sold:</strong> {deletedProduct.unitsSold}
            </p>
            <p>
              <strong>Returns:</strong> {deletedProduct.returns}
            </p>
            <p>
              <strong>Revenue:</strong> ${deletedProduct.revenue.toFixed(2)}
            </p>
            <p>
              <strong>Customer Rating:</strong> {deletedProduct.customerRating}
            </p>
            <p>
              <strong>Stock Level:</strong> {deletedProduct.stockLevel}
            </p>
            <p>
              <strong>Season:</strong> {deletedProduct.season}
            </p>
            <p>
              <strong>Trend Score:</strong> {deletedProduct.trendScore}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteProduct;
