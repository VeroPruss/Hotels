from Generals.Error import Error
import Modules.DataAccessLogic as DAL


async def retrieve_reservation(reservation_id):
    """
    Retrieves reservation by id
    :param reservation_id:
    :return: reservation data class
    """
    reservation = await DAL.get_reservation_by_id(reservation_id)
    if reservation is None:
        raise Error("Reservation not found.")
    return reservation


async def check_available(room_id, arrival_date, departure_date):
    """
    Checks if room is available by dates
    :param room_id:
    :param arrival_date:
    :param departure_date:
    :return: Raises an error if unavailable
    """
    if await DAL.num_of_available_rooms(room_id, arrival_date, departure_date) == 0:
        raise Error("No rooms available")


async def modify_reservation_status(reservation_id, status):
    """
    Updates the status of a reservation
    :param reservation_id:
    :param status:
    :return: Result object
    """
    # When status is updated to True - check if the room is still available
    if status:
        reservation = await DAL.get_reservation_by_id(reservation_id)
        await check_available(reservation.room_id,
                              reservation.arrival_date,
                              reservation.departure_date)

    # Check the number of updated rows
    if not int(await DAL.update_reservation_status(reservation_id, status)) > 0:
        raise Error("Reservation  was not updated.")


async def create_reservation(room_id, arrival_date, departure_date):
    """
    Creates a reservation and returns it
    :param room_id:
    :param arrival_date:
    :param departure_date:
    :return: the reservation created
    """
    await check_available(room_id, arrival_date, departure_date)
    reservation_id = await DAL.insert_reservation(room_id, arrival_date, departure_date)
    return await DAL.get_reservation_by_id(reservation_id)


async def query_room_inventory(hotel_id, date_from, date_to):
    """
    Returns room inventory for hotel and dates
    :param hotel_id:
    :param date_from:
    :param date_to:
    :return: list of rooms for hotel
    """
    room_inventory = await DAL.get_room_inventory(hotel_id, date_from, date_to)
    if room_inventory is None:
        raise Error("No rooms were found.")
    return room_inventory
