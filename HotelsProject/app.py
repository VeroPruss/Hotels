from sanic import Sanic
from sanic.response import json
from sanic_cors import CORS
from Generals.RequestType import RequestType
import Modules.ApplicationManager as AM

app = Sanic("My app")
CORS(app)


@app.get("/api/reservation/<reservation_id>")
async def get_reservation_by_id(request, reservation_id):
    """
    Retrieves reservation details by id
    """
    return json(await AM.manage_request(RequestType.GET_RESERVATION, reservation_id))


@app.put("/api/reservation/cancel/<reservation_id>")
async def cancel_reservation(request, reservation_id):
    """
    Cancels reservation by id
    """
    return json(await AM.manage_request(RequestType.CANCEL_RESERVATION, reservation_id))


@app.post("/api/reservation")
async def create_reservation(request):
    """
    Creates new reservation
    """
    return json(await AM.manage_request(RequestType.CREATE_RESERVATION,
                                        request.json["room_id"],
                                        request.json["arrival_date"],
                                        request.json["departure_date"]))


@app.get("api/hotels/inventory/<hotel_id>")
async def room_inventory(request, hotel_id):
    """
    Get room inventory by hotel id and date range
    """
    return json(await AM.manage_request(RequestType.GET_HOTEL_ROOM_INVENTORY_LIST,
                                        hotel_id,
                                        request.args["date_from"][0],
                                        request.args["date_to"][0]))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8081)
