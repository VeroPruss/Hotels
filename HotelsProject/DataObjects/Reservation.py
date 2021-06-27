from dataclasses import dataclass


@dataclass
class Reservation:
    reservation_id: int
    hotel_id: int
    room_id: int
    room_type_name: str
    arrival_date: str
    departure_date: str
    status: bool
