import React from "react";
import "./MovieCard.scss";

function MovieCard({ movie }) {
    return (
        <div className="card">
            {movie.poster_path && (
                <img
                    className="card-image"
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={movie.title + " poster"}
                    width="250"
                />
            )}
            <div className="card-content">
                <h3 className="card-title">{movie.title}</h3>
                <p className="card-date">RELEASED: {movie.release_date}</p>
                <p className="card-rating">RATING: {movie.vote_average}</p>
                <p className="card-overview">{movie.overview}</p>
            </div>
        </div>
    );
}

export default MovieCard;