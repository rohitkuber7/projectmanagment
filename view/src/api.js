// src/api.js
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/products";

export const getAllTransactions = async (
  page = 1,
  perPage = 10,
  search = ""
) => {
  const response = await axios.get(`${API_URL}/transactions`, {
    params: { page, perPage, search },
  });
  return response.data;
};

export const getStatistics = async (month) => {
  const response = await axios.get(`${API_URL}/statistics`, {
    params: { month },
  });
  return response.data;
};

export const getCategoryCounts = async (month) => {
  const response = await axios.get(`${API_URL}/categorycounts`, {
    params: { month },
  });
  return response.data;
};

export const getBarChartData = async (month) => {
  const response = await axios.get(`${API_URL}/bar-chart/${month}`);
  return response.data;
};
