import pytest
import Modules.ApplicationManager as AM
from Generals.RequestType import RequestType


@pytest.mark.asyncio
async def test_get_reservation():
    assert (await AM.manage_request(RequestType.GET_RESERVATION, 1))['result_object'] is not None
    assert (await AM.manage_request(RequestType.GET_RESERVATION, 100))['result_object'] is None


@pytest.mark.asyncio
async def test_cancel_reservation():
    assert (await AM.manage_request(RequestType.CANCEL_RESERVATION, 2))['result_type'] == 'Success'
    assert (await AM.manage_request(RequestType.CANCEL_RESERVATION, 200))['result_type'] == 'Error'


@pytest.mark.asyncio
async def test_add_reservation():
    assert (await AM.manage_request(RequestType.CREATE_RESERVATION,
                                    2, '2021-06-15', '2021-06-17'))['result_type'] == 'Success'
    assert (await AM.manage_request(RequestType.CREATE_RESERVATION,
                                    3, '2021-06-05', '2021-06-08'))['result_type'] == 'Error'


@pytest.mark.asyncio
async def test_room_inventory_list():
    assert (await AM.manage_request(RequestType.GET_HOTEL_ROOM_INVENTORY_LIST,
                                    1, '2021-06-01', '2021-06-30'))['result_object'] is not None
    assert (await AM.manage_request(RequestType.GET_HOTEL_ROOM_INVENTORY_LIST,
                                    10, '2021-06-01', '2021-06-30'))['result_object'] is None
