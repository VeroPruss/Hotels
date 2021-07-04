import React from "react";
import Button from "react-bootstrap/Button";

export default (props) => {
  const handleDateChange = (e) => {
    props.handleQueryDatesChange(e.target.name, e.target.value);
  };

  return (
    <div>
      <p>Please enter room inventory query details: </p>
      <label for="hotel_id">Room id:</label>
      {"  "}
      <input
        type="number"
        name="hotel_id"
        onChange={(e) => {
          props.handleHotelIdChange(e.target.value);
        }}
      ></input>
      <br></br>
      <br></br>
      <label for="date_from">Arrival date:</label>
      {"  "}
      <input type="date" name="date_from" onChange={handleDateChange}></input>
      <br></br>
      <br></br>
      <label for="date_to">Departure date:</label>
      {"  "}
      <input type="date" name="date_to" onChange={handleDateChange}></input>
      <br></br>
      <br></br>
      <Button variant="primary" size="md" onClick={props.getRoomInventory}>
        Query
      </Button>
      <br></br>
    </div>
  );
};
