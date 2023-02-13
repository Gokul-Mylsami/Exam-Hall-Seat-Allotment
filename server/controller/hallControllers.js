const Halls = require("../model/hallsModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { createOne } = require("./factory.js");
exports.getAllHalls = catchAsync(async (req, res, next) => {
  const doc = await Halls.find({
    hallName: "hall1",
  });
  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});
exports.addHall = catchAsync(async (req, res, next) => {
  const doc = await Halls.create({ hallName: "hall1" });

  res.status(201).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});
