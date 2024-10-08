import React, { useState, useEffect } from "react";
import { getStatistics } from "../api";

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
    <div>
      <h2>Sales Statistics for {month}</h2>
      <select value={month} onChange={handleMonthChange}>
        {months.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <div>Total Sales: {stats.totalSales}</div>
      <div>Sold Items: {stats.soldItems}</div>
      <div>Unsold Items: {stats.notSoldItems}</div>
    </div>
  );
};

export default Statistics;
