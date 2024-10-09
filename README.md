# Product Management System

This project is a **Product Sales Management System** built using **Node.js**, **Express**, and **MongoDB**. The system provides an API for managing product data, retrieving transaction statistics, and generating various reports, including category counts and sales data across different price ranges.

## Features

- Retrieve a list of products, transactions, and statistics.
- Get transaction data with search, filter, and pagination options.
- View product sales statistics, including total sales, sold items, and unsold items.
- Generate bar charts for product sales within specific price ranges.
- Retrieve product category counts for sales data.
- Easily import product data from a JSON file.

## Technologies Used

- **Node.js** - JavaScript runtime for building server-side applications.
- **Express.js** - Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB** - NoSQL database for storing product and transaction data.
- **Mongoose** - MongoDB object modeling for Node.js.
- **dotenv** - Loads environment variables from a `.env` file.
- **Cors** - For handling cross-origin requests.

## API Endpoints

### 1. Get All Products
- **Endpoint**: `/api/v1/products/`
- **Method**: `GET`
- **Description**: Retrieves a list of all products, sorted by date of sale in descending order.

### 2. Get All Transactions
- **Endpoint**: `/api/v1/products/transactions`
- **Method**: `GET`
- **Query Parameters**:
  - `search` (optional): Search products by title, description, or price.
  - `page` (optional): Specify the page number for pagination. Default is 1.
  - `perPage` (optional): Specify the number of items per page. Default is 10.
- **Description**: Retrieves transactions with search, filter, and pagination functionality.

### 3. Get Product Sales Statistics
- **Endpoint**: `/api/v1/products/statistics`
- **Method**: `GET`
- **Query Parameters**:
  - `month` (required): The month name (e.g., January, February).
- **Description**: Retrieves statistics on total sales, sold items, and unsold items for a specific month.

### 4. Get Category Counts (Pie Chart Data)
- **Endpoint**: `/api/v1/products/categorycounts`
- **Method**: `GET`
- **Query Parameters**:
  - `month` (required): The month name (e.g., January, February).
- **Description**: Retrieves counts of products sold, grouped by category, for a specific month.

### 5. Get Bar Chart Data (Price Ranges)
- **Endpoint**: `/api/v1/products/bar-chart/:month`
- **Method**: `GET`
- **URL Parameters**:
  - `month` (required): The month name (e.g., January, February).
- **Description**: Retrieves product sales data categorized by price ranges for a specific month.

## Controller Logic

1. **getProduct**: Fetches and returns all products from the database, sorted by the most recent date of sale.
2. **getAllTransactions**: Supports filtering transactions by title, description, and price. Provides pagination and a total record count for large datasets.
3. **getStats**: Aggregates and returns the total sales, number of sold items, and unsold items for a given month using MongoDB’s aggregation pipeline.
4. **getCategoryCounts**: Groups products by category and returns counts for each category based on sales data for a given month.
5. **getBarChartData**: Splits products into price ranges and counts the number of products in each range for a specific month.

## Database Seed Script

The project includes a seed script for importing product data from a JSON file into MongoDB.

- **How to Run**:
  ```bash
  node data/import.js --import


## Demo API Endpoints

You can test the following API endpoints for demonstration purposes. These endpoints provide various functionalities related to product transactions, statistics, and data visualization.

### 1. Get All Transactions
- **Endpoint**: [GET](http://localhost:3000/api/v1/products/transactions)
- **Description**: Retrieves a list of all transactions with pagination. By default, it returns the first page with a predefined number of items per page.

### 2. Get Paginated Transactions
- **Endpoint**: [GET](http://localhost:3000/api/v1/products/transactions?page=2&perPage=5)
- **Description**: Retrieves a paginated list of transactions. This example retrieves the second page with 5 transactions per page. You can adjust the `page` and `perPage` query parameters to navigate through different pages of results.

### 3. Search Transactions
- **Endpoint**: [GET](http://localhost:3000/api/v1/products/transactions?search=jacket&page=1&perPage=5)
- **Description**: Retrieves transactions filtered by the search term "jacket." This example fetches the first page with 5 results per page. You can modify the `search` parameter to find specific products.

### 4. Get Product Sales Statistics
- **Endpoint**: [GET](http://localhost:3000/api/v1/products/statistics?month=November)
- **Description**: Retrieves sales statistics for the specified month (November). It includes total sales, sold items, and unsold items.

### 5. Get Product Category Counts
- **Endpoint**: [GET](http://localhost:3000/api/v1/products/categorycounts?month=January)
- **Description**: Retrieves counts of products sold, grouped by category, for the specified month (January). This data can be useful for visualizing sales distribution across different product categories.

### 6. Get Bar Chart Data (Price Ranges)
- **Endpoint**: [GET](http://localhost:3000/api/v1/products/bar-chart/January)
- **Description**: Retrieves product sales data categorized by price ranges for the specified month (January). This data can be used to generate bar charts for visual analysis of sales trends.

