import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import "./TransactionList.css";

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

/* const StyledSelect = styled(Select)({
  ...inputStyles, // Apply common styles to select
}); */

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/products/transactions?search=${searchTerm}&month=${selectedMonth}&page=${currentPage}&perPage=${perPage}`
      );
      setTransactions(response.data.data.transactions || []);
      setTotalPages(Math.ceil(response.data.totalRecords / perPage));
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchTransactions();
  };

  useEffect(() => {
    fetchTransactions();
  }, [currentPage, selectedMonth, searchTerm]);

  const handleClearSearch = () => {
    setSearchTerm("");
    fetchTransactions();
  };

  return (
    <div style={{ marginLeft: "20px", marginRight: " 20px" }}>
      <h2 style={{ color: "#17202a" }}>Transaction Dashboard</h2>
      <div>
        <form
          onSubmit={handleSearchSubmit}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "25px",
            }}
          >
            <Search style={{ flexGrow: 1 }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search Transaction..."
                inputProps={{ "aria-label": "search" }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Search>

            <Box
              sx={{
                width: "250px", // Set the desired width
                height: "60px", // Set a specific height
                margin: "10px", // Add margin for spacing
                display: "flex", // Use flexbox for alignment
                alignItems: "center", // Center
                marginLeft: "25px",
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Month</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  label="Month"
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200, // Limit the height of the dropdown menu
                        width: 250, // Match the select box width
                      },
                    },
                  }}
                >
                  {months.map((month) => (
                    <MenuItem key={month} value={month}>
                      {month}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </form>
      </div>

      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.title}</td>
                <td>{transaction.description}</td>
                <td>{transaction.price}</td>
                <td>{transaction.category}</td>
                <td>{transaction.sold ? "Yes" : "No"}</td>
                <td>
                  <img
                    src={transaction.image}
                    alt={transaction.title}
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination-container">
        <p className="page-info">Page No: {currentPage}</p>
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
        <span className="per-page-info">Per Page: {perPage}</span>
      </div>
    </div>
  );
};

export default TransactionList;
