import React, { useState } from "react";

import HotelRoomInput from "./HotelRoomInput";
import HotelRoomDetails from "./HotelRoomDetails";

import { getRoomInventoryOperation } from "../../generals/ServerOperations";
import { ResultTypes } from "../../generals/Globals";

export default (props) => {
  const [hotelId, setHotelId] = useState(0);
  const [queryDates, setQueryDate] = useState({});
  const [hotelRoomDetails, setHotelRoomDetails] = useState([]);
  const [showHotelRoomDetails, setShowHotelRoomDetails] = useState(false);

  const handleHotelIdChange = (hotelId) => {
    setHotelId(hotelId);
  };

  const handleQueryDatesChange = (property, value) => {
    setQueryDate({ ...queryDates, [property]: value });
  };

  const getRoomInventory = async () => {
    const result = await getRoomInventoryOperation(hotelId, queryDates);
    if (result.result_type === ResultTypes.SUCCESS) {
      setShowHotelRoomDetails(true);
      setHotelRoomDetails(result.result_object);
    } else {
      setShowHotelRoomDetails(false);
      setHotelRoomDetails([]);
    }

    props.handleMessage(result.result_type, result.result_text_msg);
  };

  return (
    <div>
      <HotelRoomInput
        handleHotelIdChange={handleHotelIdChange}
        handleQueryDatesChange={handleQueryDatesChange}
        getRoomInventory={getRoomInventory}
      />
      {showHotelRoomDetails && (
        <HotelRoomDetails hotelRoomsDetails={hotelRoomDetails} />
      )}
    </div>
  );
};
