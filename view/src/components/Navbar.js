// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: "#007bff", padding: "10px" }}>
      <ul
        style={{
          listStyleType: "none",
          display: "flex",
          justifyContent: "space-around",
          margin: 0,
          padding: 0,
        }}
      >
        <li>
          <Link
            to="/"
            style={{ color: "#fff", textDecoration: "none", fontSize: "18px" }}
          >
            Transactions
          </Link>
        </li>
        <li>
          <Link
            to="/allproducts" // Add this line
            style={{ color: "#fff", textDecoration: "none", fontSize: "18px" }}
          >
            All Products
          </Link>
        </li>
        <li>
          <Link
            to="/statistics"
            style={{ color: "#fff", textDecoration: "none", fontSize: "18px" }}
          >
            Statistics
          </Link>
        </li>
        <li>
          <Link
            to="/category-counts"
            style={{ color: "#fff", textDecoration: "none", fontSize: "18px" }}
          >
            Category Counts
          </Link>
        </li>
        <li>
          <Link
            to="/bar-chart"
            style={{ color: "#fff", textDecoration: "none", fontSize: "18px" }}
          >
            Bar Chart
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
