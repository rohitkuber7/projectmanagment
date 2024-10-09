import React, { useState, useEffect } from "react";
import { getCategoryCounts } from "../api";
import { Pie } from "react-chartjs-2"; // Import Pie chart from react-chartjs-2
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// Register necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryCounts = () => {
  const [counts, setCounts] = useState([]); // Ensure it's an array
  const [month, setMonth] = useState("January");
  const [loading, setLoading] = useState(true); // To handle loading state

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

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true); // Start loading
      try {
        const response = await getCategoryCounts(month);
        if (
          response.status === "success" &&
          Array.isArray(response.data.categories)
        ) {
          setCounts(response.data.categories); // Extract categories array
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Error fetching category counts:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchCounts();
  }, [month]);

  // Prepare data for the pie chart
  const chartData = {
    labels: counts.map((count) => count.category),
    datasets: [
      {
        label: "Category Counts",
        data: counts.map((count) => count.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
      },
    ],
  };

  return (
    <div style={{ marginLeft: "20px", marginRight: " 20px" }}>
      <h2 style={{ color: "#17202a" }}>Product Category Counts for {month}</h2>
      <Box
        sx={{
          width: "250px", // Set the desired width
          height: "60px", // Set a specific height
          margin: "10px", // Add margin for spacing
          display: "flex", // Use flexbox for alignment
          alignItems: "center", // Center
          marginLeft: "20px",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Month</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
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

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            flex: 1,
            marginRight: "20px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          {loading ? ( // Show loading state
            <div>Loading...</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th
                    style={{
                      borderBottom: "2px solid #ccc",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    Product Category
                  </th>
                  <th
                    style={{
                      borderBottom: "2px solid #ccc",
                      padding: "10px",
                      textAlign: "right",
                    }}
                  >
                    Count
                  </th>
                </tr>
              </thead>
              <tbody>
                {counts.length > 0 ? (
                  counts.map((count) => (
                    <tr key={count.category}>
                      <td
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid #eee",
                        }}
                      >
                        {count.category}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid #eee",
                          textAlign: "right",
                        }}
                      >
                        <strong>{count.count}</strong>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="2"
                      style={{ padding: "10px", textAlign: "center" }}
                    >
                      No data available for this month.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {counts.length > 0 && ( // Render Pie chart if there are counts
          <div
            style={{
              flex: 1,
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3 style={{ marginBottom: "20px" }}>Category Distribution</h3>
            <div style={{ width: "100%", height: "300px" }}>
              <Pie data={chartData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryCounts;
