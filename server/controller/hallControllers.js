const SeperateHalls = require("../model/SeperateHallModels");
const Halls = require("../model/hallsModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { createOne } = require("./factory.js");
exports.getAllHalls = catchAsync(async (req, res, next) => {
  const doc = Halls.find({})
    .populate("halls")
    .exec((err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(data);
      return res.status(200).json({
        status: "success",
        data: data,
      });
    });
});
exports.addHall = catchAsync(async (req, res, next) => {
  const { department, noOfHalls, noOfCC, halls } = req.body;
  const selectedHalls = await Halls.findOne({ department });
  if (selectedHalls) {
    const newHallIds = [];
    const errorHallIds = [];

    // console.log(selectedHalls);
    const data = halls.map(async (element) => {
      element.department = selectedHalls._id;
      console.log(element);
      const data = await SeperateHalls.create(element)
        .then(async (halls) => {
          await Halls.updateOne(
            { department },
            { $push: { halls: halls._id } }
          );
        })
        .catch((err) => {
          console.log(err);
          errorHallIds.push(halls._id);
        });
      return data;
    });
    return res.json({ status: "success", newHallIds, errorHallIds, data });
  } else {
    const hall = await Halls.create({
      department,
    })
      .then(async (result) => {
        const newHallIds = [];
        const errorHallIds = [];

        // console.log(selectedHalls);
        const data = halls.map(async (element) => {
          element.department = result._id;
          // console.log(element);
          const data = await SeperateHalls.create(element)
            .then(async (halls) => {
              await Halls.updateOne(
                { department },
                { $push: { halls: halls._id } }
              );
            })
            .catch((err) => {
              console.log(err);
              errorHallIds.push(halls._id);
            });
          return data;
        });
      })
      .catch((err) => {
        console.log(err);
      });

    res.status(201).json({
      status: "success",
      data: {
        data: hall,
      },
    });
  }
});
