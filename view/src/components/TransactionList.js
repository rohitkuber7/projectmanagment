// // src/components/TransactionList.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const TransactionList = () => {
//   const [transactions, setTransactions] = useState([]); // Initialize transactions as an empty array
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState("March");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const perPage = 10;

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

//   const fetchTransactions = async () => {
//     try {
//       // Fetching transactions for the selected month
//       const response = await axios.get(
//         `http://localhost:3000/api/v1/products/transactions?search=${searchTerm}&month=${selectedMonth}&page=${currentPage}&perPage=${perPage}`
//       );

//       // Adjust the way you access the transaction data based on the new structure
//       setTransactions(response.data.data.transactions || []); // Use the correct path to access transactions
//       setTotalPages(Math.ceil(response.data.totalRecords / perPage)); // Calculate total pages based on totalRecords
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, [searchTerm, currentPage, selectedMonth]); // Trigger fetch when searchTerm, currentPage, or selectedMonth changes

//   return (
//     <div>
//       <h2>Transaction Dashboard</h2>
//       <div style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           placeholder="Search transaction"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <select
//           value={selectedMonth}
//           onChange={(e) => setSelectedMonth(e.target.value)}
//         >
//           {months.map((month) => (
//             <option key={month} value={month}>
//               {month}
//             </option>
//           ))}
//         </select>
//       </div>
//       <table style={{ width: "100%", border: "1px solid #ccc" }}>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Price</th>
//             <th>Category</th>
//             <th>Sold</th>
//             <th>Image</th>
//           </tr>
//         </thead>
//         <tbody>
//           {transactions.length > 0 ? ( // Check if transactions is not empty
//             transactions.map((transaction) => (
//               <tr key={transaction.id}>
//                 <td>{transaction.id}</td>
//                 <td>{transaction.title}</td>
//                 <td>{transaction.description}</td>
//                 <td>{transaction.price}</td>
//                 <td>{transaction.category}</td>
//                 <td>{transaction.sold ? "Yes" : "No"}</td>
//                 <td>
//                   <img
//                     src={transaction.image}
//                     alt={transaction.title}
//                     style={{ width: "50px", height: "50px" }}
//                   />
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="7" style={{ textAlign: "center" }}>
//                 No transactions found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//       <div>
//         <p>Page No: {currentPage}</p>
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         <button
//           onClick={() =>
//             setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//           }
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//         <span> Per Page: {perPage}</span>
//       </div>
//     </div>
//   );
// };

// export default TransactionList;
// src/components/TransactionList.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const TransactionList = () => {
//   const [transactions, setTransactions] = useState([]); // Initialize transactions as an empty array
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState("March");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const perPage = 10;

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

//   const fetchTransactions = async () => {
//     try {
//       // Fetching transactions for the selected month
//       const response = await axios.get(
//         `http://localhost:3000/api/v1/products/transactions?search=${searchTerm}&month=${selectedMonth}&page=${currentPage}&perPage=${perPage}`
//       );

//       // Adjust the way you access the transaction data based on the new structure
//       setTransactions(response.data.data.transactions || []); // Use the correct path to access transactions
//       setTotalPages(Math.ceil(response.data.totalRecords / perPage)); // Calculate total pages based on totalRecords
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//     }
//   };

//   // Use a single function to handle fetching transactions on search submission
//   const handleSearchSubmit = (e) => {
//     e.preventDefault(); // Prevent default form submission
//     fetchTransactions(); // Fetch transactions with the current search term
//   };

//   // Fetch transactions when currentPage, selectedMonth changes
//   useEffect(() => {
//     fetchTransactions(); // Fetch transactions when these values change
//   }, [currentPage, selectedMonth]);

//   return (
//     <div>
//       <h2>Transaction Dashboard</h2>
//       <div style={{ marginBottom: "20px" }}>
//         <form onSubmit={handleSearchSubmit}>
//           <input
//             type="text"
//             placeholder="Search transaction"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button type="submit">Search</button>
//           <button
//             type="button"
//             onClick={() => {
//               setSearchTerm(""); // Clear the search term
//               window.location.reload(); // Refresh the page to load default transactions
//             }}
//           >
//             Clear Search
//           </button>
//           <select
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(e.target.value)}
//           >
//             {months.map((month) => (
//               <option key={month} value={month}>
//                 {month}
//               </option>
//             ))}
//           </select>
//         </form>
//       </div>
//       <table style={{ width: "100%", border: "1px solid #ccc" }}>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Price</th>
//             <th>Category</th>
//             <th>Sold</th>
//             <th>Image</th>
//           </tr>
//         </thead>
//         <tbody>
//           {transactions.length > 0 ? ( // Check if transactions is not empty
//             transactions.map((transaction) => (
//               <tr key={transaction.id}>
//                 <td>{transaction.id}</td>
//                 <td>{transaction.title}</td>
//                 <td>{transaction.description}</td>
//                 <td>{transaction.price}</td>
//                 <td>{transaction.category}</td>
//                 <td>{transaction.sold ? "Yes" : "No"}</td>
//                 <td>
//                   <img
//                     src={transaction.image}
//                     alt={transaction.title}
//                     style={{ width: "50px", height: "50px" }}
//                   />
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="7" style={{ textAlign: "center" }}>
//                 No transactions found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//       <div>
//         <p>Page No: {currentPage}</p>
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         <button
//           onClick={() =>
//             setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//           }
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//         <span> Per Page: {perPage}</span>
//       </div>
//     </div>
//   );
// };

// export default TransactionList;
import React, { useState, useEffect } from "react";
import axios from "axios";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]); // Initialize transactions as an empty array
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
      // Fetching transactions for the selected month
      const response = await axios.get(
        `http://localhost:3000/api/v1/products/transactions?search=${searchTerm}&month=${selectedMonth}&page=${currentPage}&perPage=${perPage}`
      );

      setTransactions(response.data.data.transactions || []); // Use the correct path to access transactions
      setTotalPages(Math.ceil(response.data.totalRecords / perPage)); // Calculate total pages based on totalRecords
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  // Use a single function to handle fetching transactions on search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    fetchTransactions(); // Fetch transactions with the current search term
  };

  // Fetch transactions when currentPage or selectedMonth changes
  useEffect(() => {
    fetchTransactions(); // Fetch transactions when these values change
  }, [currentPage, selectedMonth]);

  // Fetch transactions for the selected month when search term is cleared
  const handleClearSearch = () => {
    setSearchTerm(""); // Clear the search term
    fetchTransactions(); // Fetch transactions for the selected month
    // Reload the page
    window.location.reload(); // Refresh the page to load default transactions
  };

  return (
    <div>
      <h2>Transaction Dashboard</h2>
      <div style={{ marginBottom: "20px" }}>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search transaction"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
          <button type="button" onClick={handleClearSearch}>
            Clear Search
          </button>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </form>
      </div>
      <table style={{ width: "100%", border: "1px solid #ccc" }}>
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
          {transactions.length > 0 ? ( // Check if transactions is not empty
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
      <div>
        <p>Page No: {currentPage}</p>
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
        <span> Per Page: {perPage}</span>
      </div>
    </div>
  );
};

export default TransactionList;
