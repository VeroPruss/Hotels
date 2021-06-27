import React, { useState, useEffect } from "react";

import {
  PageModeType,
  ResultTypes,
  InitialMessage,
} from "../../generals/Globals";

import ReservationIdInput from "./ReservationIdInput";
import ReservationDetails from "./ReservationDetails";
import CancelReservationButton from "./CancelReservationButton";
import NewReservationInput from "./NewReservationInput";

import {
  getReservationOperation,
  cancelReservationOperation,
  createReservationOperation,
} from "../../generals/ServerOperations";

export default (props) => {
  const [reservationId, setReservationId] = useState(0);
  const [reservationObject, setReservationObject] = useState({});
  const [showReservation, setShowReservation] = useState(false);
  const [newReservationObject, setNewReservationObject] = useState({});

  useEffect(() => {
    setReservationId(0);
    setReservationObject({});
    setNewReservationObject({});
    setShowReservation(false);
  }, [props.mode]);

  const getReservation = async () => {
    let result = await getReservationOperation(reservationId);
    if (result.result_type === ResultTypes.SUCCESS) {
      setReservationObject(result.result_object);
      setShowReservation(true);
    } else {
      setReservationObject({});
      setShowReservation(false);
    }

    props.handleMessage(result.result_type, result.result_text_msg);
  };

  const cancelReservation = async () => {
    let result = await cancelReservationOperation(reservationId);
    if (result.result_type === ResultTypes.SUCCESS) {
      setReservationObject({ ...reservationObject, status: false });
    }
    props.handleMessage(result.result_type, result.result_text_msg);
  };

  const addReservation = async () => {
    let result = await createReservationOperation(newReservationObject);

    if (result.result_type === ResultTypes.SUCCESS) {
      setReservationObject(result.result_object);
      setShowReservation(true);
      setReservationId(result.result_object.reservation_id);
    } else {
      setReservationObject({});
      setShowReservation(false);
    }

    props.handleMessage(result.result_type, result.result_text_msg);
  };

  const handleReservationIdChange = (reservationId) => {
    if (reservationId > 0) {
      setReservationId(reservationId);
    } else {
      setReservationId(0);
      setShowReservation(false);
      props.handleMessage(InitialMessage.resultType, InitialMessage.message);
    }
  };

  const handleNewReservationChange = (property, value) => {
    setNewReservationObject({ ...newReservationObject, [property]: value });
  };

  const prepareReservationDetails = () => {
    return Object.fromEntries(
      Object.entries(reservationObject).filter(
        ([key, value]) => key !== "status"
      )
    );
  };

  return (
    <div>
      {props.mode === PageModeType.RESERVATION_MODE.GET_RESERVATION && (
        <ReservationIdInput
          handleReservationIdChange={handleReservationIdChange}
          getReservation={getReservation}
        />
      )}
      {props.mode === PageModeType.RESERVATION_MODE.CREATE_RESERVATION && (
        <NewReservationInput
          handlePropertyChange={handleNewReservationChange}
          addReservation={addReservation}
        />
      )}
      {showReservation && (
        <div>
          <ReservationDetails
            reservationDetails={prepareReservationDetails()}
          />
          <CancelReservationButton
            status={reservationObject.status}
            cancel={cancelReservation}
          />
        </div>
      )}
    </div>
  );
};
