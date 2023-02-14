const express = require("express");
const cors = require("cors");
const route = require("./routes");
const bodyParser = require("body-parser");
const AppError = require("./utils/appError");
const universalErrorHandler = require("./controller/errorController");
const morgan = require("morgan");

// Start express app
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("tiny"));
app.use("/v1", route);
// 3) ROUTES
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//UNIVERAL ERROR HANDLING FUNCTION
app.use(universalErrorHandler);
module.exports = app;
