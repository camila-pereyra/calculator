import { useState } from "react";
import Key from "../Key/Key";
import Visor from "../VIsor/Visor";
import "./Calculator.css";

const Calculator = () => {
  const [clean, setClean] = useState(true);
  const [operator, setOperator] = useState(null);
  const [currentValue, setCurrentValue] = useState("");
  const [nextValue, setNextValue] = useState("");
  const [total, setTotal] = useState("");

  //funcion que crea componentes Key de acuerdo al valor del array recibido por parametro
  const createKeys = (values) =>
    values.map((value) => (
      <Key value={value} key={value} handleClick={handleClick} />
    ));

  //funcion que adiciona numeros al currentValue
  const addCurrentValue = (num) => {
    setClean(false);
    if (currentValue.length > 9) {
      return;
    }
    if (
      num === "." &&
      currentValue.includes(".") &&
      operator === null &&
      currentValue.length === 0
    ) {
      return;
    }
    setCurrentValue(currentValue + num);
  };
  //funcion que adiciona numeros al nextValue
  const addNextValue = (num) => {
    setClean(false);
    if (nextValue.length > 9) {
      return;
    }
    if (num === "." && nextValue.includes(".")) {
      return;
    }
    setNextValue(nextValue + num);
  };
  //funcion que limpia el display (lo pone en 0)
  const cleanDisplay = () => {
    setClean(true);
    setCurrentValue("");
    setNextValue("");
    setTotal("");
    setOperator(null);
  };
  //funcion que borra el último dígito agregado
  const deleteDigit = () => {
    setClean(false);
    if (currentValue.length > 1 && nextValue === "" && operator === null) {
      setCurrentValue(currentValue.slice(0, -1));
    }
    if (currentValue.length === 1 && nextValue === "" && operator === null) {
      setClean(true);
      setCurrentValue("");
    }
    if (nextValue.length > 1 && operator !== null) {
      setNextValue(nextValue.slice(0, -1));
    }
    if (nextValue.length === 1 && operator !== null) {
      setClean(true);
      setNextValue("");
    }
  };
  //funcion que toma el valor mostrado en el display y lo convierte en porcentaje
  const percentage = () => {
    if (currentValue !== "" && nextValue === "" && operator === null) {
      const percentage = parseFloat(currentValue) / 100;
      setCurrentValue(percentage.toString());
    }
    if (nextValue !== "" && operator !== null) {
      const percentage = parseFloat(nextValue) / 100;
      setNextValue(percentage.toString());
    }
  };
  //funcion que realiza las operaciones de acuerdo a los parametros recibidos
  const operation = (num1, num2, operator) => {
    if (!isNaN(num1) && !isNaN(num2) && operator !== null) {
      if (operator === "+") {
        return num1 + num2;
      }
      if (operator === "-") {
        return num1 - num2;
      }
      if (operator === "x") {
        return num1 * num2;
      }
      if (operator === "/") {
        if (num2 !== 0) {
          return num1 / num2;
        } else {
          return "Error";
        }
      }
    }
  };

  //funcion handleClick
  const handleClick = (num) => {
    if (
      operator === null &&
      (num === "1" ||
        num === "2" ||
        num === "3" ||
        num === "4" ||
        num === "5" ||
        num === "6" ||
        num === "7" ||
        num === "8" ||
        num === "9" ||
        num === "0" ||
        num === ".") &&
      total === ""
    ) {
      addCurrentValue(num);
    }
    /* if (
      total !== "" &&
      (num === "1" ||
        num === "2" ||
        num === "3" ||
        num === "4" ||
        num === "5" ||
        num === "6" ||
        num === "7" ||
        num === "8" ||
        num === "9" ||
        num === "0" ||
        num === ".")
    ) {
      setClean(true);
      setCurrentValue("");
      setNextValue("");
      setOperator(null);
      setTotal("");
      console.log("Entra2?");
      addCurrentValue(num);
      console.log(currentValue);
    } */
    if (num === "C") {
      cleanDisplay();
    }
    if (num === "←") {
      deleteDigit();
    }
    if (num === "%") {
      percentage();
    }
    if (
      operator !== null &&
      currentValue !== "" &&
      (num === "1" ||
        num === "2" ||
        num === "3" ||
        num === "4" ||
        num === "5" ||
        num === "6" ||
        num === "7" ||
        num === "8" ||
        num === "9" ||
        num === "0" ||
        num === ".") &&
      total === ""
    ) {
      addNextValue(num);
    }
    if (num === "+" || num === "-" || num === "x" || num === "/") {
      if (currentValue !== "") {
        setOperator(num);
      }
      if (currentValue === "") {
        return;
      }
    }
    if (
      num === "=" &&
      currentValue !== "" &&
      nextValue !== "" &&
      total === ""
    ) {
      const total = operation(
        parseFloat(currentValue),
        parseFloat(nextValue),
        operator
      ).toFixed(2);
      setTotal(total.toString());
    }
    if (
      operator !== null &&
      currentValue !== "" &&
      nextValue !== "" &&
      (num === "+" || num === "-" || num === "*" || num === "/")
    ) {
      const total = operation(
        parseFloat(currentValue),
        parseFloat(nextValue),
        operator
      );
      setTotal(total.toString());
    }
    if (
      total !== "" &&
      (num === "+" || num === "-" || num === "*" || num === "/")
    ) {
      setOperator(num);
      setCurrentValue(total.toString());
      addNextValue();
    }
  };

  return (
    <div className="calculator">
      <div className="containerVisor">
        <Visor
          currentValue={currentValue}
          operator={operator}
          nextValue={nextValue}
          clean={clean}
          total={total}
        />
      </div>
      <div className="containerKeys">
        <div className="rowKeys">{createKeys(["C", "←", "%", "/"])}</div>
        <div className="rowKeys">{createKeys(["7", "8", "9", "x"])}</div>
        <div className="rowKeys">{createKeys(["4", "5", "6", "-"])}</div>
        <div className="rowKeys">{createKeys(["1", "2", "3", "+"])}</div>
        <div className="rowKeys">{createKeys(["0", ".", "="])}</div>
      </div>
    </div>
  );
};

export default Calculator;
