const express = require("express");

const productController = require("./../controller/productController");

const router = express.Router();

router.get("/", productController.getProduct);
router.get("/transactions", productController.getAllTransactions);
router.get("/statistics", productController.getStats);
router.get("/categorycounts", productController.getCategoryCounts);
router.get("/bar-chart/:month", productController.getBarChartData);
module.exports = router;
