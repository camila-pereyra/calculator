import { useState } from "react";
import "./Key.css";
import className from "classnames";

const Key = ({ value, handleClick }) => {
  const [number, setNumber] = useState("");
  const keyClass = className({
    key: true,
    keyEqual: value === "=",
  });

  return (
    <div
      className={keyClass}
      onClick={() => {
        if (value === "C") {
          handleClick("0");
        } else {
          handleClick(value);
        }
      }}
    >
      {value}
    </div>
  );
};

export default Key;
