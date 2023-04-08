import "./Key.css";
import className from "classnames";

const Key = ({ value, handleClick }) => {
  const keyClass = className({
    key: true,
    keyEqual: value === "=",
  });

  return (
    <button
      className={keyClass}
      onClick={() => {
        handleClick(value);
      }}
    >
      {value}
    </button>
  );
};

export default Key;
