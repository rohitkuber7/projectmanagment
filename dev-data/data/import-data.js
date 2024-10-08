const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./../../models/productModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {}).then(() => console.log("DB connection successful!"));

const Products = JSON.parse(
  fs.readFileSync(`${__dirname}/products.json`, "utf-8")
);

const importData = async () => {
  try {
    await Product.create(Products);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
}
