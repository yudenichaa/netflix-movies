import React, { useState, useEffect, useCallback } from "react";
import { movieCategories, getMovieImageURL } from "../../moviesData";
import noBannerImage from "./assets/no-banner-image.jpg";
import { truncate } from "../../utils";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import config from "../../config";
import "./banner.scss";

const Banner: React.FC = () => {
    const [movie, setMovie] = useState(null);
    const [trailerID, setTrailerID] = useState("");
    const [trailerOpen, setTrailerOpen] = useState(false);

    useEffect(() => {
        fetch(movieCategories.netflixOriginals.fetchURL)
            .then((response) => response.json())
            .then((responseData) => {
                const movies = responseData.results;
                setMovie(movies[Math.floor(Math.random() * movies.length)]);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        if (movie) {
            movieTrailer(movie.title || movie.original_title || movie.name)
                .then((url: string) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerID(urlParams.get("v"));
                })
                .catch((error: Error) => console.log(error));
        }
    }, [movie]);

    const onPlayTrailerClick = useCallback(
        (): void => setTrailerOpen(true),
        []
    );

    const onCloseTrailerClick = useCallback(
        (): void => setTrailerOpen(false),
        []
    );

    // if (!movie) return null;

    return (
        <div
            className="banner"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), ${
                    movie &&
                    `url(${
                        movie.backdrop_path
                            ? getMovieImageURL(movie.backdrop_path, "original")
                            : noBannerImage
                    })`
                }`,
            }}
        >
            {movie && (
                <>
                    <div className="banner__content">
                        <h2 className="banner__movie-title">
                            {movie.title || movie.name}
                        </h2>
                        {trailerID && (
                            <button
                                className="banner__play-button"
                                onClick={onPlayTrailerClick}
                            >
                                Play trailer
                            </button>
                        )}
                        <p className="banner__movie-overview">
                            {truncate(movie.overview, 200)}
                        </p>
                    </div>
                    {trailerID && trailerOpen && (
                        <div
                            className="banner__trailer"
                            onClick={onCloseTrailerClick}
                        >
                            <div className="banner__trailer-container">
                                <span
                                    className="banner__trailer-close-button"
                                    onClick={onCloseTrailerClick}
                                >
                                    &times;
                                </span>
                                <Youtube
                                    className="banner__trailer-player"
                                    videoId={trailerID}
                                    opts={config.bannerYoutubeOptions}
                                />
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Banner;
