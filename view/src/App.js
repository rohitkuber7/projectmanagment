// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";
import TransactionList from "./components/TransactionList";
import Statistics from "./components/Statistics";
import CategoryCounts from "./components/CategoryCounts";
import BarChart from "./components/BarChart";
import Navbar from "./components/Navbar"; // Import Navbar

const App = () => {
  return (
    <Router>
      <div>
        <h1 style={{ textAlign: "center" }}>Product Management System</h1>
        <Navbar /> {/* Add Navbar here */}
        <Routes>
          <Route path="/" element={<TransactionList />} />
          <Route path="/allproducts" element={<ProductList />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/category-counts" element={<CategoryCounts />} />
          <Route path="/bar-chart" element={<BarChart />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
