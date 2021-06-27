from enum import Enum


class RequestType(Enum):
    GET_RESERVATION = 1
    CANCEL_RESERVATION = 2
    CREATE_RESERVATION = 3
    GET_HOTEL_ROOM_INVENTORY_LIST = 4
