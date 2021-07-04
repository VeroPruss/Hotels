import asyncio
import asyncpg
from decouple import config
from Generals.DBOperationType import DBOperationType as OperationType
from Generals.Error import Error

operation_type = OperationType.TEST_CONNECTION
sql = ""
data = ""


async def run_db_operation(operation_type, sql, *data):
    """
    Handle async SQL operation
    :param operation_type:
    :param sql:
    :param data:
    :return: The result of the operation
    """
    result = None
    connection = None

    try:
        connection = await asyncpg.connect(database=config("DB_NAME"),
                                           user=config("DB_USER"),
                                           password=config("DB_PASSWORD"),
                                           host=config("DB_HOST"),
                                           port=config("DB_PORT"))

        if operation_type == OperationType.TEST_CONNECTION:
            pass
        elif operation_type == OperationType.QUERY_SINGLE \
                or operation_type == OperationType.INSERT_RETURNING_ID:
            row = await connection.fetchrow(sql, *data)
            if row:
                result = dict(row)
        elif operation_type == OperationType.QUERY_MULTIPLE:
            rows = await connection.fetch(sql, *data)
            result = [dict(row) for row in rows]
        elif operation_type == OperationType.UPDATE:
            result = str(await connection.execute(sql, *data)).strip("UPDATE ")

    except Exception as err:
        print(err)
        raise Error("Database operation failed.")
    finally:
        if connection:
            await connection.close()

    return result


asyncio.get_event_loop().run_until_complete(run_db_operation(operation_type, sql, data))