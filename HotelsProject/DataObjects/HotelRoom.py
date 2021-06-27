from dataclasses import dataclass


@dataclass
class HotelRoom:
    hotel_id: int
    room_id: int
    room_type_name: str
    max_amount: int
