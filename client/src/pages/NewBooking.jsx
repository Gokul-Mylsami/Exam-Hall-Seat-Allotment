import React, { useState } from "react";
import SelectDesks from "../components/SelectDesks";
import ButtonPrimary from "../components/ButtonPrimary";
import "./../styles/pages/NewBooking.scss";
import { NotificationManager } from "react-notifications";
import Select from "react-select";

const NewBooking = () => {
  // const [name, setName] = useState("");
  // const [type, setType] = useState("");
  // const [venue, setVenue] = useState("");
  // const [maxRow, setMaxRow] = useState("");
  // const [maxColumn, setMaxColumn] = useState("");
  // const [unselectedDesks, setUnSelectedDesks] = useState([]);
  // const [showDesks, setShowDesks] = useState(false);
  // const [bluePrint, setBluePrint] = useState({})
  // const [name, setName] = useState("");
  // temporarily
  const [department, setDepartment] = useState("CSE")
  const [name, setName] = useState("ITP-S12");
  const [type, setType] = useState("CC");
  const [venue, setVenue] = useState("KEC-CSE-S12");
  const [maxRow, setMaxRow] = useState("3");
  const [maxColumn, setMaxColumn] = useState("3");
  const [unselectedDesks, setUnSelectedDesks] = useState([]);
  const [showDesks, setShowDesks] = useState(false);
  const [bluePrint, setBluePrint] = useState({})

  const generateBluePrint = () => {
    // console.log("hi");
    setShowDesks(true);
  };
  const saveData = async () => {
    console.log(type);

    // ref
    const da = {
      "type": "CC",
      "name": "ITP-CC3",
      "venue": "IT PARK - CSE 1nd Floor - CC03",
      "noOfComputers": 40,
      "noOfDeskRow": 4,
      "noOfDeskColumns": 9,
      "additionalComputers": 4,
      "bluePrint": {
        "desk-0-0": true,
        "desk-0-1": true,
        "desk-0-2": false,
        "desk-0-3": false,
        "desk-0-4": true,
        "desk-0-5": true,
        "desk-1-0": true,
        "desk-1-1": true,
        "desk-1-2": true,
        "desk-1-3": true,
        "desk-1-4": true,
        "desk-1-5": true,
        "desk-2-0": true,
        "desk-2-1": true,
        "desk-2-2": true,
        "desk-2-3": true,
        "desk-2-4": true,
        "desk-2-5": true,
        "desk-3-0": true,
        "desk-3-1": true,
        "desk-3-2": true,
        "desk-3-3": true,
        "desk-3-4": true,
        "desk-3-5": true,
        "desk-4-0": true,
        "desk-4-1": true,
        "desk-4-2": true,
        "desk-4-3": true,
        "desk-4-4": true,
        "desk-4-5": true,
        "desk-5-0": true,
        "desk-5-1": true,
        "desk-5-2": true,
        "desk-5-3": true,
        "desk-5-4": true,
        "desk-5-5": true
      }
    }
    const save = type == "CC" ? {
      name, type, venue, noOfDeskRow: maxRow, noOfDeskColumns: maxColumn, bluePrint, capacity: { one: maxRow * maxColumn - unselectedDesks.length }, noOfComputers: maxColumn * maxRow
    } : type == "CL" ? {
      name, type, venue, noOfDeskRow: maxRow, noOfDeskColumns: maxColumn, bluePrint, capacity: { one: maxRow * maxColumn - unselectedDesks.length }, totalDeskCount: maxColumn * maxRow
    } : null;
    console.log(save);
    const response = await fetch("http://localhost:8000/v1/halls/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ department, halls: save }),
    })
      .then(async doc => {
        console.log(await doc.json());
      }).catch(err => {
        console.log(err);
      })
  }
  const bookingTypes = [
    { label: "Classroom", value: "CL" },
    { label: "Computer Center (CC)", value: "CC" },
  ];

  const submitHandler = () => {


    for (let i = 0; i < maxRow; i++) {
      for (let j = 0; j < maxColumn; j++) {
        const tempBlueprint = bluePrint;
        if (!unselectedDesks.includes(`desk-${i}-${j}`)) {
          tempBlueprint[`desk-${i}-${j}`] = true;
        } else {
          tempBlueprint[`desk-${i}-${j}`] = false;
        }
        setBluePrint(tempBlueprint);
      }
    }
    // console.log(bluePrint);
    saveData();
  };

  return (
    <div id="new-booking-section">
      <div>
        <div className="input-field-container">
          <label className="input-field-label">Name :</label>
          <input
            className="input-field"
            placeholder="Eg. ITP-S12"
            type={"text"}
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="input-field-container">
          <label className="input-field-label">Type :</label>
          <div className="select-field-container">
            <Select
              options={bookingTypes}
              name="type"
              onChange={(e) => {
                setType(e.value);
              }}
            />
          </div>
        </div>
        <div className="input-field-container">
          <label className="input-field-label">Venue : </label>
          <input
            type="text"
            className="input-field"
            placeholder="Eg. IT PARK - CSE 2nd Floor - S12"
            name="venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          />
        </div>
        <div className="input-field-container">
          <label className="input-field-label">Max Row : </label>
          <input
            className="input-field number"
            placeholder="Max row"
            value={maxRow}
            type={"number"}
            onChange={(e) => {
              setShowDesks(false);
              if (e.target.value <= 20) setMaxRow(e.target.value);
              else {
                NotificationManager.warning(
                  "Value should be less than 20",
                  "Warning",
                  5000
                );
              }
            }}
          />
        </div>
        <div className="input-field-container">
          <label className="input-field-label">Max Column : </label>
          <input
            className="input-field number"
            placeholder="Max col"
            value={maxColumn}
            type={"number"}
            onChange={(e) => {
              setShowDesks(false);
              if (e.target.value <= 20) setMaxColumn(e.target.value);
              else {
                NotificationManager.warning(
                  "Value should be less than 20",
                  "Warning",
                  5000
                );
              }
            }}
          />
        </div>
        <div className="button-container">
          <ButtonPrimary
            style={{ borderRadius: 2 }}
            onClick={() => {
              generateBluePrint();
            }}
          >
            <p>Show Blueprint</p>
          </ButtonPrimary>
        </div>
      </div>
      <div className="desks">
        {showDesks && (
          <>
            <p className="seats-available">
              Capacity - {maxRow * maxColumn - unselectedDesks.length}
            </p>
            <SelectDesks
              key={unselectedDesks}
              unselectedDesks={unselectedDesks}
              setUnSelectedDesks={setUnSelectedDesks}
              maxColumn={maxColumn}
              maxRow={maxRow}
            />
            <div className="book">
              <ButtonPrimary
                style={{ borderRadius: 2 }}
                onClick={submitHandler}
              >
                Save Hall
              </ButtonPrimary>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewBooking;
