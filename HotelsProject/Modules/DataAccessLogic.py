from Generals.DBOperationType import DBOperationType
from Generals.SQLHandler import run_db_operation
from DataObjects.Reservation import Reservation
from DataObjects.HotelRoom import HotelRoom
from DataObjects.HotelRoomInventory import HotelRoomInventory
from datetime import date


async def get_reservation_by_id(reservation_id):
    """
    Queries reservation by given id
    :param reservation_id:
    :return: Reservation object
    """
    reservation = None
    reservation_query = """SELECT t1.reservation_id, t1.room_id, t2.hotel_id,
                                  t2.room_type_name, t1.arrival_date, t1.departure_date, t1.status 
                            FROM reservations t1 join 
                                 hotel_rooms t2 on t1.room_id = t2.room_id 
                            WHERE reservation_id = $1"""
    query_result = await run_db_operation(DBOperationType.QUERY_SINGLE, reservation_query, int(reservation_id))
    if query_result:
        reservation = Reservation(query_result['reservation_id'],
                                  query_result['hotel_id'],
                                  query_result['room_id'],
                                  query_result['room_type_name'],
                                  str(query_result['arrival_date']),
                                  str(query_result['departure_date']),
                                  query_result['status'])
    return reservation


async def update_reservation_status(reservation_id, status):
    """
    Updates the status of reservation
    :param reservation_id:
    :param status:
    :return: number of rows updated
    """
    sql_stm = """UPDATE reservations SET status = $1 WHERE reservation_id = $2"""
    return await run_db_operation(DBOperationType.UPDATE, sql_stm, bool(status), int(reservation_id))


async def num_of_available_rooms(room_id, arrival_date, departure_date):
    """
    Counts the number of available rooms by room id and arrival/departure dates
    :param room_id:
    :param arrival_date:
    :param departure_date:
    :return: number of available rooms
    """
    available_rooms = 0
    available_rooms_query = """SELECT max_amount - 
                                      (SELECT count(*)
                                         FROM reservations
                                        WHERE room_id = $1
                                          AND daterange(arrival_date, departure_date) && 
                                              daterange($2::DATE, $3::DATE)
                                          AND status = True) as available_amount
                               FROM hotel_rooms
                               WHERE room_id = $1"""
    available_rooms_result = await run_db_operation(DBOperationType.QUERY_SINGLE,
                                                    available_rooms_query, int(room_id),
                                                    date.fromisoformat(arrival_date),
                                                    date.fromisoformat(departure_date))
    if available_rooms_result:
        available_rooms = available_rooms_result['available_amount']
    return available_rooms


async def get_room_inventory(hotel_id, date_from, date_to):
    """
    Gets the room inventory by hotel id and dates
    :param hotel_id:
    :param date_from:
    :param date_to:
    :return: list of HotelRoomInventory objects
    """
    room_inventory = None
    room_inventory_query = """SELECT room_id, hotel_id, room_type_name, max_amount,
                                    (SELECT count(*)
                                      FROM  reservations t2
                                     WHERE  t2.room_id = t1.room_id
                                       AND  daterange(arrival_date, departure_date) &&
                                            daterange($2::DATE, $3::DATE)
                                       AND  status = True) as reserved_rooms
                              FROM hotel_rooms t1
                              WHERE hotel_id = $1
                              ORDER BY room_id"""
    inventory_query_result = await run_db_operation(DBOperationType.QUERY_MULTIPLE,
                                                    room_inventory_query,
                                                    int(hotel_id),
                                                    date.fromisoformat(date_from),
                                                    date.fromisoformat(date_to))
    if inventory_query_result:
        room_inventory = [HotelRoomInventory(hotel_room=HotelRoom(hotel_id=room['hotel_id'],
                                                                  room_id=room['room_id'],
                                                                  room_type_name=room['room_type_name'],
                                                                  max_amount=room['max_amount']),
                                             reserved_rooms=room['reserved_rooms'])
                          for room in inventory_query_result]
    return room_inventory


async def insert_reservation(room_id, arrival_date, departure_date):
    """
    Inserts a reservation returning id
    :param room_id:
    :param arrival_date:
    :param departure_date:
    :return: new reservation id
    """
    insert_reservation_stm = """INSERT INTO reservations (room_id, arrival_date, departure_date, status)
                                    VALUES ($1, $2, $3, $4) RETURNING reservation_id"""
    insert_result = await run_db_operation(DBOperationType.INSERT_RETURNING_ID,
                                           insert_reservation_stm,
                                           int(room_id),
                                           date.fromisoformat(arrival_date),
                                           date.fromisoformat(departure_date),
                                           True)
    return int(insert_result['reservation_id'])
