import "./Visor.css";

const Visor = ({ currentValue, operator, nextValue, total }) => {
  return (
    <div className="visor">
      <div className="operation">
        {currentValue === "0"
          ? ""
          : operator === null
          ? ""
          : total === ""
          ? currentValue + " " + operator
          : currentValue + " " + operator + " " + nextValue + " = "}
      </div>

      <div className="total">
        {total !== ""
          ? total
          : operator === null
          ? currentValue
          : nextValue === ""
          ? currentValue
          : total === ""
          ? nextValue
          : total}
      </div>
    </div>
  );
};

export default Visor;
