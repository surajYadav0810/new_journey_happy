import React, { useState } from 'react';
import './newj.scss';
import { div } from '@tensorflow/tfjs';
import Newcamera from '../selfie/Newcamera';

function Newjourney() {
  const [selected, setSelected] = useState('stage-1'); 

  const handleSelection = (e) => {
    setSelected(e.target.id);
  };

  return (
    <div className='home'>
    <ol className="css-accordion">
      <li className={`accordion-item stage-1`}>
        <input
          type="radio"
          name="accordion-control"
          id="stage-1"
          checked={selected === 'stage-1'}
          onChange={handleSelection}
          />
        <label htmlFor="stage-1">Internal Kick-Off</label>
        <div className="item-content-container">
          <div className="item-content">
            <p>Some exciting content about our general practices, etc.</p>
          </div>
        </div>
      </li>
      <li className={`accordion-item stage-2`}>
       <input
          type="radio"
          name="accordion-control"
          id="stage-2"
          checked={selected === 'stage-2'}
          onChange={handleSelection}
        />
        <label htmlFor="stage-2">Take you Selfie</label>
        <div className="item-content-container">
          <div className="item-content">
            {/* <p>Some exciting content about our general practices, etc.</p> */}
            <Newcamera/>
          </div>
        </div>
      </li>
      <li className={`accordion-item stage-3`}>
       <input
          type="radio"
          name="accordion-control"
          id="stage-3"
          checked={selected === 'stage-3'}
          onChange={handleSelection}
          />
        <label htmlFor="stage-3">Functional Wireframes</label>
        <div className="item-content-container">
          <div className="item-content">
            <p>Some exciting content about our general practices, etc.</p>
          </div>
        </div>
      </li>
      <li className={`accordion-item stage-4`}>
       <input
          type="radio"
          name="accordion-control"
          id="stage-4"
          checked={selected === 'stage-4'}
          onChange={handleSelection}
          />
        <label htmlFor="stage-4">Terms and Conditions</label>
        <div className="item-content-container">
          <div className="item-content">
            {/* <p>Some exciting content about our general practices, etc.</p> */}


            <div className="container">
        <div className="loan-item">
          <h1>Total Amount Approved ₹100,000</h1>
        </div>
        <div className="loan-details">
          <div className="loan-item">
            <h2>Loan Tenure</h2>
            <p>180 days</p>
          </div>
          <div className="loan-item">
            <h2>Repayment Frequency</h2>
            <p>Daily</p>
          </div>
          <div className="loan-item">
            <h2>Installment Amount</h2>
            <p>₹7,143</p>
          </div>
          <div className="loan-item">
            <h2>Number of Installments</h2>
            <p>158</p>
          </div>
          <div className="loan-item">
            <h2>Interest Rate</h2>
            <p>2.75%</p>
          </div>
          <div className="loan-item">
            <h2>Platform Fee</h2>
            <p>₹41,300</p>
          </div>
          <div className="loan-item">
            <h2>Net Disbursed Amount</h2>
            <p>₹930,021</p>
          </div>
        </div>
      </div>



          </div>
        </div>
      </li>
    </ol>
    </div>
  );
}

export default Newjourney;
