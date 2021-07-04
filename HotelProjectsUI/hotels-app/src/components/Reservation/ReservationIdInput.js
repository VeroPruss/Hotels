import React from "react";
import Button from "react-bootstrap/Button";

export default (props) => {
  return (
    <div>
      <label>Please enter reservaion id:</label>
      {"  "}
      <input
        id="reservationId"
        type="number"
        onChange={(e) => {
          props.handleReservationIdChange(e.target.value);
        }}
      ></input>
      {"  "}
      <Button variant="primary" size="md" onClick={props.getReservation}>
        Display
      </Button>
    </div>
  );
};
