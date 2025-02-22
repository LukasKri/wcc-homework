import React, { useEffect } from "react";
import SearchResults from "../search-results/SearchResults";
import useDebounce from "../debounce/Debounce";

import movieLogo from "../../icons/movie.svg";

import "./Search.scss";

// States from parent component - Header.
function Search({
    query,
    setQuery,
    movies,
    setMovies,
    showSuggestions,
    setShowSuggestions,
    error,
    setError,
}) {
    const debouncedValue = useDebounce(query, 200);

    const API_KEY = "d1540e749ccc1e07651022b415b80efe";

    // useEffect hook for search input updates.
    useEffect(() => {
        const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;

        async function fetchData(query) {
            if (!query || query.length < 3 || showSuggestions) {
                setMovies([]);
            } else {
                try {
                    setError(false);
                    const response = await fetch(API_URL);
                    const movieData = await response.json();

                    if (!response.ok) {
                        throw new Error("Error - failed to fetch.");
                    }

                    const shownMovies = movieData.results.splice(0, 8);
                    setMovies(shownMovies);
                } catch (err) {
                    setError(true);
                    console.log(err.message);
                }
            }
        }
        fetchData(query);
    }, [debouncedValue]);

    // Input event handler (updates the query state when input value changes).
    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        setShowSuggestions(false);
    };

    return (
        <div>
            <img className="movie-svg" src={movieLogo} alt="movie-logo" />
            <input
                autoComplete="off"
                type="text"
                placeholder="Enter movie name"
                value={query}
                onChange={handleChange}
            />
            <button type="submit">
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 92 92"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M20.8 39.27c0-11.016 8.808-19.976 19.637-19.976 10.827 0 19.635 8.96 19.635 19.972 0 11.014-8.808 19.976-19.635 19.976-10.83 0-19.64-8.96-19.64-19.976zm55.472 32.037l-15.976-16.25c3.357-4.363 5.376-9.835 5.376-15.788 0-14.16-11.32-25.67-25.232-25.67-13.923 0-25.24 11.51-25.24 25.67s11.32 25.67 25.237 25.67c4.776 0 9.227-1.388 13.04-3.74L69.84 77.85c1.77 1.8 4.664 1.8 6.432 0 1.77-1.8 1.77-4.744 0-6.544z" />
                </svg>
            </button>
            <div className="results-container">
                {!error &&
                    movies.map((movie) => {
                        return (
                            <SearchResults
                                movie={movie}
                                key={movie.id}
                                onRowClick={() => setQuery(movie.title)}
                            />
                        );
                    })}
            </div>
        </div>
    );
}

export default Search;
