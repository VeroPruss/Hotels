import axios from "axios";

import { ResultTypes } from "./Globals";

const URLS = {
  GET_RESERVATION_URL: "http://localhost:8081/api/reservation/",
  CANCEL_RESERVATION_URL: "http://localhost:8081/api/reservation/cancel/",
  CREATE_RESERVATION_URL: "http://localhost:8081/api/reservation",
  GET_ROOM_INVENTORY_URL: "http://localhost:8081/api/hotels/inventory/",
};

const handleSystemError = (message) => {
  return {
    result_type: ResultTypes.SYSTEM_ERROR,
    result_text_msg: message,
  };
};

export const getReservationOperation = async (reservationId) => {
  const getReservationUrl = URLS.GET_RESERVATION_URL + reservationId;
  const response = await axios
    .get(getReservationUrl)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return handleSystemError(error.message);
    });
  return response.data || response;
};

export const cancelReservationOperation = async (reservationId) => {
  const cancelReservationUrl = URLS.CANCEL_RESERVATION_URL + reservationId;
  const response = await axios
    .put(cancelReservationUrl)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return handleSystemError(error.message);
    });
  console.log(response);
  return response.data || response;
};

export const createReservationOperation = async (newReservationObject) => {
  const response = await axios
    .post(URLS.CREATE_RESERVATION_URL, newReservationObject)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return handleSystemError(error.message);
    });

  return response.data || response;
};

export const getRoomInventoryOperation = async (hotelId, datesRangeObject) => {
  const getRoomInventoryUrl = URLS.GET_ROOM_INVENTORY_URL + hotelId;
  const response = await axios
    .get(getRoomInventoryUrl, { params: datesRangeObject })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return handleSystemError(error.message);
    });

  return response.data || response;
};
