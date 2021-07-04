import React from "react";
import Button from "react-bootstrap/Button";

export default (props) => {
  const handleInputChange = (e) => {
    props.handlePropertyChange(e.target.name, e.target.value);
  };

  return (
    <div>
      <label for="room_id">Room id:</label>
      {"  "}
      <input type="number" name="room_id" onChange={handleInputChange}></input>
      <br></br>
      <br></br>
      <label for="arrival_date">Arrival date:</label>
      {"  "}
      <input
        type="date"
        name="arrival_date"
        onChange={handleInputChange}
      ></input>
      <br></br>
      <br></br>
      <label for="departure_date">Departure date:</label>
      {"  "}
      <input
        type="date"
        name="departure_date"
        onChange={handleInputChange}
      ></input>
      <br></br>
      <br></br>
      <Button variant="primary" size="md" onClick={props.addReservation}>
        Create
      </Button>
      <br></br>
    </div>
  );
};
