// 2.5 A component that creates a user interface to display the first 10 records where Units Sold is greater than a given value. (Endpoint created in Task 1.9 should be used)
import React, { useState } from "react";
import axios from "axios";

const FilterByUnits = () => {
  const [season, setSeason] = useState("");
  const [minUnitsSold, setMinUnitsSold] = useState("");
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setProducts(null);
    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:3000/api/filter-by-units?season=${season}&minUnitsSold=${minUnitsSold}`
      );
      setProducts(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Filter Products by Units Sold</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Select Season:</label>
          <select
            value={season}
            onChange={(e) => setSeason(e.target.value)}
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
          <label>Minimum Units Sold:</label>
          <input
            type="number"
            value={minUnitsSold}
            onChange={(e) => setMinUnitsSold(e.target.value)}
            required
            placeholder="Enter minimum units sold"
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Loading..." : "Filter Products"}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {products && (
        <div className="results-container">
          <h3>Results</h3>
          <p className="info-text">
            Season: <strong>{products.season}</strong> | Minimum Units Sold:{" "}
            <strong>{products.minUnitsSold}</strong> | Records Found:{" "}
            <strong>{products.recordsFound}</strong>
          </p>

          {products.recordsFound === 0 ? (
            <p className="no-results">{products.message}</p>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Product Category</th>
                    <th>Product Name</th>
                    <th>Units Sold</th>
                    <th>Returns</th>
                    <th>Revenue</th>
                    <th>Customer Rating</th>
                    <th>Stock Level</th>
                    <th>Season</th>
                    <th>Trend Score</th>
                  </tr>
                </thead>
                <tbody>
                  {products.products.map((product, index) => (
                    <tr key={index}>
                      <td>{product.productCategory}</td>
                      <td>{product.productName}</td>
                      <td>{product.unitsSold}</td>
                      <td>{product.returns}</td>
                      <td>${product.revenue.toFixed(2)}</td>
                      <td>{product.customerRating}</td>
                      <td>{product.stockLevel}</td>
                      <td>{product.season}</td>
                      <td>{product.trendScore}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterByUnits;
