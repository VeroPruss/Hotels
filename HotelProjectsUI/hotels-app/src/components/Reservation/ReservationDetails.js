import React from "react";

export default (props) => {
  return (
    <div className="container-fluid reservationDetails">
      <h1>Reservation Details:</h1>
      {Object.entries(props.reservationDetails).map(([key, value]) => (
        <p align="center" key={key}>
          {key} : {value.toString()}
        </p>
      ))}
    </div>
  );
};
