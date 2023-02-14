import React from "react";
import "./../styles/pages/SeatAllocation.scss";

import hallDetails from "./../hallModel.json";

const SeatAllocation = () => {
  let totalSudents = 75;
  let halls = [
    { department: "CSE", hall: "ITP-S12" },
    { department: "CSE", hall: "ITP-S13" },
    { department: "CSE", hall: "ITP-S14" },
  ];

  let venueBlueprints = [];

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

  let desks = [];
  let startingRollNo = 1;
  venueBlueprints.map((temp) => {
    const rowValue = temp.row;
    const colValue = temp.column;
    const arr = [];
    for (let i = 0; i < colValue; i++) {
      arr[i] = [];

      for (let j = 0; j < rowValue; j++) {
        arr[i][j] = 0;
      }
    }

    for (let i = 0; i < colValue; i++) {
      if (startingRollNo > totalSudents) {
        break;
      }
      for (let j = 0; j < rowValue; j++) {
        if (temp["blueprint"][`desk-${j}-${i}`] === false) {
          continue;
        }
        arr[j][i] = startingRollNo;
        startingRollNo++;

        if (startingRollNo > totalSudents) {
          break;
        }
      }

      if (startingRollNo > totalSudents) {
        break;
      }
    }

    for (let i = 0; i < rowValue; i++) {
      let rowDesk = [];

      for (let j = 0; j < colValue; j++) {
        if (arr[i][j] === 0) {
          rowDesk.push(<div className="desk"></div>);
        } else {
          rowDesk.push(
            <div className="desk">
              <p>{temp.name}</p>
              <h1>{"20CSR0" + arr[i][j]}</h1>
            </div>
          );
        }
      }

      desks.push(
        <div className="desk-row" key={`${Math.random()}-desk${i}`}>
          {rowDesk}
        </div>
      );
    }
  });

  return <div>{desks}</div>;
};

export default SeatAllocation;
