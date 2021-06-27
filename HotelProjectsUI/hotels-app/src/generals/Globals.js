export const PageModeType = {
  RESERVATION_MODE: {
    GET_RESERVATION: "1",
    CANCEL_RESERVATION: "2",
    CREATE_RESERVATION: "3",
  },
  GET_ROOMS_LIST: "10",
};

export const ResultTypes = {
  SUCCESS: "Success",
  ERROR: "Error",
  SYSTEM_ERROR: "System Error",
};

export const InitialMessage = {
  resultType: "",
  message: "",
};

export function checkReservationMode(mode) {
  return Object.values(PageModeType.RESERVATION_MODE).includes(mode);
}
