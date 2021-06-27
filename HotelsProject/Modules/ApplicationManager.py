from dataclasses import asdict
from Generals.RequestType import RequestType
from Generals.ResultType import ResultType
from Generals.Error import Error
from DataObjects.Result import Result
import Modules.BusinessLogic as BL


async def manage_request(request_type, *data):
    result = None
    msg = ""

    try:
        if request_type == RequestType.GET_RESERVATION:
            result = await BL.retrieve_reservation(*data)
            msg = "Reservation retrieved."
        elif request_type == RequestType.CANCEL_RESERVATION:
            await BL.modify_reservation_status(*data, False)
            msg = "Reservation cancelled."
        elif request_type == RequestType.CREATE_RESERVATION:
            result = await BL.create_reservation(*data)
            msg = "Reservation created."
        elif request_type == RequestType.GET_HOTEL_ROOM_INVENTORY_LIST:
            result = await BL.query_room_inventory(*data)
            msg = "Room inventory displayed."
        else:
            raise Error("Unknown Request.")

        return asdict(Result(result_type=ResultType.SUCCESS.value,
                      result_text_msg=msg,
                      result_object=result))
    except Error as err:
        return asdict(Result(result_type=ResultType.ERROR.value,
                      result_text_msg=err.error_message,
                      result_object=None))

