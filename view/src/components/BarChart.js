import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, registerables } from "chart.js";
import { getBarChartData } from "../api";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// Register components
Chart.register(CategoryScale, ...registerables);

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

const BarChart = () => {
  const [data, setData] = useState({});
  const [month, setMonth] = useState("January");
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const chartData = await getBarChartData(month);

        // Check if the data structure is as expected
        if (chartData && chartData.data && Array.isArray(chartData.data.data)) {
          const ranges = chartData.data.data.map((item) => item.range);
          const counts = chartData.data.data.map((item) => item.count);
          setSalesData(chartData.data.data); // Store sales data for the table
          setData({
            labels: ranges,
            datasets: [
              {
                label: "Product Sales",
                data: counts,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
              },
            ],
          });
        } else {
          console.error("Unexpected data structure:", chartData);
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchData();
  }, [month]);

  return (
    <div style={{ marginLeft: "20px", marginRight: " 20px" }}>
      <h2 style={{ color: "#17202a" }}>
        Sales Data by Price Ranges for {month}
      </h2>

      {/* Dropdown for month selection */}
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

      {/* Flex container for table and chart */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {/* Table for displaying data */}
        <table
          style={{
            width: "30%",
            borderCollapse: "collapse",
            marginRight: "20px",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Price Range
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Number of Items Sold
              </th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((item, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {item.range}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {item.count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Bar chart */}
        <div style={{ flexGrow: 1, maxWidth: "70%" }}>
          {loading ? ( // Show loading animation
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <p>Loading...</p>{" "}
              {/* You can replace this with a spinner if you have one */}
            </div>
          ) : data.labels && data.labels.length > 0 ? (
            <Bar
              data={data}
              options={{ maintainAspectRatio: false }}
              height={400}
            />
          ) : (
            <p>No data available for the selected month.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BarChart;
