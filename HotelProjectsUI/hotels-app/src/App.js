import "./App.css";
import React, { useState, useEffect } from "react";

import Message from "./generals/Message";
import Header from "./components/Header";
import ReservationModel from "./components/Reservation/ReservationModel";
import HotelRoomModel from "./components/HotelRoom/HotelRoomModel";

import {
  PageModeType,
  checkReservationMode,
  InitialMessage,
} from "./generals/Globals";

function App() {
  const [pageMode, setPageMode] = useState("0");
  const [messageObject, setMessageObject] = useState(InitialMessage);

  useEffect(() => {
    setMessageObject(InitialMessage);
  }, [pageMode]);

  const handleMessage = (resultType, messageText) => {
    setMessageObject({
      resultType: resultType,
      message: messageText,
    });
  };

  return (
    <div className="App">
      <Header changeMode={setPageMode} />
      <div>
        {checkReservationMode(pageMode) && (
          <ReservationModel mode={pageMode} handleMessage={handleMessage} />
        )}
        {pageMode === PageModeType.GET_ROOMS_LIST && (
          <HotelRoomModel handleMessage={handleMessage} />
        )}
      </div>
      <Message messageObject={messageObject}></Message>
    </div>
  );
}

export default App;
