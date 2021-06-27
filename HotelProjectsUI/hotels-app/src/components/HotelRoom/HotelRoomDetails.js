import React from "react";

export default (props) => {
  return (
    <div className="container-fluid displayDetails">
      <h1>Rooms Inventory Details:</h1>
      {props.hotelRoomsDetails.map((item) => (
        <p key={item.hotel_room.room_id}>
          room id: {item.hotel_room.room_id}
          <br></br>
          room type name: {item.hotel_room.room_type_name}
          <br></br>
          max amount: {item.hotel_room.max_amount}
          <br></br>
          reserved rooms: {item.reserved_rooms}
        </p>
      ))}
    </div>
  );
};
