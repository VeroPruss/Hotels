from dataclasses import dataclass


@dataclass
class Result:
    result_type: str
    result_text_msg: str
    result_object: object

