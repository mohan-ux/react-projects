import React, { useState, useEffect } from "react";
import { FaCar, FaBicycle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/seats.css";

const seatPrices = {
  front: [40, 100, 200],
  middle: [40, 100, 200],
  back: [40, 100, 200],
  balcony: [300],
};

const Seats = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [popupVisible, setPopupVisible] = useState(true);
  const [seatsToSelect, setSeatsToSelect] = useState(0);
  const [hoveredNumber, setHoveredNumber] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getSeatPrice = (seatIndex, seatType) => {
    const prices = seatPrices[seatType.toLowerCase()];
    if (seatType === "balcony") return prices[0];
    if (seatIndex < 20) return prices[0];
    if (seatIndex < 70) return prices[1];
    return prices[2];
  };

  const handleSeatClick = (seatIndex, seatType) => {
    const seatId = `${seatType}${seatIndex + 1}`;
    const seatPrice = getSeatPrice(seatIndex, seatType);

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats((prevSelectedSeats) =>
        prevSelectedSeats.filter((id) => id !== seatId)
      );
      setTotalAmount((prevTotal) => prevTotal - seatPrice);
      return;
    }

    const row = Math.floor(seatIndex / 10);
    const column = seatIndex % 10;

    const selectedSeatsInRow = [];
    for (let i = 0; i < seatsToSelect; i++) {
      const currentSeatIndex = row * 10 + column + i;
      const currentSeatId = `${seatType}${currentSeatIndex + 1}`;

      if (
        selectedSeats.includes(currentSeatId) ||
        currentSeatIndex >= 120 ||
        currentSeatIndex < row * 10
      ) {
        break;
      }
      selectedSeatsInRow.push(currentSeatId);
    }

    const totalSeatPrices = selectedSeatsInRow.reduce(
      (acc, seatId) =>
        acc + getSeatPrice(parseInt(seatId.match(/\d+/)[0]) - 1, seatType),
      0
    );
    setSelectedSeats((prevSelectedSeats) => [
      ...prevSelectedSeats,
      ...selectedSeatsInRow,
    ]);
    setTotalAmount((prevTotal) => prevTotal + totalSeatPrices);
  };

  const handleNumberClick = (number) => {
    setSeatsToSelect(number);
    setPopupVisible(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".popup")) {
        setPopupVisible(false);
      }
    };
    if (popupVisible) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [popupVisible]);

  const handlePayment = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      const bookedSeats = selectedSeats.map((seat) => ({
        seat,
        status: "booked",
      }));

      localStorage.setItem("bookedSeats", JSON.stringify(bookedSeats));

      navigate("/payment", { state: { totalAmount, selectedSeats } });
    }, 2000);
  };

  return (
    <div className="seats-page">
      {popupVisible && (
        <div className="popup-overlay">
          <div className="popup">
            <h4>How many seats?</h4>
            <div className="popup-numbers">
              {[...Array(10)].map((_, index) => {
                const number = index + 1;
                return (
                  <div
                    key={number}
                    className="popup-number"
                    data-type={number % 2 === 0 ? "even" : "odd"}
                    onClick={() => handleNumberClick(number)}
                    onMouseEnter={() => setHoveredNumber(number)}
                    onMouseLeave={() => setHoveredNumber(null)}
                  >
                    {number}
                  </div>
                );
              })}
            </div>
            {hoveredNumber && (
              <div className="popup-icon">
                {hoveredNumber % 2 === 0 ? (
                  <FaCar size={30} />
                ) : (
                  <FaBicycle size={30} />
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="skewed-container"></div>

      <div className="screen"></div>

      <div className="seats-container">
        <div className="price-container">
          <div className="price-section">
            <div className="front-seats">
              {[...Array(120)].map((_, seatIndex) => (
                <div
                  className={`seat front-seat ${
                    selectedSeats.includes(`front${seatIndex + 1}`)
                      ? "selected"
                      : "available"
                  }`}
                  key={seatIndex}
                  onClick={() => handleSeatClick(seatIndex, "front")}
                />
              ))}
            </div>
          </div>

          <div className="price-section">
            <div className="middle-seats">
              {[...Array(120)].map((_, seatIndex) => (
                <div
                  className={`seat middle-seat ${
                    selectedSeats.includes(`middle${seatIndex + 1}`)
                      ? "selected"
                      : "available"
                  }`}
                  key={seatIndex}
                  onClick={() => handleSeatClick(seatIndex, "middle")}
                />
              ))}
            </div>
          </div>

          <div className="price-section">
            <div className="back-seats">
              {[...Array(120)].map((_, seatIndex) => (
                <div
                  className={`seat back-seat ${
                    selectedSeats.includes(`back${seatIndex + 1}`)
                      ? "selected"
                      : "available"
                  }`}
                  key={seatIndex}
                  onClick={() => handleSeatClick(seatIndex, "back")}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="balcony">
        {[...Array(31)].map((_, seatIndex) => (
          <div
            className={`seat balcony-seat ${
              selectedSeats.includes(`balcony${seatIndex + 1}`)
                ? "selected"
                : "available"
            }`}
            key={seatIndex}
            onClick={() => handleSeatClick(seatIndex, "balcony")}
          />
        ))}
      </div>

      <div className="legend">
        <div className="legend-item">
          <div className="seat available"></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="seat selected"></div>
          <span>Selected</span>
        </div>
        <div className="legend-item">
          <div className="seat booked"></div>
          <span>Booked</span>
        </div>
      </div>

      {selectedSeats.length > 0 && (
        <div
          className={`pay-button-container ${
            selectedSeats.length > 0 ? "show" : "hide"
          }`}
        >
          {!loading ? (
            <button className="pay-button" onClick={handlePayment}>
              Pay Now
            </button>
          ) : (
            <div className="loading-spinner"></div>
          )}
        </div>
      )}
    </div>
  );
};

export default Seats;
