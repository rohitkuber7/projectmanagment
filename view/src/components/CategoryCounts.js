// import React, { useState, useEffect } from "react";
// import { getCategoryCounts } from "../api";

// const CategoryCounts = () => {
//   const [counts, setCounts] = useState([]); // Ensure it's an array
//   const [month, setMonth] = useState("January");
//   const [loading, setLoading] = useState(true); // To handle loading state

//   // List of months for the dropdown
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   useEffect(() => {
//     const fetchCounts = async () => {
//       setLoading(true); // Start loading
//       try {
//         const response = await getCategoryCounts(month);
//         if (
//           response.status === "success" &&
//           Array.isArray(response.data.categories)
//         ) {
//           setCounts(response.data.categories); // Extract categories array
//         } else {
//           console.error("Unexpected response format:", response);
//         }
//       } catch (error) {
//         console.error("Error fetching category counts:", error);
//       } finally {
//         setLoading(false); // Stop loading
//       }
//     };

//     fetchCounts();
//   }, [month]);

//   return (
//     <div>
//       <h2>Product Category Counts for {month}</h2>
//       <select
//         value={month}
//         onChange={(e) => setMonth(e.target.value)} // Update month on selection
//       >
//         {months.map((m) => (
//           <option key={m} value={m}>
//             {m}
//           </option>
//         ))}
//       </select>
//       {loading ? ( // Show loading state
//         <div>Loading...</div>
//       ) : (
//         <ul>
//           {counts.length > 0 ? (
//             counts.map((count) => (
//               <li key={count.category}>
//                 {count.category}: {count.count}
//               </li>
//             ))
//           ) : (
//             <li>No data available for this month.</li>
//           )}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default CategoryCounts;
import React, { useState, useEffect } from "react";
import { getCategoryCounts } from "../api";
import { Pie } from "react-chartjs-2"; // Import Pie chart from react-chartjs-2
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

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
    <div>
      <h2>Product Category Counts for {month}</h2>
      <select
        value={month}
        onChange={(e) => setMonth(e.target.value)} // Update month on selection
      >
        {months.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      {loading ? ( // Show loading state
        <div>Loading...</div>
      ) : (
        <ul>
          {counts.length > 0 ? (
            counts.map((count) => (
              <li key={count.category}>
                {count.category}: {count.count}
              </li>
            ))
          ) : (
            <li>No data available for this month.</li>
          )}
        </ul>
      )}

      {counts.length > 0 && ( // Render Pie chart if there are counts
        <div style={{ marginTop: "20px", width: "300px", height: "300px" }}>
          <h3>Category Distribution</h3>
          <Pie data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      )}
    </div>
  );
};

export default CategoryCounts;
