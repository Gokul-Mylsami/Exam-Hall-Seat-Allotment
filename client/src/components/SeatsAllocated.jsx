import React, { useEffect, useState } from "react";
import "./../styles/pages/NewBooking.scss";
// import hallDetails from "./../hallModel.json";
import Loading from "./Loading";

const SeatsAllocated = ({ halls = [] }) => {
  let totalSudents = 15;
  let venueBlueprints = [];
  const [hallDetails, setHallDetails] = useState([]);

  useEffect(() => {
    const fetchHallDetails = async () => {
      const response = await fetch("http://localhost:8000/v1/halls/all");

      const json = await response.json();

      setHallDetails(json.data);
      console.log(json.data);
    };

    fetchHallDetails();
  }, []);
  let desks = [];
  if (halls.length > 0) {
    halls.map((hall) => {
      hallDetails.map((singleHallFullDetail) => {
        console.log(singleHallFullDetail.department);
        if (hall.department === singleHallFullDetail.department) {
          let avaliableHalls = singleHallFullDetail.halls;
          console.log();
          avaliableHalls.map((singleHall) => {
            if (hall.hall === singleHall.name) {
              venueBlueprints.push({
                name: singleHall.name,
                blueprint: singleHall.bluePrint,
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
    let startingRollNo = 1;
    venueBlueprints.map((temp) => {
      console.log(temp["blueprint"]);
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
                <p className="allocated-seat">{"20CSR0" + arr[i][j]}</p>
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
  }

  return <div>{desks}</div>;
};

export default SeatsAllocated;
