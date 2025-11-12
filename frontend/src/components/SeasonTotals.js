// 2.3 A component that creates a user interface to show total Units Sold, Returns, and Revenue for a given Season. (use Endpoint of Task 1.8)
import React, { useState } from "react";
import axios from "axios";

const SeasonTotals = () => {
  const [season, setSeason] = useState("");
  const [totals, setTotals] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setTotals(null);
    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:3000/api/season-totals?season=${season}`
      );
      setTotals(response.data);
    } catch (err) {
      setError(err.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Season Totals</h2>
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
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Loading..." : "Get Totals"}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {totals && (
        <div className="results-container">
          <h3>Totals for {totals.season}</h3>
          <div className="totals-grid">
            <div className="total-card">
              <h4>Total Units Sold</h4>
              <p className="total-value">
                {totals.totalUnitsSold.toLocaleString()}
              </p>
            </div>
            <div className="total-card">
              <h4>Total Returns</h4>
              <p className="total-value">
                {totals.totalReturns.toLocaleString()}
              </p>
            </div>
            <div className="total-card">
              <h4>Total Revenue</h4>
              <p className="total-value">
                $
                {totals.totalRevenue.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeasonTotals;
