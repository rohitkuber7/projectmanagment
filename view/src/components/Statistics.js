import React, { useState, useEffect } from "react";
import { getStatistics } from "../api";
import { Box, Typography, Grid, Paper } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const Statistics = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    soldItems: 0,
    notSoldItems: 0,
  });
  const [month, setMonth] = useState("November");

  // List of months for the dropdown
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

  // Fetch stats function to be called when month is selected
  const fetchStats = async (selectedMonth) => {
    try {
      const response = await getStatistics(selectedMonth);
      if (response.status === "success") {
        setStats(response.data); // Set the stats based on the API response data
      } else {
        console.error("Failed to fetch statistics");
      }
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  // Trigger API call when month changes
  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    setMonth(selectedMonth);
    fetchStats(selectedMonth); // Call API when month is changed
  };

  useEffect(() => {
    fetchStats(month); // Initial API call for the default month
  }, []); // Empty dependency array to only trigger once when the component mounts

  return (
    <div style={{ marginLeft: "20px", marginRight: " 20px" }}>
      <h2 style={{ color: "#17202a" }}>Sales Statistics for {month}</h2>
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
            value={month}
            onChange={handleMonthChange}
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

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "350px", // Set the width of the box
          padding: "20px", // Add padding inside the box
          margin: "auto", // Center the box horizontally
          marginTop: "50px", // Add some top margin for spacing
          border: "1px solid #ccc", // Add a border
          borderRadius: "8px", // Round the corners
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
          backgroundColor: "#f9f9f9", // Background color
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            marginBottom: "20px",
            fontWeight: "bold",
            color: "#1976d2", // Change color for the heading
            textAlign: "center", // Center the heading
          }}
        >
          Sales Statistics
        </Typography>
        <Paper
          elevation={3} // Adds a shadow effect
          sx={{
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#f5f5f5", // Light gray background
            "&:hover": {
              backgroundColor: "#e3f2fd", // Change background color on hover
              transition: "0.3s ease-in-out", // Smooth transition
            },
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                sx={{ color: "#333", fontWeight: "bold" }}
              >
                Total Sales:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                sx={{
                  color: "#1976d2", // Use a vibrant color for the total sales
                  fontWeight: "bold",
                  fontSize: "1.2rem", // Slightly larger font size
                }}
              >
                {stats.totalSales}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                sx={{ color: "#333", fontWeight: "bold" }}
              >
                Total Sold Items:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                sx={{
                  color: "#4caf50", // Green color for sold items
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                {stats.soldItems}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                sx={{ color: "#333", fontWeight: "bold" }}
              >
                Total Not Sold Items :
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                sx={{
                  color: "#f44336", // Red color for unsold items
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                {stats.notSoldItems}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
};

export default Statistics;
