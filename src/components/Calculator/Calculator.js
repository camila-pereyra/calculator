import { useState } from "react";
import Key from "../Key/Key";
import Visor from "../VIsor/Visor";
import "./Calculator.css";

const Calculator = () => {
  const [keyClick, setKeyClick] = useState(0);
  //funcion que crea componentes Key de acuerdo al valor del (array)
  const createKeys = (values) =>
    values.map((value) => (
      <Key value={value} key={value} handleClick={handleClick} />
    ));
  //funcion handleClick
  const handleClick = (key) => {
    setKeyClick(key);
  };

  return (
    <div className="calculator">
      <div className="containerVisor">
        <Visor keyClick={keyClick} />
      </div>
      <div className="containerKeys">
        <div className="rowKeys">{createKeys(["C", "+/-", "%", "/"])}</div>
        <div className="rowKeys">{createKeys(["7", "8", "9", "x"])}</div>
        <div className="rowKeys">{createKeys(["4", "5", "6", "-"])}</div>
        <div className="rowKeys">{createKeys(["1", "2", "3", "+"])}</div>
        <div className="rowKeys">{createKeys(["0", ".", "="])}</div>
      </div>
    </div>
  );
};

export default Calculator;
