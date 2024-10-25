import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/Payment.css";

const PaymentPage = () => {
  const location = useLocation();
  const { totalAmount, selectedSeats } = location.state;

  const convenienceFee = (totalAmount * 0.15).toFixed(2);
  const subTotal = (
    parseFloat(totalAmount) + parseFloat(convenienceFee)
  ).toFixed(2);

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h1>Booking Summary</h1>
        <div className="payment-details">
          <div className="summary-item">
            <span>Selected Seats:</span>
            <span>{selectedSeats.join(", ")}</span>
          </div>
          <div className="summary-item">
            <span>Ticket Price:</span>
            <span>Rs. {totalAmount}</span>
          </div>
          <div className="summary-item">
            <span>Convenience Fees:</span>
            <span>Rs. {convenienceFee}</span>
          </div>
          <div className="summary-item total">
            <span>Amount Payable:</span>
            <span>Rs. {subTotal}</span>
          </div>
        </div>
        <button className="proceed-button">Proceed</button>
      </div>
    </div>
  );
};

export default PaymentPage;
