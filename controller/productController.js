const Product = require("./../models/productModel");

const AppError = require("./../utils/appError");

const catchAsync = require("./../utils/catchAsync");

exports.getProduct = catchAsync(async (req, res, next) => {
  const products = await Product.find().sort({ dateOfSale: -1 });

  if (!products) {
    return next(new AppError("no product found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: products,
    },
  });
});
// exports.getAllTransactions = catchAsync(async (req, res, next) => {
//   const { search, page = 1, perPage = 10 } = req.query;

//   // Search filter: title, description match and optional price match
//   let searchFilter = {};
//   if (search) {
//     const searchRegex = new RegExp(search, "i"); // case-insensitive regex search
//     searchFilter = {
//       $or: [
//         { title: { $regex: searchRegex } },
//         { description: { $regex: searchRegex } },
//       ],
//     };

//     // Check if the search term can be parsed as a number
//     const priceValue = parseFloat(search);
//     if (!isNaN(priceValue)) {
//       searchFilter.$or.push({ price: priceValue });
//     }
//   }

//   const pageNumber = parseInt(page, 10) || 1;
//   const limit = parseInt(perPage, 10) || 10;
//   const skip = (pageNumber - 1) * limit;

//   const transactions = await Product.find(searchFilter).skip(skip).limit(limit);

//   const totalRecords = await Product.countDocuments(searchFilter);

//   if (!transactions || transactions.length === 0) {
//     return next(new AppError("No transactions found", 404));
//   }

//   res.status(200).json({
//     status: "success",
//     results: transactions.length,
//     totalRecords,
//     data: {
//       transactions,
//     },
//   });
// });
exports.getAllTransactions = catchAsync(async (req, res, next) => {
  const { search, month, page = 1, perPage = 10 } = req.query;

  // Construct the date filter based on the provided month
  let dateFilter = {};
  if (month) {
    const monthIndex = new Date(Date.parse(month + " 1")).getMonth() + 1; // Get month index (1-12)
    dateFilter = {
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, monthIndex],
      },
    };
  }

  // Combine the search and date filters
  let searchFilter = {};
  if (search) {
    const searchRegex = new RegExp(search, "i");
    searchFilter = {
      $or: [
        { title: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
      ],
    };
  }

  const pageNumber = parseInt(page, 10) || 1;
  const limit = parseInt(perPage, 10) || 10;
  const skip = (pageNumber - 1) * limit;

  const transactions = await Product.find({
    ...searchFilter,
    ...dateFilter,
  })
    .skip(skip)
    .limit(limit);

  const totalRecords = await Product.countDocuments({
    ...searchFilter,
    ...dateFilter,
  });

  if (!transactions || transactions.length === 0) {
    return next(new AppError("No transactions found", 404));
  }

  res.status(200).json({
    status: "success",
    results: transactions.length,
    totalRecords,
    data: {
      transactions,
    },
  });
});

exports.getStats = catchAsync(async (req, res, next) => {
  const { month } = req.query;

  if (!month) {
    return next(new AppError("Month is a required parameter", 400));
  }

  const monthMap = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  const monthNumber = monthMap[month];
  if (monthNumber === undefined) {
    return next(new AppError("Invalid month provided", 400));
  }

  const statistics = await Product.aggregate([
    {
      $match: {
        $expr: {
          $eq: [{ $month: "$dateOfSale" }, monthNumber],
        },
      },
    },
    {
      $group: {
        _id: null,
        totalSales: {
          $sum: { $cond: [{ $eq: ["$sold", true] }, "$price", 0] },
        },
        soldItems: { $sum: { $cond: [{ $eq: ["$sold", true] }, 1, 0] } },
        notSoldItems: { $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] } },
      },
    },
  ]);
  if (statistics.length === 0) {
    return res.status(200).json({
      status: "success",
      data: {
        totalSales: 0,
        soldItems: 0,
        notSoldItems: 0,
      },
    });
  }

  const { totalSales, soldItems, notSoldItems } = statistics[0];

  res.status(200).json({
    status: "success",
    data: {
      totalSales,
      soldItems,
      notSoldItems,
    },
  });
});

//pie-chart
exports.getCategoryCounts = catchAsync(async (req, res, next) => {
  const { month } = req.query;

  if (!month) {
    return next(new AppError("Please provide a month", 400));
  }

  const monthMap = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };

  const monthNumber = monthMap[month];
  if (monthNumber === undefined) {
    return next(new AppError("Invalid month provided", 400));
  }

  const categoryCounts = await Product.aggregate([
    {
      $match: {
        $expr: {
          $eq: [{ $month: "$dateOfSale" }, monthNumber + 1], //mi +1 kela because mongodb mdhe 1indexing asta months
        },
      },
    },
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        count: 1,
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      categories: categoryCounts,
    },
  });
});
exports.getBarChartData = catchAsync(async (req, res, next) => {
  const { month } = req.params;

  // Month mapping
  const monthMap = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };
  console.log(month);

  const monthNumber = monthMap[month];
  if (monthNumber === undefined) {
    return next(new AppError("Invalid month", 400));
  }

  //  price ranges define keli ahe itha
  const priceRanges = [
    { min: 0, max: 100 },
    { min: 101, max: 200 },
    { min: 201, max: 300 },
    { min: 301, max: 400 },
    { min: 401, max: 500 },
    { min: 501, max: 600 },
    { min: 601, max: 700 },
    { min: 701, max: 800 },
    { min: 801, max: 900 },
    { min: 901, max: Infinity },
  ];

  // dar price range sathi count store krtoy or count kadtoy asa bolu shkto
  const barChartData = await Promise.all(
    priceRanges.map(async (range) => {
      const count = await Product.countDocuments({
        price: { $gte: range.min, $lte: range.max },
        $expr: {
          $eq: [{ $month: "$dateOfSale" }, monthNumber + 1],
        },
      });
      return { range: `${range.min} - ${range.max}`, count };
    })
  );
  console.log(barChartData);

  res.status(200).json({
    status: "success",
    data: {
      data: barChartData,
    },
  });
});
