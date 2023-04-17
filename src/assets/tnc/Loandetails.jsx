import React from 'react';
import './loandetails.css';

function LoanDetails() {
    return (
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
    );
  }

export default LoanDetails;
