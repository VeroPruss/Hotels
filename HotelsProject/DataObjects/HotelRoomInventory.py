from dataclasses import dataclass
from DataObjects.HotelRoom import HotelRoom


@dataclass
class HotelRoomInventory:
    hotel_room: HotelRoom
    reserved_rooms: int