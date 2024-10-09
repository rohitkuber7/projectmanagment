// src/components/ProductList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductList.css";
import SearchIcon from "@mui/icons-material/Search";

import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "4px", // Rounded corners
  border: "1px solid #ccc", // Consistent border
  //borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "50%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(4),
    width: "50%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

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
  }, [currentPage, perPage, searchTerm]);

  return (
    <div style={{ marginLeft: "20px", marginRight: " 20px" }}>
      <h2 style={{ color: "#17202a" }}>Product List</h2>

      <div>
        <form
          onSubmit={handleSearchSubmit}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "25px" }}>
            {/* Search Input */}
            <Search style={{ flexGrow: 1 }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search Products..."
                inputProps={{ "aria-label": "search" }}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Search>
            <label htmlFor="perPage">Entries per page:</label>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="perPage-label"></InputLabel>
                <Select
                  id="perPage"
                  value={perPage}
                  onChange={(e) => setPerPage(Number(e.target.value))}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <div className="select-container">
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
          </Box>
        </form>
      </div>

      <table class="styled-table">
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
      <div className="pagination-container">
        <p className="page-info">
          Page No: {currentPage} / {totalPages}
        </p>
        <button
          className="pagination-button"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ArrowBackIos className="pagination-icon" />
          Previous
        </button>
        <button
          className="pagination-button"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
          <ArrowForwardIos className="pagination-icon" />
        </button>
      </div>
    </div>
  );
};

export default ProductList;
