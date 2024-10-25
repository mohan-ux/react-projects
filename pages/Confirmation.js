import React, { useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSun,
  FaCloudSun,
  FaCloudMoon,
  FaMoon,
  FaHeart,
} from "react-icons/fa";
import "../styles/conformation.css";

const DayContainer = React.memo(({ day, date, isSelected, onClick }) => {
  return (
    <div
      className={`day-container ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div className="day">{day}</div>
      <div className="date">{date}</div>
    </div>
  );
});

const Confirmation = () => {
  const navigate = useNavigate();
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dates = ["09", "10", "11", "12", "13", "14", "15"];
  const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const [timingIcon, setTimingIcon] = useState(<FaSun />);
  const [backgroundImage, setBackgroundImage] = useState("#f0f0f0");
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTiming, setSelectedTiming] = useState(null);
  const [heartClicked, setHeartClicked] = useState(Array(7).fill(false));
  const [isLoading, setIsLoading] = useState(false);
  const [priceList, setPriceList] = useState({
    morning: ["$40", "$120", "$200", "$350"],
    afternoon: ["$50", "$130", "$220", "$360"],
    evening: ["$60", "$140", "$230", "$370"],
    night: ["$70", "$150", "$240", "$380"],
  });
  const [theatres, setTheatres] = useState([
    {
      name: "Prozone Mall",
      timings: ["9:00 AM", "12:00 PM", "3:00 PM"],
    },
    {
      name: "Shakthi Cinemas",
      timings: ["6:00 PM", "9:00 PM"],
    },
    {
      name: "Fun Mall",
      timings: ["5:00 PM", "1:00 PM"],
    },
    {
      name: "Broadway Cinemas",
      timings: ["8:00 PM", "2:00 PM"],
    },
    {
      name: "World Wide",
      timings: ["11:00 PM", "9:00 AM"],
    },
  ]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * 7);
    setSelectedDay(days[randomIndex]);
  }, []);

  const handleDayClick = (day) => {
    setSelectedDay(day);
    const shuffledTheatres = shuffle(theatres);
    const selectedTheatres = shuffledTheatres.slice(0, 2);
    console.log(selectedTheatres);
  };

  const handleTimingChange = (e) => {
    const selectedTiming = e.target.value;
    switch (selectedTiming) {
      case "morning":
        setTimingIcon(<FaSun color="#f0f0f0" />);
        setBackgroundImage("#f0f0f0");
        break;
      case "afternoon":
        setTimingIcon(<FaCloudSun color="#ffd700" />);
        setBackgroundImage("#ffd700");
        break;
      case "evening":
        setTimingIcon(<FaCloudMoon color="#ffb6c1" />);
        setBackgroundImage("#ffb6c1");
        break;
      case "night":
        setTimingIcon(<FaMoon color="#000" />);
        setBackgroundImage("#000");
        break;
      default:
        setTimingIcon(<FaSun color="#f0f0f0" />);
        setBackgroundImage("#f0f0f0");
    }
    setSelectedTiming(selectedTiming);
  };

  const handleHeartClick = (index) => {
    const updatedHeartClicked = [...heartClicked];
    updatedHeartClicked[index] = !updatedHeartClicked[index];
    setHeartClicked(updatedHeartClicked);
  };

  const handleNavigateToSeats = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/seats");
    }, 2000);
  };

  const shuffle = (array) => {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  return (
    <div className="confirmation-container">
      <div className="header2"></div>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for movies, events, playlists..."
          style={{
            width: "600px",
            height: "40px",
            fontSize: "16px",
            padding: "5px",
            marginLeft: "150px",
            borderRadius: "15px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        />
        <select
          style={{
            marginLeft: "90px",
            height: "40px",
            fontSize: "16px",
            marginTop: "5px",
          }}
        >
          <option value="">Select Location</option>
          <option value="Tirupur">Tirupur</option>
          <option value="Coimbatore">Coimbatore</option>
          <option value="Salem">Salem</option>
        </select>
        <button className="button-1">Sign In</button>
      </div>
      <div className="navigation">
        <div className="left">
          <Link to="/Movies">Movies</Link>
          <Link to="/streams">Streams</Link>
          <Link to="/events">Events</Link>
          <Link to="/sports">Sports</Link>
          <Link to="/activities">Activities</Link>
        </div>
        <div className="right">
          <Link to="/corporates">Corporates</Link>
          <Link to="/offers">Offers</Link>
        </div>
      </div>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      <div className="upper-layer">
        <div className="movie-info">
          <h2>Movie Title</h2>
          <p>Language: Tamil</p>
        </div>
      </div>
      <div className="line-upper-lower"></div>
      <div className="lower-layer">
        <div className="days-container">
          {days.map((day, index) => (
            <DayContainer
              key={day}
              day={day}
              date={`${dates[index]} ${months[index]}`}
              isSelected={selectedDay === day}
              onClick={() => handleDayClick(day)}
            />
          ))}
        </div>
        <div className="line-days-filters"></div>
        <div className="filters">
          <div className="price-container">
            <select className="price-range">
              <option value="40">PRICE-LIST</option>
              <option value="40">Low ($40)</option>
              <option value="120">Medium ($120)</option>
              <option value="200">High ($200)</option>
              <option value="350">Premium ($350)</option>
            </select>
          </div>
          <div className="timings-container">
            <select className="show-timing" onChange={handleTimingChange}>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
              <option value="night">Night</option>
            </select>
          </div>
          <div className="search-container">
            <RiSearch2Line className="search-icon" />
            <input type="text" placeholder="Search" />
          </div>
        </div>
      </div>
      <div className="split-container">
        {theatres.map((theatre, index) => (
          <div className="row" key={index}>
            <div className="left-part">
              <Link to="#" className="theatre-container">
                <h3>{theatre.name}</h3>
                <FaHeart
                  className={`heart-icon ${
                    heartClicked[index] ? "heart-clicked" : ""
                  }`}
                  onClick={() => handleHeartClick(index)}
                />
              </Link>
            </div>
            <div className="right-part">
              <div className="timing-container" onClick={handleNavigateToSeats}>
                {theatre.timings.map((timing, timingIndex) => (
                  <div className="timing" key={timingIndex}>
                    {timing}{" "}
                    {selectedTiming === "morning" && timingIndex === 0 && (
                      <FaSun />
                    )}
                    {selectedTiming === "afternoon" && timingIndex === 1 && (
                      <FaCloudSun />
                    )}
                    {selectedTiming === "evening" && timingIndex === 0 && (
                      <FaCloudMoon />
                    )}
                    {selectedTiming === "evening" && timingIndex === 1 && (
                      <FaCloudMoon />
                    )}
                    {selectedTiming === "night" && timingIndex === 1 && (
                      <FaMoon />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Confirmation;
