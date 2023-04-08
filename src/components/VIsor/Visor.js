import "./Visor.css";

const Visor = ({ currentValue, operator, nextValue, clean, total }) => {
  return (
    <div className="visor">
      <div className="operation">
        {clean
          ? ""
          : operator === null
          ? ""
          : nextValue === ""
          ? currentValue + " " + operator
          : total === ""
          ? currentValue + " " + operator
          : currentValue + " " + operator + " " + nextValue + " = "}
      </div>

      <div className="total">
        {clean
          ? "0"
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
