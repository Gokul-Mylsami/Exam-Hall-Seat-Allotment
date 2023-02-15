import React, { useEffect, useState } from "react";
import "./../styles/pages/NewBooking.scss";
import Loading from "./Loading";
import ButtonPrimary from "../components/ButtonPrimary";

const SeatsAllocated = ({ halls = [], totalSudents, session, subject }) => {
  let venueBlueprints = [];
  const [hallDetails, setHallDetails] = useState([]);
  const [storeData, setStoreData] = useState([]);

  const saveHandler = (e) => {
    e.preventDefault();
    console.log(storeData);
  };

  useEffect(() => {
    const fetchHallDetails = async () => {
      const response = await fetch("http://localhost:8000/v1/halls/all");

      const json = await response.json();

      setHallDetails(json.data);
    };

    fetchHallDetails();
  }, []);
  let desks = [];
  if (halls.length > 0) {
    halls.map((hall) => {
      hallDetails.map((singleHallFullDetail) => {
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
          storeData.push({
            table: `desk-${j}-${i}`,
            rollNo:
              startingRollNo > 10
                ? "20CSR0" + startingRollNo
                : "20CSR00" + startingRollNo,
            hall: temp.name,
            session: session,
            subject: subject,
          });
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

  return (
    <div>
      {desks}
      <div>
        <ButtonPrimary
          onClick={(e) => {
            saveHandler(e);
          }}
        >
          Save
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default SeatsAllocated;
