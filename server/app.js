const express = require("express");
const cors = require("cors");
const route = require("./routes");

const AppError = require("./utils/appError");

// Start express app
const app = express();

app.use(cors());
app.use("/v1", route);
// 3) ROUTES
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
