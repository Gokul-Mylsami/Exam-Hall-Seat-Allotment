const express = require("express");
const { getAllHalls, addHall } = require("../controller/hallControllers");
const routes = express.Router();
routes.get("/all", getAllHalls);
routes.post("/add", addHall);
module.exports = routes;
