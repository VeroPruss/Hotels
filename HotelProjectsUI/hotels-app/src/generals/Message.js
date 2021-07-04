import React from "react";

import { ResultTypes } from "../generals/Globals";

export default (props) => {
  const determineColorClass = () => {
    let colorClass = "badge m-2 ";
    switch (props.messageObject.resultType) {
      case ResultTypes.SUCCESS:
        colorClass += "bg-success";
        break;
      case ResultTypes.ERROR:
        colorClass += "bg-danger";
        break;
      case ResultTypes.SYSTEM_ERROR:
        colorClass += "bg-dark";
        break;
      default:
        colorClass += "bg-primary";
    }
    return colorClass;
  };

  return (
    <div>
      <h4>
        <span className={determineColorClass()}>
          {props.messageObject.message}
        </span>
      </h4>
    </div>
  );
};
