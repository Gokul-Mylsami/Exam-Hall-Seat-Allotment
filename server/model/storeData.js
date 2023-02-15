const mongoose = require("mongoose");
const Halls = require("./hallsModel");

const storeDataModel = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  session: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  ccNeeded: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  blacklistedStudents: {
    type: String,
    required: true,
  },
  departmentsAllowed: {
    type: [String],
    required: true,
  },
  classAttendingExam: {
    type: [String],
    required: true,
  },
  hallsUsed: {
    type: [String],
    required: true,
  },
  hallAssigned: {
    type: [
      {
        hallName: {
          type: String,
          required: true,
        },
        studentsPerDesk: {
          type: Number,
          required: true,
        },
        blueprint: {
          type: Map,
          of: String,
          required: true,
        },
        startingRollNo: {
          type: [
            {
              department: {
                type: String,
                required: true,
              },
              startingNumber: {
                type: Number,
                required: true,
              },
              endingNumber: {
                type: Number,
                required: true,
              },
              year: {
                type: Number,
                required: true,
              },
              class: {
                type: String,
                required: true,
              },
            },
          ],
          required: true,
        },
      },
    ],
    required: true,
  },
});
const storeData = mongoose.model("storeData", storeDataModel);
module.exports = storeDataModel;
