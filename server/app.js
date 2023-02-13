const express = require("express");
const cors = require("cors");

const AppError = require("./utils/appError");

// Start express app
const app = express();

app.use(cors());

// 3) ROUTES
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
