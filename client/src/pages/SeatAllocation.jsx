import React from "react";
import "./../styles/pages/SeatAllocation.scss";

import hallDetails from "./../hallModel.json";

const SeatAllocation = () => {
  let totalSudents = 67;
  let halls = [
    { department: "CSE", hall: "ITP-S12" },
    { department: "CSE", hall: "ITP-S13" },
  ];

  let venueBlueprints = [];
  let venueAllocatedBluePrints = [];

  halls.map((hall) => {
    hallDetails.map((singleHallFullDetail) => {
      if (hall.department === singleHallFullDetail.depatment) {
        let avaliableHalls = singleHallFullDetail.halls;

        avaliableHalls.map((singleHall) => {
          if (hall.hall === singleHall.name) {
            venueBlueprints.push({
              name: singleHall.name,
              blueprint: singleHall.bluprint,
              capacity: singleHall.totalDeskCount,
              row: singleHall.noOfDeskRow,
              column: singleHall.noOfDeskColumns,
            });
          }
        });
      }
    });
  });

  console.log(venueBlueprints);

  //arrage the hall
  let desks = [];
  let count = 0;
  let flag = 1;
  venueBlueprints.map((singleVenue) => {
    let row = singleVenue.row;
    let column = singleVenue.column;
    for (let i = 0; i < row; i++) {
      let rowDesks = [];
      if (totalSudents <= 0) break;
      for (let j = 0; j < column; j++) {
        if (totalSudents <= 0) break;
        if (singleVenue.blueprint[`desk-${j}-${i}`]) {
          count += 1;
          totalSudents--;

          rowDesks.push(
            <div key={`desk-${j}-${i}`} className="desk">
              {}
            </div>
          );
        } else {
          console.log(`desk-${j}-${i}`);
        }
      }
      desks.push(rowDesks);
    }
  });
  console.log(count);
  return <div id="seat-allocation-section">{desks}</div>;
};

export default SeatAllocation;
