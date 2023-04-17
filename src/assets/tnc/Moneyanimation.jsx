import React, { useState } from "react";
import "./money.css";

export default function Moneyanimation() {
  const [money, setMoney] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setMoney(money + 100);
      setIsAnimating(false);
    }, 2000);
  };

  return (
    <div className="App">
      <h1>Money Animation</h1>
      <div className={`box ${isAnimating ? "animated" : ""}`} onClick={handleClick}>
        <span className="box-title">Happy</span>
        {isAnimating && <span className="dollar">💸</span>}
      </div>
    </div>
  );
}
