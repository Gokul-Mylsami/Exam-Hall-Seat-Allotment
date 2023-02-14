const moongoose = require("moongoose");

const storeDataModel = new moongoose.Schema({});
const storeData = moongoose.model("storeData", storeDataModel);
module.exports;
