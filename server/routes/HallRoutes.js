const express = require("express");
const {
  getAllHalls,
  addHall,
  getStudentHallInfo,
} = require("../controller/hallControllers");
const routes = express.Router();
routes.get("/all", getAllHalls);
routes.post("/add", addHall);
routes.get("/info/:rollnumber", getStudentHallInfo);
module.exports = routes;
