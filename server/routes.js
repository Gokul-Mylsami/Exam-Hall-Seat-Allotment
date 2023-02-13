const express = require("express");
const hallRoutes = require("./routes/HallRoutes");
const router = express.Router();
router.use("/halls", hallRoutes);

module.exports = router;
