import { useEffect, useState } from "react";
import Key from "../Key/Key";
import Visor from "../VIsor/Visor";
import "./Calculator.css";

const Calculator = () => {
  //states
  const [operator, setOperator] = useState(null);
  const [currentValue, setCurrentValue] = useState("0");
  const [nextValue, setNextValue] = useState("0");
  const [total, setTotal] = useState("");
  //funcion que crea componentes Key de acuerdo al valor del array recibido por parametro
  const createKeys = (values) =>
    values.map((value) => (
      <Key value={value} key={value} handleClick={handleClick} />
    ));
  //funcion que adiciona numeros al currentValue
  const addValue = (num) => {
    if (operator === null) {
      if (currentValue.length > 9) {
        return;
      }
      if (num === "." && currentValue.includes(".")) {
        return;
      }
      if (currentValue === "0" && num !== ".") {
        setCurrentValue(num);
      } else {
        setCurrentValue(currentValue + num);
      }
    }
    if (operator !== null) {
      if (nextValue.length > 9) {
        return;
      }
      if (num === "." && nextValue.includes(".")) {
        return;
      }
      if (nextValue === "0" && num !== ".") {
        setNextValue(num);
      } else {
        setNextValue(nextValue + num);
      }
    }
  };
  //funcion que limpia el display (pone a todos los state en su estado inicial)
  const cleanDisplay = () => {
    setCurrentValue("0");
    setNextValue("0");
    setTotal("");
    setOperator(null);
  };
  //funcion que borra el último dígito agregado
  const deleteDigit = () => {
    if (currentValue.length > 1 && nextValue === "0" && operator === null) {
      setCurrentValue(currentValue.slice(0, -1));
    }
    if (currentValue.length === 1 && nextValue === "0" && operator === null) {
      setCurrentValue("0");
    }
    if (nextValue.length > 1 && operator !== null) {
      setNextValue(nextValue.slice(0, -1));
    }
    if (nextValue.length === 1 && operator !== null) {
      setNextValue("0");
    }
  };
  //funcion que toma el valor mostrado en el display y lo convierte en porcentaje
  const percentage = () => {
    if (currentValue !== "0" && nextValue === "0" && operator === null) {
      const percentage = parseFloat(currentValue) / 100;
      setCurrentValue(percentage.toString());
    }
    if (nextValue !== "0" && operator !== null) {
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
        }
      }
    }
  };
  //funcion handleClick
  const handleClick = (num) => {
    if (
      num === "1" ||
      num === "2" ||
      num === "3" ||
      num === "4" ||
      num === "5" ||
      num === "6" ||
      num === "7" ||
      num === "8" ||
      num === "9" ||
      num === "0" ||
      num === "."
    ) {
      if (total !== "") {
        setTotal("");
      }
      addValue(num);
    }
    if (num === "C") {
      cleanDisplay();
    }
    if (num === "←") {
      deleteDigit();
    }
    if (num === "%") {
      percentage();
    }
    if (num === "+" || num === "-" || num === "x" || num === "/") {
      if (total !== "") {
        setCurrentValue(total);
        setNextValue("0");
        setOperator(num);
        setTotal("");
      }
      if (currentValue !== "" && operator === null) {
        setOperator(num);
      }
      if (currentValue !== "" && operator !== null && nextValue !== "") {
        const subtotal = operation(
          parseFloat(currentValue),
          parseFloat(nextValue),
          operator
        );
        if (!isNaN(subtotal)) {
          setCurrentValue(subtotal.toFixed(2).toString());
          setNextValue("0");
          setOperator(num);
          setTotal("");
        } else {
          setTotal("Error");
        }
      }
      if (currentValue === "") {
        return;
      }
    }
    if (num === "=") {
      const total = operation(
        parseFloat(currentValue),
        parseFloat(nextValue),
        operator
      );
      if (!isNaN(total)) {
        setTotal(total.toFixed(2).toString());
      } else {
        setTotal("Error");
      }
      setCurrentValue("0");
      setNextValue("0");
      setOperator(null);
    }
  };

  return (
    <div className="calculator">
      <div className="containerVisor">
        <Visor
          currentValue={currentValue}
          operator={operator}
          nextValue={nextValue}
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
