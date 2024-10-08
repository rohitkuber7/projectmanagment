// import React, { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js"; // Import and register chart components

// import { getBarChartData } from "../api";

// // Register necessary chart components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const BarChart = () => {
//   const [data, setData] = useState({});
//   const [month, setMonth] = useState("January");
//   const [salesData, setSalesData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const chartData = await getBarChartData(month);

//         // Check if the data structure is as expected
//         if (chartData && chartData.data && Array.isArray(chartData.data.data)) {
//           const ranges = chartData.data.data.map((item) => item.range);
//           const counts = chartData.data.data.map((item) => item.count);
//           setSalesData(chartData.data.data); // Store sales data for the table
//           setData({
//             labels: ranges,
//             datasets: [
//               {
//                 label: "Product Sales",
//                 data: counts,
//                 backgroundColor: "rgba(75, 192, 192, 0.6)",
//               },
//             ],
//           });
//         } else {
//           console.error("Unexpected data structure:", chartData);
//         }
//       } catch (error) {
//         console.error("Error fetching chart data:", error);
//       }
//     };
//     fetchData();
//   }, [month]);

//   return (
//     <div>
//       <h2>Sales Data by Price Ranges for {month}</h2>
//       <input
//         type="text"
//         placeholder="Enter month..."
//         value={month}
//         onChange={(e) => setMonth(e.target.value)}
//       />

//       {/* Table for displaying data */}
//       <table>
//         <thead>
//           <tr>
//             <th>Price Range</th>
//             <th>Number of Items Sold</th>
//           </tr>
//         </thead>
//         <tbody>
//           {salesData.map((item, index) => (
//             <tr key={index}>
//               <td>{item.range}</td>
//               <td>{item.count}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Bar chart */}
//       {data.labels && data.labels.length > 0 ? (
//         <Bar data={data} />
//       ) : (
//         <p>No data available for the selected month.</p>
//       )}
//     </div>
//   );
// };

// export default BarChart;
// import React, { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import { Chart, CategoryScale, registerables } from "chart.js";
// import { getBarChartData } from "../api";

// // Register components
// Chart.register(CategoryScale, ...registerables);

// const months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// const BarChart = () => {
//   const [data, setData] = useState({});
//   const [month, setMonth] = useState("January");
//   const [salesData, setSalesData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const chartData = await getBarChartData(month);

//         // Check if the data structure is as expected
//         if (chartData && chartData.data && Array.isArray(chartData.data.data)) {
//           const ranges = chartData.data.data.map((item) => item.range);
//           const counts = chartData.data.data.map((item) => item.count);
//           setSalesData(chartData.data.data); // Store sales data for the table
//           setData({
//             labels: ranges,
//             datasets: [
//               {
//                 label: "Product Sales",
//                 data: counts,
//                 backgroundColor: "rgba(75, 192, 192, 0.6)",
//               },
//             ],
//           });
//         } else {
//           console.error("Unexpected data structure:", chartData);
//         }
//       } catch (error) {
//         console.error("Error fetching chart data:", error);
//       }
//     };
//     fetchData();
//   }, [month]);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2 style={{ textAlign: "center" }}>
//         Sales Data by Price Ranges for {month}
//       </h2>

//       {/* Dropdown for month selection */}
//       <div style={{ textAlign: "center", marginBottom: "20px" }}>
//         <select
//           value={month}
//           onChange={(e) => setMonth(e.target.value)}
//           style={{ padding: "8px", fontSize: "16px" }}
//         >
//           {months.map((monthName, index) => (
//             <option key={index} value={monthName}>
//               {monthName}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Table for displaying data */}
//       <table
//         style={{
//           width: "100%",
//           borderCollapse: "collapse",
//           marginBottom: "20px",
//         }}
//       >
//         <thead>
//           <tr>
//             <th style={{ border: "1px solid #ccc", padding: "8px" }}>
//               Price Range
//             </th>
//             <th style={{ border: "1px solid #ccc", padding: "8px" }}>
//               Number of Items Sold
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {salesData.map((item, index) => (
//             <tr key={index}>
//               <td style={{ border: "1px solid #ccc", padding: "8px" }}>
//                 {item.range}
//               </td>
//               <td style={{ border: "1px solid #ccc", padding: "8px" }}>
//                 {item.count}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Bar chart */}
//       <div style={{ maxWidth: "600px", margin: "0 auto" }}>
//         {data.labels && data.labels.length > 0 ? (
//           <Bar
//             data={data}
//             options={{ maintainAspectRatio: false }}
//             height={400}
//           />
//         ) : (
//           <p>No data available for the selected month.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BarChart;
// import React, { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import { Chart, CategoryScale, registerables } from "chart.js";
// import { getBarChartData } from "../api";

// // Register components
// Chart.register(CategoryScale, ...registerables);

// const months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// const BarChart = () => {
//   const [data, setData] = useState({});
//   const [month, setMonth] = useState("January");
//   const [salesData, setSalesData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const chartData = await getBarChartData(month);

//         // Check if the data structure is as expected
//         if (chartData && chartData.data && Array.isArray(chartData.data.data)) {
//           const ranges = chartData.data.data.map((item) => item.range);
//           const counts = chartData.data.data.map((item) => item.count);
//           setSalesData(chartData.data.data); // Store sales data for the table
//           setData({
//             labels: ranges,
//             datasets: [
//               {
//                 label: "Product Sales",
//                 data: counts,
//                 backgroundColor: "rgba(75, 192, 192, 0.6)",
//               },
//             ],
//           });
//         } else {
//           console.error("Unexpected data structure:", chartData);
//         }
//       } catch (error) {
//         console.error("Error fetching chart data:", error);
//       }
//     };
//     fetchData();
//   }, [month]);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2 style={{ textAlign: "center" }}>
//         Sales Data by Price Ranges for {month}
//       </h2>

//       {/* Dropdown for month selection */}
//       <div style={{ textAlign: "center", marginBottom: "20px" }}>
//         <select
//           value={month}
//           onChange={(e) => setMonth(e.target.value)}
//           style={{ padding: "8px", fontSize: "16px" }}
//         >
//           {months.map((monthName, index) => (
//             <option key={index} value={monthName}>
//               {monthName}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Flex container for table and chart */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "flex-start",
//         }}
//       >
//         {/* Table for displaying data */}
//         <table
//           style={{
//             width: "30%",
//             borderCollapse: "collapse",
//             marginRight: "20px",
//             overflow: "hidden",
//           }}
//         >
//           <thead>
//             <tr>
//               <th style={{ border: "1px solid #ccc", padding: "8px" }}>
//                 Price Range
//               </th>
//               <th style={{ border: "1px solid #ccc", padding: "8px" }}>
//                 Number of Items Sold
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {salesData.map((item, index) => (
//               <tr key={index}>
//                 <td style={{ border: "1px solid #ccc", padding: "8px" }}>
//                   {item.range}
//                 </td>
//                 <td style={{ border: "1px solid #ccc", padding: "8px" }}>
//                   {item.count}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Bar chart */}
//         <div style={{ flexGrow: 1, maxWidth: "70%" }}>
//           {data.labels && data.labels.length > 0 ? (
//             <Bar
//               data={data}
//               options={{ maintainAspectRatio: false }}
//               height={400}
//             />
//           ) : (
//             <p>No data available for the selected month.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BarChart;
// src/components/BarChart.js
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, registerables } from "chart.js";
import { getBarChartData } from "../api";

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
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>
        Sales Data by Price Ranges for {month}
      </h2>

      {/* Dropdown for month selection */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          style={{ padding: "8px", fontSize: "16px" }}
        >
          {months.map((monthName, index) => (
            <option key={index} value={monthName}>
              {monthName}
            </option>
          ))}
        </select>
      </div>

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
