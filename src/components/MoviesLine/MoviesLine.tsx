import React, { useState, useEffect, useRef } from "react";
import Image from "../Image";
import { getMovieImageURL } from "../../moviesData";
import "./movies-line.scss";
import noMovieImage from "./assets/no-movie.jpg";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import config from "../../config";

interface IMoviesLine {
    requestURL: string;
    headline: string;
    isLarge?: boolean;
}

const MoviesLine: React.FC<IMoviesLine> = ({
    headline,
    requestURL,
    isLarge = false,
}) => {
    const [movies, setMovies] = useState([]);
    const [selectedMovieID, setSelectedMovieID] = useState<null | number>(null);
    const [trailerID, setTrailerID] = useState("");
    const [mouseDown, setMouseDown] = useState(false);
    const [wasScroll, setWasScroll] = useState(false);
    const [scrollStartPosition, setScrollStartPosition] = useState(0);
    const [scrollValue, setScrollValue] = useState(0);
    const moviesContainerRef = useRef<null | HTMLDivElement>(null);
    const moviesRef = useRef<null | HTMLDivElement>(null);

    const onMouseDown = (event: React.MouseEvent): void => {
        setMouseDown(true);
        setScrollStartPosition(event.clientX);
        setWasScroll(false);
    };

    const onMouseUp = (): void => {
        setMouseDown(false);
    };

    function onMouseOut(event: React.MouseEvent): void {
        if (moviesContainerRef.current.contains(event.relatedTarget as Node))
            return;
        setMouseDown(false);
    }

    const onMouseMove = (event: React.MouseEvent): void => {
        mouseDown && scroll(event.clientX);
    };

    const onTouchStart = (event: React.TouchEvent): void => {
        setScrollStartPosition(event.touches[0].clientX);
    };

    const onTouchMove = (event: React.TouchEvent): void => {
        scroll(event.touches[0].clientX);
    };

    const scroll = (clientX: number): void => {
        const scrollDistance = scrollStartPosition - clientX;
        let newScrollValue = scrollValue + scrollDistance;
        const moviesLineContentWidth =
            moviesRef.current.scrollWidth -
            moviesContainerRef.current.offsetWidth;
        if (newScrollValue < 0) newScrollValue = 0;
        else if (newScrollValue > moviesLineContentWidth)
            newScrollValue = moviesLineContentWidth;
        setScrollStartPosition(clientX);
        setScrollValue(newScrollValue);
        setWasScroll(true);
    };

    useEffect(() => {
        fetch(requestURL)
            .then((response) => response.json())
            .then((resonseData) => setMovies(resonseData.results))
            .catch((error) => console.log(error));
    }, [requestURL]);

    const onMovieClick = (index: number): void => {
        if (wasScroll) return;
        const movie = movies[index];
        if (movie.id == selectedMovieID) {
            setTrailerID("");
            setSelectedMovieID(null);
        } else {
            movieTrailer(movie.title || movie.original_title || movie.name)
                .then((url: string) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerID(urlParams.get("v"));
                    setSelectedMovieID(movie.id);
                })
                .catch((error: Error) => console.log(error));
        }
    };

    return (
        <div className="movies-line">
            <h2 className="movies-line__headline">{headline}</h2>
            <div
                className="movies-line__movies-container"
                ref={moviesContainerRef}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseOut={onMouseOut}
                onMouseMove={onMouseMove}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
            >
                <div
                    className="movies-line__movies"
                    ref={moviesRef}
                    style={{
                        transform: `translateX(${-scrollValue}px)`,
                    }}
                >
                    {movies.map((movie, index) => (
                        <div
                            key={movie.id}
                            className="movies-line__movie"
                            onClick={() => onMovieClick(index)}
                        >
                            <Image
                                src={
                                    movie.poster_path
                                        ? getMovieImageURL(movie.poster_path)
                                        : noMovieImage
                                }
                                alt={`${movie.title} poster`}
                                className={`movies-line__movie-image ${
                                    isLarge && "movies-line__movie-image_large"
                                }`}
                            />
                            <h3 className="movies-line__movie-title">
                                {movie.title || movie.name}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
            {trailerID && (
                <Youtube
                    videoId={trailerID}
                    opts={config.moviesLineYoutubeOptions}
                />
            )}
        </div>
    );
};

export default MoviesLine;
