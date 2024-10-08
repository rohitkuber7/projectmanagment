const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const AppError = require("./utils/appError");
const productRouter = require("./route/productRoute");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    origin: true,
    optionsSuccessStatus: 200,
    allowedHeaders: [
      "set-cookie",
      "Content-Type",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Credentials",
    ],
  })
);
app.use("/api/v1/products", productRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`can't find the ${req.originalUrl} url`));
});

module.exports = app;
