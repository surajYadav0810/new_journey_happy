import React, { useState } from "react";
import './tnc.css';
import CircularSVG from "./Circularsvg";

const Tnc = () => {

  const getRandomDelay = () => {
    return Math.random() * 10;
  };

    return (    
    <div className="container">
      <div className="maintnc">
        <div className="money-falling-container">
          <h1>1000000</h1>
            {Array.from({ length: 100 }).map((_, index) => (
            <div key={index} className="note" style={{ 
                left: `${Math.random() * 100}%`,
                 animationDelay: `${getRandomDelay()}s`,
              }}/>
            ))}
        </div>
        <div className="circular-data">
          <span><CircularSVG data1={'Daily'} data2={''}/>Repayment Frequency</span>
          <span><CircularSVG data1={'180'} data2={'Days'}/>Tenure</span>
          <span><CircularSVG data1={'158'} data2={''}/>Number of installments</span>
          <span><CircularSVG data1={'₹7,143'} data2={''}/>Installment amount</span>
          <span><CircularSVG data1={'2.75%'} data2={''}/>Interest rate*</span>
          <span><CircularSVG data1={'₹41,300'} data2={''}/>Platform Fee</span>
          <span><CircularSVG data1={'₹930,021'} data2={''}/>Net disbursed Amount</span>
        </div>
        <button>I Accept</button>
     </div>
    </div>
    )
}

export default Tnc;