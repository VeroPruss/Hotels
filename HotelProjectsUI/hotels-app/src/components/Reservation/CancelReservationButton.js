import React from "react";
import Button from "react-bootstrap/Button";

export default (props) => {
  if (props.status) {
    return (
      <Button variant="danger" onClick={props.cancel}>
        Cancel Reservation
      </Button>
    );
  } else {
    return (
      <Button variant="secondary" disabled>
        Cancelled Reservation
      </Button>
    );
  }
};
