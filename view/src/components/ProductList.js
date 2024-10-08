// src/components/ProductList.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]); // Initialize products as an empty array
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/products/transactions?search=${searchTerm}&page=${currentPage}&perPage=${perPage}`
      );

      setProducts(response.data.data.transactions || []); // Use the correct path to access transactions
      setTotalPages(Math.ceil(response.data.totalRecords / perPage)); // Calculate total pages based on totalRecords
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    setCurrentPage(1); // Reset to the first page on new search
    fetchProducts(); // Fetch products with the current search term
  };

  useEffect(() => {
    fetchProducts(); // Fetch products when currentPage or perPage changes
  }, [currentPage, perPage]);

  return (
    <div>
      <h2>Product List</h2>
      <div style={{ marginBottom: "20px" }}>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <div>
          <label htmlFor="perPage">Entries per page:</label>
          <select
            id="perPage"
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div>
          <label htmlFor="pageNumber">Go to page:</label>
          <input
            id="pageNumber"
            type="number"
            min="1"
            max={totalPages}
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
          />
        </div>
      </div>
      <table style={{ width: "100%", border: "1px solid #ccc" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? ( // Check if products is not empty
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>${product.price.toFixed(2)}</td> {/* Format price */}
                <td>{product.category}</td>
                <td>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <p>
          Page No: {currentPage} / {totalPages}
        </p>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
