from enum import Enum


class DBOperationType(Enum):
    TEST_CONNECTION = 0
    QUERY_SINGLE = 1
    QUERY_MULTIPLE = 2
    INSERT_RETURNING_ID = 3
    UPDATE = 4
