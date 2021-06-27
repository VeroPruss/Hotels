import React from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import { PageModeType } from "../generals/Globals";

export default (props) => {
  const handleChange = (e) => {
    props.changeMode(e.target.value);
  };

  return (
    <ButtonGroup size="lg" className="mb-4" aria-label="Basic example">
      <Button
        variant="primary"
        value={PageModeType.RESERVATION_MODE.GET_RESERVATION}
        onClick={handleChange}
      >
        Display reservation
      </Button>
      <Button
        variant="primary"
        value={PageModeType.RESERVATION_MODE.CREATE_RESERVATION}
        onClick={handleChange}
      >
        Create Reservation
      </Button>
      <Button
        variant="primary"
        value={PageModeType.GET_ROOMS_LIST}
        onClick={handleChange}
      >
        Room inventory
      </Button>
    </ButtonGroup>
  );
};
