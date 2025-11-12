// 2.6 A component that creates a user interface to display all products where average Customer Rating for a given Season meets a condition. (use Endpoint created in Task 1.10)
import React, { useState } from "react";
import axios from "axios";

const FilterByRating = () => {
  const [season, setSeason] = useState("");
  const [condition, setCondition] = useState("");
  const [value, setValue] = useState("");
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
        `http://localhost:3000/api/filter-by-rating?season=${season}&condition=${condition}&value=${value}`
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
      <h2>Filter Products by Customer Rating</h2>
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
          <label>Condition:</label>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
          >
            <option value="">Select Condition</option>
            <option value="gt">Greater Than (&gt;)</option>
            <option value="gte">Greater Than or Equal (&gt;=)</option>
            <option value="lt">Less Than (&lt;)</option>
            <option value="lte">Less Than or Equal (&lt;=)</option>
            <option value="eq">Equal (=)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Rating Value:</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
            placeholder="Enter rating value"
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
            Season: <strong>{products.season}</strong> | Average Rating for
            Season: <strong>{products.averageRatingForSeason}</strong> |
            Condition: <strong>Rating {products.condition}</strong> | Records
            Found: <strong>{products.recordsFound}</strong>
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

export default FilterByRating;
