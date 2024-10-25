import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../styles/book.css";

const BookingForm = ({ movies }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    const selected = movies.find((movie) => movie.id.toString() === id);
    setSelectedMovie(selected);

    const timer = setTimeout(() => {
      setShowReport(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [id, movies]);

  if (!selectedMovie) {
    return <div>Loading...</div>;
  }

  const indexInLanguageGroup = movies
    .filter((movie) => movie.language === selectedMovie.language)
    .findIndex((movie) => movie.id === selectedMovie.id);

  const backgroundClass = `${selectedMovie.language.toLowerCase()}-${
    indexInLanguageGroup + 1
  }`;

  const backgroundImageUrl = `../images/${selectedMovie.language.toLowerCase()}${
    indexInLanguageGroup + 1
  }.jpeg`;

  const renderStars = () => {
    const rating = selectedMovie.rating;
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<FontAwesomeIcon icon={faStar} key={i} />);
    }
    return stars;
  };

  const handleBookTickets = () => {
    navigate("/confirmation");
  };

  return (
    <div className="top">
      <div className="main">
        <h1 className="color">BOOKING DETAILS</h1>
        <div className={`movie-background ${backgroundClass}`}></div>
        <div className="movie-info">
          <h2>{selectedMovie.title}</h2>
          <p className="stars">Rating: {renderStars()}</p>
          <p>Language: {selectedMovie.language}</p>
        </div>
      </div>
      <div className="second">
        <div className="live-ratings">
          <h2>Live Ratings</h2>
          <input type="text" placeholder="Enter live ratings" />
        </div>

        <div className="format-selection">
          <h3>Format:</h3>
          <select>
            <option value="2D">2D</option>
            <option value="3D">3D</option>
          </select>
        </div>
        <div className="language-selection">
          <h3>Language:</h3>
          <select>
            <option value="Tamil">Tamil</option>
            <option value="Malayalam">Malayalam</option>
            <option value="Hindi">Hindi</option>
            <option value="Kannada">Kannada</option>
            <option value="Telugu">Telugu</option>
          </select>
        </div>

        <button className="book-button" onClick={handleBookTickets}>
          Book Tickets
        </button>
        {showReport && (
          <div className="report">
            <h1>About the movie</h1>
            <p>
              Reviews analyze the effectiveness of the plot, theme, acting,
              direction, special effects, musical effects, cinematography, and
              all other elements that created the movie. There are qualities and
              guidelines that a critique of a movie should possess.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
