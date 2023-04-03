import "./Visor.css";
import { useEffect, useState } from "react";

const Visor = ({ keyClick }) => {
  const [keyClicked, setKeyClicked] = useState(0);
  useEffect(() => {
    setKeyClicked(keyClick);
  }, [keyClick]);

  return <div className="visor">{keyClicked}</div>;
};

export default Visor;
