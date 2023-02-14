import React, { useState } from "react";
import SelectDesks from "../components/SelectDesks";
import ButtonPrimary from "../components/ButtonPrimary";
import "./../styles/pages/NewBooking.scss";
import { NotificationManager } from "react-notifications";
import Select from "react-select";

const NewBooking = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [venue, setVenue] = useState("");
  const [maxRow, setMaxRow] = useState("");
  const [maxColumn, setMaxColumn] = useState("");
  const [unselectedDesks, setUnSelectedDesks] = useState([]);
  const [showDesks, setShowDesks] = useState(false);

  const generateBluePrint = () => {
    console.log("hi");
    setShowDesks(true);
  };

  const bookingTypes = [
    { label: "Classroom", value: "CL" },
    { label: "Computer Center (CC)", value: "CC" },
  ];

  const submitHandler = () => {
    let bluePrint = {};

    for (let i = 0; i < maxRow; i++) {
      for (let j = 0; j < maxColumn; j++) {
        if (!unselectedDesks.includes(`desk-${i}-${j}`)) {
          bluePrint[`desk-${i}-${j}`] = true;
        } else {
          bluePrint[`desk-${i}-${j}`] = false;
        }
      }
    }

    console.log(bluePrint);
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
